import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT = "Noto Sans KR";

loadFont({ family: FONT, url: staticFile("fonts/NotoSansKR_400Regular.ttf"), weight: "400" });
loadFont({ family: FONT, url: staticFile("fonts/NotoSansKR_700Bold.ttf"), weight: "700" });
loadFont({ family: FONT, url: staticFile("fonts/NotoSansKR_900Black.ttf"), weight: "900" });

export const COLORS = {
  bg: "#0b1020",
  bgSoft: "#151c33",
  text: "#f5f7ff",
  muted: "#9aa6c7",
  accent: "#7c5cff",
  accent2: "#22d3ee",
  good: "#34d399",
  dim: "#3a4466",
};

export const base: React.CSSProperties = {
  backgroundColor: COLORS.bg,
  fontFamily: FONT,
  color: COLORS.text,
  justifyContent: "center",
  alignItems: "center",
  padding: "100px 120px",
};
