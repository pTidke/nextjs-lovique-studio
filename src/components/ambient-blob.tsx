import type { CSSProperties } from "react";

type AmbientBlobProps = {
  /** Diameter in px (already includes the soft falloff) */
  size: number;
  /** Any CSS color incl. alpha, e.g. "rgb(238 43 140 / 0.4)" */
  color: string;
  /** Where the solid core ends and the fade begins, 0–100 */
  core: number;
  /** Positioning classes, e.g. "top-[-5%] left-[-5%] -translate-..." */
  className?: string;
  /** Drift target + half-cycle duration (ignored when wander) */
  dx?: number;
  dy?: number;
  scale?: number;
  duration?: number;
  /** Use the multi-point wander path instead of a simple drift */
  wander?: boolean;
};

// Soft glowing blob drawn with a radial gradient instead of a CSS blur filter —
// same look, a fraction of the GPU cost, animated purely in CSS.
export default function AmbientBlob({
  size,
  color,
  core,
  className = "",
  dx = 0,
  dy = 0,
  scale = 1,
  duration,
  wander = false,
}: AmbientBlobProps) {
  const style = {
    width: size,
    height: size,
    background: `radial-gradient(closest-side, ${color} ${core}%, transparent)`,
    "--dx": `${dx}px`,
    "--dy": `${dy}px`,
    "--ds": scale,
    ...(duration ? { "--dur": `${duration}s` } : {}),
  } as CSSProperties;

  return (
    <div
      aria-hidden
      className={`absolute rounded-full ${wander ? "ambient-wander" : "ambient-drift"} ${className}`}
      style={style}
    />
  );
}
