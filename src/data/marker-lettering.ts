// Hand-authored pen centerlines, not font outlines. Coordinates use a 24-unit
// baseline; separate strokes preserve lifts of the pen, dots, and crossbars.
type PenStroke = { d: string; length: number };
type PenLetter = { advance: number; strokes: PenStroke[] };

const letter = (
  advance: number,
  ...strokes: [d: string, length: number][]
): PenLetter => ({
  advance,
  strokes: strokes.map(([d, length]) => ({ d, length })),
});

const letters: Record<string, PenLetter> = {
  a: letter(
    16,
    ["M13 11C8 7 2 12 2 19C2 27 11 24 13 13", 35],
    ["M14 10L12 21Q12 25 16 23", 18],
  ),
  b: letter(16, ["M4 2Q3 13 2 24M3 17C9 6 17 11 14 18Q11 26 3 23", 52]),
  c: letter(14, ["M12 12C7 7 1 14 2 20Q4 27 13 22", 31]),
  d: letter(
    17,
    ["M13 12C7 8 1 14 2 20C3 27 11 24 13 15", 34],
    ["M16 1Q14 11 13 21Q13 25 17 23", 28],
  ),
  e: letter(14, ["M2 18Q15 17 11 11C7 6 0 16 3 21Q6 27 14 21", 43]),
  f: letter(12, ["M3 29Q5 13 7 5Q10-2 14 3", 34], ["M1 13Q7 11 12 12", 12]),
  g: letter(
    17,
    ["M14 12C8 7 1 14 3 21Q6 28 14 14", 37],
    ["M15 11Q14 27 9 32Q5 36 1 30", 31],
  ),
  h: letter(17, ["M5 1Q3 12 2 24M3 19Q12 5 14 13L13 22Q14 25 17 22", 53]),
  i: letter(8, ["M4 12L3 21Q3 25 7 22", 15], ["M5 5L5.4 5.6", 1]),
  j: letter(9, ["M6 12L4 28Q2 35-3 30", 25], ["M7 5L7.4 5.5", 1]),
  k: letter(16, ["M5 1L2 24", 24], ["M15 10L4 18Q10 17 12 22L15 24", 25]),
  l: letter(9, ["M5 2Q2 14 3 21Q4 26 8 22", 25]),
  n: letter(17, ["M3 12L2 24M3 19C12 5 16 9 14 19Q12 26 17 22", 40]),
  o: letter(16, ["M12 11C3 6-1 23 6 24C14 27 19 10 10 11", 45]),
  q: letter(17, ["M14 12C8 7 1 13 2 20Q5 28 14 15", 37], ["M15 11L11 33", 23]),
  r: letter(13, ["M3 12L2 24M3 19Q7 7 13 12", 29]),
  s: letter(14, ["M12 12C9 7 1 12 4 16L10 19C15 24 4 28 1 22", 39]),
  t: letter(12, ["M7 4Q4 13 4 21Q5 27 12 22", 27], ["M1 13L12 11", 12]),
  u: letter(17, ["M4 11L2 19C1 29 11 24 14 12L13 21Q14 25 17 22", 43]),
  w: letter(23, ["M3 11L2 20C2 29 10 23 11 13C9 26 17 29 21 11", 52]),
  " ": letter(8),
};

export function drawMarkerWords(words: string) {
  let x = 0;
  let length = 0;
  const strokes: (PenStroke & {
    x: number;
    y: number;
    tilt: number;
    offset: number;
  })[] = [];
  const baseline = [0, -0.5, 0.4, -0.2, 0.7];
  const slant = [-2, 1, -1, 2, 0];

  for (const [index, character] of [...words].entries()) {
    const glyph = letters[character];
    if (!glyph) throw new Error(`Add marker strokes for: ${character}`);
    for (const stroke of glyph.strokes) {
      strokes.push({
        ...stroke,
        offset: length,
        x,
        y: baseline[index % baseline.length],
        tilt: slant[index % slant.length],
      });
      length += stroke.length;
    }
    x += glyph.advance;
  }
  return {
    strokes,
    width: x,
    length,
  };
}
