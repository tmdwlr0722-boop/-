import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { base, COLORS } from "../theme";
import { rise } from "../anim";

const Card: React.FC<{
  icon: string;
  title: string;
  line1: string;
  line2: string;
  color: string;
  highlight?: boolean;
  style: React.CSSProperties;
}> = ({ icon, title, line1, line2, color, highlight, style }) => (
  <div
    style={{
      width: 720,
      padding: "56px 48px",
      borderRadius: 40,
      background: COLORS.bgSoft,
      border: `4px solid ${highlight ? color : COLORS.dim}`,
      boxShadow: highlight ? `0 0 80px ${color}55` : "none",
      textAlign: "center",
      ...style,
    }}
  >
    <div style={{ fontSize: 120 }}>{icon}</div>
    <div style={{ fontSize: 84, fontWeight: 900, color, marginTop: 8 }}>{title}</div>
    <div style={{ fontSize: 52, marginTop: 28, fontWeight: 700 }}>{line1}</div>
    <div style={{ fontSize: 44, marginTop: 12, color: COLORS.muted }}>{line2}</div>
  </div>
);

export const Compare: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={base}>
      <div style={{ ...rise(frame, fps, 0), fontSize: 84, fontWeight: 900, marginBottom: 64 }}>
        챗봇과 뭐가 다를까?
      </div>
      <div style={{ display: "flex", gap: 80, alignItems: "center" }}>
        <Card
          icon="💬"
          title="챗봇"
          line1="질문에 대답만 한다"
          line2="“이렇게 해 보세요”"
          color={COLORS.muted}
          style={rise(frame, fps, 15)}
        />
        <div style={{ ...rise(frame, fps, 45), fontSize: 100, fontWeight: 900, color: COLORS.muted }}>
          VS
        </div>
        <Card
          icon="🤖"
          title="AI 에이전트"
          line1="일을 직접 해낸다"
          line2="“제가 처리했어요”"
          color={COLORS.accent2}
          highlight={frame > 75}
          style={rise(frame, fps, 60)}
        />
      </div>
    </AbsoluteFill>
  );
};
