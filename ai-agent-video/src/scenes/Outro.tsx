import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { base, COLORS } from "../theme";
import { rise } from "../anim";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ ...base, textAlign: "center" }}>
      <AbsoluteFill
        style={{ background: `radial-gradient(circle at 50% 50%, rgba(34,211,238,0.22) 0%, transparent 60%)` }}
      />
      <div style={{ ...rise(frame, fps, 0), fontSize: 64, color: COLORS.muted, fontWeight: 700 }}>
        AI 에이전트 =
      </div>
      <div style={{ ...rise(frame, fps, 12), fontSize: 104, fontWeight: 900, lineHeight: 1.3, marginTop: 24 }}>
        스스로 <span style={{ color: COLORS.accent2 }}>계획</span>하고,
        <br />
        <span style={{ color: COLORS.accent2 }}>도구</span>를 써서,
        <br />
        끝까지 <span style={{ color: COLORS.accent2 }}>해내는</span> AI
      </div>
    </AbsoluteFill>
  );
};
