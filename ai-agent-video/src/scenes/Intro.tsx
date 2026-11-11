import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { base, COLORS } from "../theme";
import { pop, rise } from "../anim";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = interpolate(frame, [0, 130], [0.25, 0.55]);
  const robot = pop(frame, fps, 0);

  return (
    <AbsoluteFill style={base}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 45%, rgba(124,92,255,${glow}) 0%, transparent 55%)`,
        }}
      />
      <div style={{ fontSize: 180, transform: `scale(${robot})`, marginBottom: 20 }}>🤖</div>
      <div style={{ ...rise(frame, fps, 10), fontSize: 140, fontWeight: 900, letterSpacing: -2 }}>
        AI 에이전트란?
      </div>
      <div style={{ ...rise(frame, fps, 28), fontSize: 56, color: COLORS.muted, marginTop: 24 }}>
        30초 만에 알아보기
      </div>
    </AbsoluteFill>
  );
};
