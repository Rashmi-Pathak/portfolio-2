import * as THREE from "three";
import type { BookVolume } from "@/data/portfolio";

const TEXTURE_CACHE = new Map<string, THREE.CanvasTexture>();

function drawCoverFace(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  vol: BookVolume,
  accentHex: string
) {
  const bg =
    vol.coverVariant === "black"
      ? "#151311"
      : vol.coverVariant === "crimson"
      ? accentHex
      : "#efe8d8";
  const fg =
    vol.coverVariant === "ivory" ? "#11100f" : "#f0e4c9";
  const subFg =
    vol.coverVariant === "ivory"
      ? accentHex
      : vol.coverVariant === "crimson"
      ? "#11100f"
      : accentHex;

  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  // Base paper/ink fill
  ctx.fillStyle = bg;
  ctx.fillRect(x, y, w, h);

  // Subtle halftone dot matrix in bottom-right
  ctx.fillStyle = fg;
  ctx.globalAlpha = 0.08;
  for (let gx = x + w * 0.42; gx < x + w; gx += 12) {
    for (let gy = y + h * 0.52; gy < y + h; gy += 12) {
      ctx.beginPath();
      ctx.arc(gx, gy, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;

  // Top header rule
  ctx.fillStyle = fg;
  ctx.font = "bold 16px monospace";
  ctx.fillText("RASHMI PATHAK", x + 24, y + 36);
  ctx.fillText(`VOL. ${vol.vol}`, x + w - 92, y + 36);

  ctx.strokeStyle = fg;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + 24, y + 48);
  ctx.lineTo(x + w - 24, y + 48);
  ctx.stroke();

  // Crimson brushstroke / accent bar behind title
  if (vol.coverVariant !== "crimson") {
    ctx.fillStyle = accentHex;
    ctx.fillRect(x + 20, y + 104, w - 40, 14);
  }

  // Main Title
  ctx.fillStyle = fg;
  ctx.font = "900 54px Impact, 'Arial Narrow', sans-serif";
  const words = vol.title.split(" ");
  let titleY = y + 112;
  words.forEach((word) => {
    ctx.fillText(word, x + 24, titleY, w - 48);
    titleY += 54;
  });

  // Subtitle
  ctx.fillStyle = subFg;
  ctx.font = "bold 17px monospace";
  ctx.fillText(vol.subtitle.toUpperCase().slice(0, 26), x + 24, titleY + 12, w - 48);

  // Motif artwork in lower half
  const artY = y + h * 0.6;
  ctx.strokeStyle = fg;
  ctx.fillStyle = fg;
  ctx.lineWidth = 2.5;

  if (vol.motif === "provenance") {
    ctx.strokeRect(x + 30, artY, w - 60, 72);
    ctx.beginPath();
    ctx.moveTo(x + 30, artY + 36);
    ctx.lineTo(x + w - 30, artY + 36);
    ctx.stroke();
    ctx.font = "14px monospace";
    ctx.fillText("C2PA · ED25519 · HNSW", x + 42, artY + 24);
    ctx.fillText("MERKLE TRANSPARENCY", x + 42, artY + 58);
  } else if (vol.motif === "markets") {
    ctx.beginPath();
    ctx.moveTo(x + 30, artY + 75);
    ctx.lineTo(x + 85, artY + 45);
    ctx.lineTo(x + 140, artY + 58);
    ctx.lineTo(x + 210, artY + 18);
    ctx.lineTo(x + w - 36, artY + 26);
    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 4;
    ctx.stroke();
  } else if (vol.motif === "forecast") {
    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    ctx.moveTo(x + 30, artY + 60);
    ctx.lineTo(x + w - 30, artY + 10);
    ctx.lineTo(x + w - 30, artY + 75);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.moveTo(x + 30, artY + 60);
    ctx.lineTo(x + w - 30, artY + 42);
    ctx.stroke();
  } else if (vol.motif === "fraud") {
    ctx.fillStyle = "#11100f";
    ctx.fillRect(x + 28, artY + 8, w - 56, 64);
    ctx.fillStyle = "#f0e4c9";
    ctx.font = "bold 16px monospace";
    ctx.fillText("XGBOOST // SHAP", x + 44, artY + 46);
  } else if (vol.motif === "kanban") {
    for (let c = 0; c < 3; c++) {
      ctx.strokeRect(x + 28 + c * 88, artY + 6, 76, 72);
    }
  } else if (vol.motif === "crm") {
    ctx.strokeRect(x + 28, artY + 6, w - 56, 68);
    ctx.font = "15px monospace";
    ctx.fillText("14 SHEETS // LLAMA 3.3", x + 42, artY + 46);
  } else {
    // Author seal
    ctx.beginPath();
    ctx.arc(x + w / 2, artY + 40, 36, 0, Math.PI * 2);
    ctx.stroke();
    ctx.font = "bold 24px Impact, sans-serif";
    ctx.fillText("RP", x + w / 2 - 15, artY + 48);
  }

  // Bottom bar
  ctx.fillStyle = fg;
  ctx.fillRect(x + 24, y + h - 42, w - 48, 22);
  ctx.fillStyle = bg;
  ctx.font = "bold 12px monospace";
  ctx.fillText(vol.meta.slice(0, 30), x + 32, y + h - 27);

  ctx.restore();
}

export function getBookCoverTexture(
  vol: BookVolume,
  accentHex = "#b51f2b"
): THREE.CanvasTexture {
  const cacheKey = `${vol.id}-${accentHex}`;
  const existing = TEXTURE_CACHE.get(cacheKey);
  if (existing) return existing;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  const baseBg =
    vol.coverVariant === "black"
      ? "#151311"
      : vol.coverVariant === "crimson"
      ? accentHex
      : "#efe8d8";

  ctx.fillStyle = baseBg;
  ctx.fillRect(0, 0, 1024, 1024);

  // Paint all UV islands so front cover, back cover, and spine wrap cleanly
  drawCoverFace(ctx, 16, 16, 470, 385, vol, accentHex);
  drawCoverFace(ctx, 530, 16, 470, 385, vol, accentHex);
  drawCoverFace(ctx, 16, 420, 990, 585, vol, accentHex);

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.needsUpdate = true;

  TEXTURE_CACHE.set(cacheKey, texture);
  return texture;
}
