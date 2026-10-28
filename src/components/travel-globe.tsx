"use client";

import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import type { FeatureCollection, Geometry } from "geojson";
import { animate, useInView } from "motion/react";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import {
  currentPlace,
  mappedPlaces,
  originPlace,
  travelDestinations,
  visitedCountryCount,
  type TravelPlace,
} from "@/data/travel-map";
import { Arrow } from "./icons";

type View = [longitude: number, latitude: number];
const initialView: View = [-15, 42];
const graticule = geoGraticule10();
const visitedIds = new Set(
  travelDestinations.flatMap((destination) =>
    destination.mapId ? [destination.mapId] : [],
  ),
);
const clampLatitude = (latitude: number) =>
  Math.max(-75, Math.min(75, latitude));
const wrapLongitude = (longitude: number) =>
  ((((longitude + 180) % 360) + 360) % 360) - 180;
const coordinatesLabel = ([longitude, latitude]: View) =>
  `${Math.abs(latitude).toFixed(2)}° ${latitude < 0 ? "S" : "N"} · ${Math.abs(longitude).toFixed(2)}° ${longitude < 0 ? "W" : "E"}`;

function GlobeDrawing({
  world,
  view,
  selected,
}: {
  world: FeatureCollection<Geometry> | null;
  view: View;
  selected: (typeof mappedPlaces)[number];
}) {
  const id = useId().replace(/:/g, "");
  const projection = useMemo(
    () =>
      geoOrthographic()
        .translate([320, 320])
        .scale(250)
        .rotate([-view[0], -view[1]])
        .clipAngle(90)
        .precision(0.5),
    [view],
  );
  const path = geoPath(projection);
  const visible = (place: TravelPlace) =>
    geoDistance(view, place.coordinates) < Math.PI / 2 - 0.025;
  const selectedPoint = visible(selected)
    ? projection(selected.coordinates)
    : null;
  const labelWidth = Math.max(82, selected.name.length * 7.7);
  const labelX = selectedPoint
    ? Math.max(24, Math.min(selectedPoint[0] + 20, 610 - labelWidth))
    : 0;
  const labelY = selectedPoint
    ? Math.max(45, Math.min(selectedPoint[1] - 24, 590))
    : 0;
  const homeArc = path({
    type: "LineString",
    coordinates: [originPlace.coordinates, currentPlace.coordinates],
  });

  return (
    <svg
      className="travel-globe-svg"
      viewBox="0 0 640 640"
      role="img"
      aria-label={`Globe of places I’ve been. Selected: ${selected.name}, ${selected.destinationName}. Croatia is where I’m from and Iceland is where I live.`}
    >
      <defs>
        <radialGradient id={`${id}-ocean`} cx="35%" cy="28%" r="75%">
          <stop stopColor="#253e3c" />
          <stop offset=".65" stopColor="#102826" />
          <stop offset="1" stopColor="#081615" />
        </radialGradient>
        <radialGradient id={`${id}-shade`} cx="32%" cy="28%" r="75%">
          <stop offset=".35" stopColor="#020c0c" stopOpacity="0" />
          <stop offset=".8" stopColor="#020c0c" stopOpacity=".12" />
          <stop offset="1" stopColor="#020c0c" stopOpacity=".65" />
        </radialGradient>
        <radialGradient id={`${id}-atmosphere`}>
          <stop offset=".88" stopColor="#b6d7be" stopOpacity="0" />
          <stop offset=".95" stopColor="#b6d7be" stopOpacity=".13" />
          <stop offset="1" stopColor="#b6d7be" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="320" cy="320" r="276" fill={`url(#${id}-atmosphere)`} />
      <circle
        cx="320"
        cy="320"
        r="251"
        fill={`url(#${id}-ocean)`}
        stroke="#a6c8b44d"
      />
      <path d={path(graticule) ?? undefined} className="globe-graticule" />
      <g className="globe-countries">
        {world?.features.map((country, index) => {
          const countryId = String(country.id ?? "").padStart(3, "0");
          const visited = visitedIds.has(countryId);
          const activeCountry =
            travelDestinations.find(
              (destination) => destination.id === selected.destinationId,
            )?.mapId === countryId;
          return (
            <path
              key={country.id ?? index}
              d={path(country) ?? undefined}
              data-country-code={countryId}
              className={`globe-country${visited ? " is-visited" : ""}${activeCountry ? " is-selected" : ""}`}
            />
          );
        })}
      </g>
      <circle cx="320" cy="320" r="250" fill={`url(#${id}-shade)`} />
      <path d={homeArc ?? undefined} className="globe-home-arc" />
      <g aria-hidden="true">
        {mappedPlaces.filter(visible).map((place) => {
          const point = projection(place.coordinates);
          if (!point) return null;
          return (
            <circle
              key={place.id}
              cx={point[0]}
              cy={point[1]}
              r={place.home ? 4.8 : 2.7}
              className={`globe-place${place.home ? ` globe-place-${place.home}` : ""}`}
            />
          );
        })}
        {selectedPoint && (
          <g className="globe-selected-place" data-active-marker={selected.id}>
            <circle
              cx={selectedPoint[0]}
              cy={selectedPoint[1]}
              r="17"
              fill="none"
              stroke="#efceab66"
            />
            <circle
              cx={selectedPoint[0]}
              cy={selectedPoint[1]}
              r="7"
              fill="#efceab"
              stroke="#142723"
              strokeWidth="2"
            />
            <path
              d={`M${selectedPoint[0]} ${selectedPoint[1] - 10}L${labelX} ${labelY + 2}`}
              fill="none"
              stroke="#efceab88"
            />
            <rect
              x={labelX - 8}
              y={labelY - 18}
              width={labelWidth + 16}
              height="30"
              rx="3"
              fill="#0e1e1ced"
              stroke="#b5c9b544"
            />
            <text x={labelX} y={labelY + 2}>
              {selected.name}
            </text>
          </g>
        )}
      </g>
      <g className="globe-compass" aria-hidden="true">
        <text x="320" y="32" textAnchor="middle">
          N
        </text>
        <text x="320" y="620" textAnchor="middle">
          S
        </text>
        <text x="25" y="324">
          W
        </text>
        <text x="605" y="324">
          E
        </text>
      </g>
    </svg>
  );
}

export function TravelGlobe() {
  const section = useRef<HTMLElement>(null);
  const near = useInView(section, { margin: "400px", once: true });
  const [world, setWorld] = useState<FeatureCollection<Geometry> | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [view, setView] = useState<View>(initialView);
  const viewRef = useRef<View>(initialView);
  const [selectedId, setSelectedId] = useState(currentPlace.id);
  const [dragging, setDragging] = useState(false);
  const drag = useRef<{
    x: number;
    y: number;
    view: View;
    width: number;
  } | null>(null);
  const pendingFrame = useRef<number | null>(null);
  const flight = useRef<ReturnType<typeof animate> | null>(null);
  const selected =
    mappedPlaces.find((place) => place.id === selectedId) ?? currentPlace;
  const destination = travelDestinations.find(
    (item) => item.id === selected.destinationId,
  )!;
  const placesId = useId();

  useEffect(() => {
    if (!near) return;
    const controller = new AbortController();
    fetch("/maps/countries-110m.geojson", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Map request failed");
        return response.json();
      })
      .then((data: FeatureCollection<Geometry>) => {
        if (data.type !== "FeatureCollection" || !Array.isArray(data.features))
          throw new Error("Invalid map data");
        setWorld(data);
        setLoadError(false);
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError"))
          setLoadError(true);
      });
    return () => controller.abort();
  }, [near, attempt]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stop = () => {
      if (preference.matches) flight.current?.stop();
    };
    preference.addEventListener("change", stop);
    return () => {
      preference.removeEventListener("change", stop);
      flight.current?.stop();
      if (pendingFrame.current !== null)
        cancelAnimationFrame(pendingFrame.current);
    };
  }, []);

  const updateView = useCallback((next: View) => {
    viewRef.current = next;
    setView(next);
  }, []);

  function moveTo(target: View) {
    flight.current?.stop();
    if (pendingFrame.current !== null) {
      cancelAnimationFrame(pendingFrame.current);
      pendingFrame.current = null;
    }
    const start = viewRef.current;
    const end: View = [
      start[0] + wrapLongitude(target[0] - start[0]),
      clampLatitude(target[1]),
    ];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      updateView(end);
      return;
    }
    flight.current = animate(0, 1, {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (progress) =>
        updateView([
          start[0] + (end[0] - start[0]) * progress,
          start[1] + (end[1] - start[1]) * progress,
        ]),
    });
  }

  function selectPlace(place: TravelPlace) {
    setSelectedId(place.id);
    moveTo(place.coordinates);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!world || (event.pointerType === "mouse" && event.button !== 0)) return;
    flight.current?.stop();
    drag.current = {
      x: event.clientX,
      y: event.clientY,
      view: viewRef.current,
      width: event.currentTarget.getBoundingClientRect().width,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    if (!start) return;
    const next: View = [
      start.view[0] - ((event.clientX - start.x) / start.width) * 180,
      clampLatitude(
        start.view[1] + ((event.clientY - start.y) / start.width) * 150,
      ),
    ];
    if (pendingFrame.current !== null)
      cancelAnimationFrame(pendingFrame.current);
    pendingFrame.current = requestAnimationFrame(() => {
      updateView(next);
      pendingFrame.current = null;
    });
  }

  return (
    <section
      ref={section}
      id="travel-map"
      className="travel-map"
      aria-labelledby="travel-map-title"
    >
      <div className="section-label">
        <span className="eyebrow">A FEW PINS IN A BIG WORLD</span>
        <span className="eyebrow">STILL PLENTY LEFT TO SEE</span>
      </div>
      <div className="travel-map-heading">
        <h3 id="travel-map-title">
          Places that became
          <br />
          <em>part of my story.</em>
        </h3>
        <p>
          From Rijeka to Reykjavík,
          <br />
          with a few detours along the way.
        </p>
      </div>
      <div className="travel-map-layout">
        <div className="travel-globe-panel">
          <div className="globe-home-line">
            <button onClick={() => selectPlace(originPlace)}>
              <span className="globe-legend-dot origin" />
              <span>
                <small>ORIGINALLY FROM</small>Rijeka, Croatia
              </span>
            </button>
            <Arrow direction="right" />
            <button onClick={() => selectPlace(currentPlace)}>
              <span className="globe-legend-dot current" />
              <span>
                <small>BASED IN</small>Reykjavík, Iceland
              </span>
            </button>
          </div>
          <div
            className={`travel-globe-interaction${dragging ? " is-dragging" : ""}`}
            data-view={view.map((value) => value.toFixed(2)).join(",")}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={() => {
              drag.current = null;
              setDragging(false);
            }}
            onPointerCancel={() => {
              drag.current = null;
              setDragging(false);
            }}
            onLostPointerCapture={() => {
              drag.current = null;
              setDragging(false);
            }}
          >
            <GlobeDrawing world={world} view={view} selected={selected} />
            {!world && (
              <div className="globe-loading" role="status">
                {loadError ? (
                  <>
                    <span>
                      The map couldn’t load. Your destinations are still listed.
                    </span>
                    <button onClick={() => setAttempt((value) => value + 1)}>
                      Retry map
                    </button>
                  </>
                ) : (
                  "DRAWING THE WORLD…"
                )}
              </div>
            )}
          </div>
          <div
            className="globe-rotate-controls"
            role="group"
            aria-label="Globe rotation controls"
          >
            <button
              aria-label="Rotate globe west"
              onClick={() =>
                moveTo([viewRef.current[0] - 30, viewRef.current[1]])
              }
            >
              <Arrow direction="left" />
            </button>
            <button
              aria-label="Rotate globe north"
              onClick={() =>
                moveTo([viewRef.current[0], viewRef.current[1] + 20])
              }
            >
              <span className="globe-north-arrow">
                <Arrow direction="down" />
              </span>
            </button>
            <button
              className="globe-reset"
              onClick={() => {
                setSelectedId(currentPlace.id);
                moveTo(initialView);
              }}
            >
              Overview
            </button>
            <button
              aria-label="Rotate globe south"
              onClick={() =>
                moveTo([viewRef.current[0], viewRef.current[1] - 20])
              }
            >
              <Arrow direction="down" />
            </button>
            <button
              aria-label="Rotate globe east"
              onClick={() =>
                moveTo([viewRef.current[0] + 30, viewRef.current[1]])
              }
            >
              <Arrow direction="right" />
            </button>
          </div>
          <p className="globe-help">
            Drag to explore, or choose a place. Use the arrows to turn the
            globe.
          </p>
          <div className="globe-legend">
            <span>
              <i className="visited" />
              Countries I’ve been to
            </span>
            <span>
              <i className="origin" />
              Where I’m from
            </span>
            <span>
              <i className="current" />
              Where I live
            </span>
          </div>
        </div>
        <div className="globe-destinations">
          <div className="globe-totals">
            <p>
              <strong>{visitedCountryCount}</strong>
              <span>countries</span>
            </p>
            <p>
              <strong>{mappedPlaces.length}</strong>
              <span>places & regions</span>
            </p>
            <p>
              <strong>+ 1</strong>
              <span>territory · Gibraltar</span>
            </p>
          </div>
          <span className="eyebrow globe-list-label">CHOOSE A DESTINATION</span>
          <div
            className="globe-country-options"
            role="group"
            aria-label="Travel destinations"
          >
            {travelDestinations.map((item) => (
              <button
                key={item.id}
                aria-pressed={destination.id === item.id}
                aria-controls={placesId}
                onClick={() => selectPlace(item.places[0])}
              >
                <span>{item.name}</span>
                <span>{String(item.places.length).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <div
            id={placesId}
            className="globe-place-options"
            role="group"
            aria-label={`Places in ${destination.name}`}
          >
            <span className="eyebrow">
              {destination.territory ? "TERRITORY" : "PLACES"} /{" "}
              {destination.name.toUpperCase()}
            </span>
            <ul>
              {destination.places.map((place) => (
                <li key={place.id}>
                  <button
                    aria-pressed={place.id === selectedId}
                    onClick={() => selectPlace(place)}
                  >
                    <span>{place.name}</span>
                    <Arrow />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="globe-selection" role="status" aria-atomic="true">
            <span className="eyebrow">ON THE GLOBE</span>
            <h4>{selected.name}</h4>
            <p>{selected.note ?? selected.destinationName}</p>
            <span className="globe-coordinates">
              {coordinatesLabel(selected.coordinates)}
            </span>
          </div>
        </div>
      </div>
      <p className="globe-map-credit">
        A personal travel map. Country outlines:{" "}
        <a
          href="https://www.naturalearthdata.com/about/terms-of-use/"
          target="_blank"
          rel="noreferrer"
        >
          Natural Earth
        </a>
        . Regional markers are approximate.
      </p>
    </section>
  );
}
