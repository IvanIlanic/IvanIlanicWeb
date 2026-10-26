export function Arrow({
  direction = "up-right",
  className = "",
}: {
  direction?: "up-right" | "down" | "right" | "left";
  className?: string;
}) {
  const rotation = { "up-right": 0, down: 135, right: 45, left: 225 }[
    direction
  ];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
