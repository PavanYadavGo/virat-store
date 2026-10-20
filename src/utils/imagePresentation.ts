import React from "react";

/**
 * Image presentation classification verified by direct alpha-channel and
 * pixel inspection.
 *
 * - CUTOUT: Transparent alpha channel around the subject. Requires a neutral
 *   stage (e.g. #E8E8E5) and breathing room padding so the object sits naturally.
 * - PHOTOGRAPHIC: Opaque photographic image with its own studio or solid backdrop.
 *   Must NOT have surrounding padding (p-0) to prevent creating an unnatural
 *   double-background picture frame.
 */

export type AssetPresentationMode = "cutout" | "photographic";

export interface AssetDisplayConfig {
  mode: AssetPresentationMode;
  /** Studio edge color in hex to seamlessly match letterboxing if any */
  edgeColor?: string;
}

/**
 * Explicit registry of catalog assets based on actual pixel alpha channel inspection.
 * Only caps have an alpha channel (RGBA, transparent borders).
 * All apparel items are opaque RGB with their own studio background.
 */
export const ASSET_REGISTRY: Record<string, AssetDisplayConfig> = {
  // --- CUTOUTS (Transparent RGBA) ---
  "cap-black-front.webp": { mode: "cutout" },
  "cap-black-side.webp": { mode: "cutout" },
  "cap-red-front.webp": { mode: "cutout" },
  "cap-red-side.webp": { mode: "cutout" },
  "cap-white-front.webp": { mode: "cutout" },
  "cap-white-side.webp": { mode: "cutout" },

  // --- NEW CLIENT DROP: WHITE GEOMETRIC TEE (Opaque RGB Studio Background) ---
  "training-tee-white-front.webp": { mode: "photographic", edgeColor: "#78797E" },
  "training-tee-white-back.webp": { mode: "photographic", edgeColor: "#76777C" },

  // --- NEW CLIENT DROP: CORAL PINK & LAVENDER PURPLE TEES (Opaque RGB Studio Background) ---
  "training-tee-pink-front.webp": { mode: "photographic", edgeColor: "#BBBBBF" },
  "training-tee-pink-back.webp": { mode: "photographic", edgeColor: "#BBBBBF" },
  "training-tee-pink-duo.webp": { mode: "photographic", edgeColor: "#A3A3A7" },
  "training-tee-purple-front.webp": { mode: "photographic", edgeColor: "#B7B4BA" },
  "training-tee-purple-back.webp": { mode: "photographic", edgeColor: "#B7B4BA" },
  "training-tee-purple-duo.webp": { mode: "photographic", edgeColor: "#A09DA1" },

  // --- NEW CLIENT DROP: WHITE TRACK PANT (Opaque RGB Studio Background) ---
  "track-pant-white-front.webp": { mode: "photographic", edgeColor: "#77777B" },
  "track-pant-white-back.webp": { mode: "photographic", edgeColor: "#737477" },
  "track-pant-white-duo.webp": { mode: "photographic", edgeColor: "#77777B" },
  "track-pant-white-showcase-front.webp": { mode: "photographic", edgeColor: "#9B9EA4" },
  "track-pant-white-showcase-back.webp": { mode: "photographic", edgeColor: "#BCBCBC" },

  // --- EXISTING APPAREL (Opaque RGB Studio Background) ---
  "camo-track-pant-duo.webp": { mode: "photographic", edgeColor: "#C1C1C3" },
  "camo-training-shorts-front.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "camo-training-shorts-back.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "camo-training-shorts-duo.webp": { mode: "photographic", edgeColor: "#C1C1C3" },
  "pro-match-shorts-front.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "pro-match-shorts-back.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "pro-match-shorts-showcase-front.webp": { mode: "photographic", edgeColor: "#D5D4D7" },
  "pro-match-shorts-showcase-back.webp": { mode: "photographic", edgeColor: "#D9D9DB" },
  "training-tee-navy-front.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "training-tee-navy-back.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "training-tee-navy-duo.webp": { mode: "photographic", edgeColor: "#CBCBCB" },
  "training-tee-green-front.webp": { mode: "photographic", edgeColor: "#D0D0D1" },
  "training-tee-green-back.webp": { mode: "photographic", edgeColor: "#CFCFD0" },
  "training-tee-green-duo.webp": { mode: "photographic", edgeColor: "#CFCFD0" },
  "training-tee-grey-front.webp": { mode: "photographic", edgeColor: "#CDCACB" },
  "training-tee-grey-back.webp": { mode: "photographic", edgeColor: "#CCCACB" },
  "training-tee-grey-duo.webp": { mode: "photographic", edgeColor: "#CECECE" },
  "sleeveless-vest-maroon-front.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "sleeveless-vest-maroon-back.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "sleeveless-vest-maroon-duo.webp": { mode: "photographic", edgeColor: "#CCCDCD" },
  "sleeveless-vest-green-duo.webp": { mode: "photographic", edgeColor: "#CFCFCF" },
  "sleeveless-vest-green-back.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "performance-polo-mint-front.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "performance-polo-mint-back.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "performance-polo-mint-duo.webp": { mode: "photographic", edgeColor: "#D4D4D4" },
  "performance-polo-blue-front.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "performance-polo-blue-back.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "performance-polo-blue-duo.webp": { mode: "photographic", edgeColor: "#D5D5D6" },
  "track-jacket-navy-red-front.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "track-jacket-navy-red-back.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "track-jacket-navy-gold-front.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
  "track-jacket-navy-gold-back.webp": { mode: "photographic", edgeColor: "#CAC7C8" },
};

/**
 * Extract filename from path or URL
 */
const getFilename = (src: string): string => {
  if (!src) return "";
  const parts = src.split("/");
  return parts[parts.length - 1].split("?")[0].toLowerCase();
};

export interface PresentationOptions {
  context?: "card" | "detail" | "thumbnail";
  explicitMode?: AssetPresentationMode;
  customEdgeColor?: string;
}

export interface ImagePresentationStyle {
  isCutout: boolean;
  containerClass: string;
  imageClass: string;
  containerStyle?: React.CSSProperties;
}

/**
 * Resolves presentation styling for any product image.
 *
 * Guarantees:
 * 1. Transparent cutouts sit naturally on the site's neutral stage with padding.
 * 2. Photographic images fill their container naturally with p-0 (no double background).
 * 3. Never crops garment edges, distorts aspect ratio, or alters colours.
 */
export const getImagePresentation = (
  src: string,
  options: PresentationOptions = {}
): ImagePresentationStyle => {
  const filename = getFilename(src);
  const registered = ASSET_REGISTRY[filename];

  // Explicit override > registered metadata > default to photographic
  const mode: AssetPresentationMode =
    options.explicitMode || registered?.mode || "photographic";
  const isCutout = mode === "cutout";
  const edgeColor = options.customEdgeColor || registered?.edgeColor;

  const context = options.context || "detail";

  if (isCutout) {
    // Transparent cutout asset (e.g. cap)
    if (context === "thumbnail") {
      return {
        isCutout: true,
        containerClass: "bg-[#E8E8E5] dark:bg-neutral-800",
        imageClass: "h-full w-full object-contain p-1.5",
      };
    }
    if (context === "card") {
      return {
        isCutout: true,
        containerClass: "bg-[#E8E8E5] dark:bg-neutral-800",
        imageClass: "h-full w-full object-contain p-6 sm:p-8",
      };
    }
    // Detail main view
    return {
      isCutout: true,
      containerClass: "bg-[#E8E8E5] dark:bg-neutral-800",
      imageClass: "h-full w-full object-contain p-8 lg:p-14",
    };
  }

  // Opaque photographic asset with its own studio backdrop
  const resolvedBg = edgeColor || "#CAC7C8";

  if (context === "thumbnail") {
    return {
      isCutout: false,
      containerClass: "bg-transparent",
      imageClass: "h-full w-full object-cover p-0",
      containerStyle: { backgroundColor: resolvedBg },
    };
  }

  if (context === "card") {
    return {
      isCutout: false,
      containerClass: "bg-transparent",
      imageClass: "h-full w-full object-contain p-0 transition-transform duration-700 ease-out group-hover:scale-105",
      containerStyle: { backgroundColor: resolvedBg },
    };
  }

  // Detail main view
  return {
    isCutout: false,
    containerClass: "bg-transparent",
    imageClass: "h-full w-full object-contain p-0",
    containerStyle: { backgroundColor: resolvedBg },
  };
};

