import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Default link-preview card (pages without their own image, e.g. home, catalogue)
export const alt = "Lovique Studio — handcrafted forever flowers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Playfair Display italic as TTF (Satori can't read woff2); falls back to the default font
async function loadPlayfair(text: string) {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&text=${encodeURIComponent(text)}`,
      )
    ).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return src ? await (await fetch(src)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const title = "Lovique Studio";
  const tagline = "Wrapped in grace, sealed with love — where flowers meet forever";

  const [logo, playfair] = await Promise.all([
    readFile(join(process.cwd(), "public/logo.png")),
    loadPlayfair(title + tagline),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          backgroundColor: "#fffafa",
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(238,43,140,0.22), transparent 45%), radial-gradient(circle at 85% 85%, rgba(216,180,254,0.35), transparent 50%)",
        }}
      >
        <img
          src={`data:image/png;base64,${logo.toString("base64")}`}
          width={150}
          height={170}
          alt=""
        />
        <div
          style={{
            display: "flex",
            fontSize: 96,
            color: "#2a1b1b",
            fontFamily: playfair ? "Playfair" : undefined,
          }}
        >
          Lovique&nbsp;<span style={{ color: "#ee2b8c" }}>Studio</span>
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#6b7280",
            fontFamily: playfair ? "Playfair" : undefined,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: playfair
        ? [{ name: "Playfair", data: playfair, style: "italic", weight: 400 }]
        : [],
    },
  );
}
