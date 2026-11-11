import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { base, COLORS } from "../theme";
import { pop, rise } from "../anim";

const TASKS = [
  { icon: "✈️", text: "항공권 검색·비교" },
  { icon: "🏨", text: "출장지 근처 호텔 예약" },
  { icon: "📅", text: "캘린더에 일정 등록" },
];

export const Example: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={base}>
      <div style={{ ...rise(frame, fps, 0), fontSize: 52, color: COLORS.muted, marginBottom: 20 }}>예를 들어</div>
      <div
        style={{
          ...rise(frame, fps, 8),
          fontSize: 72,
          fontWeight: 700,
          padding: "32px 56px",
          borderRadius: 36,
          background: COLORS.bgSoft,
          border: `4px solid ${COLORS.dim}`,
          marginBottom: 56,
        }}
      >
        💬 “다음 주 부산 출장 준비해 줘”
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28, width: 1100 }}>
        {TASKS.map((t, i) => {
          const start = 40 + i * 35;
          const done = frame > start + 22;
          return (
            <div
              key={t.text}
              style={{
                ...rise(frame, fps, start),
                display: "flex",
                alignItems: "center",
                gap: 32,
                fontSize: 60,
                fontWeight: 700,
                padding: "24px 40px",
                borderRadius: 28,
                background: done ? "rgba(52,211,153,0.12)" : COLORS.bgSoft,
              }}
            >
              <span>{t.icon}</span>
              <span style={{ flex: 1 }}>{t.text}</span>
              <span
                style={{
                  color: COLORS.good,
                  fontSize: 72,
                  transform: `scale(${pop(frame, fps, start + 22)})`,
                }}
              >
                ✔
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
