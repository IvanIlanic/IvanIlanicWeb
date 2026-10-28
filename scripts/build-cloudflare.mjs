import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import {
  access,
  cp,
  mkdir,
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = fileURLToPath(new URL("../", import.meta.url));
const publicDirectory = path.join(root, "public");
const outputDirectory = path.join(root, "out");
const generatedDirectory = path.join(publicDirectory, "_optimized");
const sizeConfig = JSON.parse(
  await readFile(path.join(root, "src/lib/static-image-config.json"), "utf8"),
);
const widths = [...sizeConfig.deviceSizes, ...sizeConfig.imageSizes].sort(
  (a, b) => a - b,
);
const imagePattern = /\.(?:jpe?g|png|webp|avif)$/i;
const maxEdge = Math.max(...widths);
const quality = 80;

async function filesIn(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (filename === generatedDirectory) continue;
    if (entry.isDirectory()) files.push(...(await filesIn(filename)));
    else if (entry.isFile()) files.push(filename);
  }
  return files.sort();
}

const originals = (await filesIn(publicDirectory)).filter((file) =>
  imagePattern.test(file),
);
const publicPath = (file) =>
  `/${path.relative(publicDirectory, file).split(path.sep).join("/")}`;
const hash = createHash("sha256");
hash.update(`responsive-images-v1:${quality}:${JSON.stringify(sizeConfig)}`);
for (const file of originals) {
  hash.update(publicPath(file));
  hash.update(await readFile(file));
}
const version = hash.digest("hex").slice(0, 16);
const cache = path.join(root, ".next/cache/cloudflare-images", version);
const complete = `${cache}.complete`;
let cached = false;
try {
  await access(complete);
  await access(cache);
  cached = true;
} catch {
  // A clean checkout generates the variants; subsequent builds reuse this cache.
}

if (!cached) {
  await rm(cache, { recursive: true, force: true });
  await mkdir(cache, { recursive: true });
  // Bound decoding/encoding memory even for the full-resolution camera files.
  sharp.concurrency(1);
  sharp.cache({ memory: 32 });
  let nextImage = 0;
  async function generateImages() {
    while (nextImage < originals.length) {
      const file = originals[nextImage++];
      const relative = publicPath(file).slice(1);
      const base = await sharp(file)
        .autoOrient()
        .resize({
          width: maxEdge,
          height: maxEdge,
          fit: "inside",
          withoutEnlargement: true,
        })
        .toColourspace("srgb")
        .raw()
        .toBuffer({ resolveWithObject: true });
      const variants = new Map();
      for (const width of widths) {
        const actualWidth = Math.min(width, base.info.width);
        let buffer = variants.get(actualWidth);
        if (!buffer) {
          buffer = await sharp(base.data, {
            raw: {
              width: base.info.width,
              height: base.info.height,
              channels: base.info.channels,
            },
          })
            .resize({ width, withoutEnlargement: true })
            .webp({ quality, effort: 4 })
            .toBuffer();
          variants.set(actualWidth, buffer);
        }
        const target = path.join(cache, `${relative}-${width}.webp`);
        await mkdir(path.dirname(target), { recursive: true });
        await writeFile(target, buffer);
      }
      console.log(`Prepared ${relative}`);
    }
  }
  await Promise.all([generateImages(), generateImages()]);
  await writeFile(complete, "complete\n");
}

await rm(generatedDirectory, { recursive: true, force: true });
await mkdir(generatedDirectory, { recursive: true });
await cp(cache, path.join(generatedDirectory, version), { recursive: true });
console.log(
  `${cached ? "Reused" : "Generated"} ${originals.length * widths.length} responsive WebP files.`,
);

await rm(outputDirectory, { recursive: true, force: true });
const build = spawnSync(
  process.execPath,
  [path.join(root, "node_modules/next/dist/bin/next"), "build"],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      CLOUDFLARE_STATIC_EXPORT: "1",
      NEXT_PUBLIC_IMAGE_VERSION: version,
    },
  },
);
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

// The exported app requests the versioned responsive files. Keep camera originals
// in the repository, while omitting their large, unused copies from deployment.
for (const file of originals) {
  await rm(path.join(outputDirectory, publicPath(file).slice(1)), {
    force: true,
  });
}
await access(path.join(outputDirectory, "index.html"));
await access(path.join(outputDirectory, "404.html"));
const html = await readFile(path.join(outputDirectory, "index.html"), "utf8");
if (html.includes("/_next/image?"))
  throw new Error("Static HTML still requests the Next.js image server.");

const outputFiles = await filesIn(outputDirectory);
let totalBytes = 0;
for (const file of outputFiles) {
  const size = (await stat(file)).size;
  if (size > 25 * 1024 * 1024)
    throw new Error(`Cloudflare Pages asset exceeds 25 MiB: ${file}`);
  totalBytes += size;
}
if (outputFiles.length > 20000)
  throw new Error("Export exceeds the Cloudflare Pages Free plan asset count.");
console.log(
  `Cloudflare static deployment ready: ${outputFiles.length} files, ${(totalBytes / 1024 / 1024).toFixed(1)} MiB in out/.`,
);
