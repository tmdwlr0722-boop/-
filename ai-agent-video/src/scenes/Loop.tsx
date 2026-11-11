import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { base, COLORS } from "../theme";
import { pop, rise } from "../anim";

const STEPS = [
  { icon: "🎯", label: "목표 이해" },
  { icon: "🗺️", label: "계획 세우기" },
  { icon: "🛠️", label: "도구로 실행" },
  { icon: "🔍", label: "결과 확인" },
];

const RADIUS = 300;
const CYCLE_START = 40;
const STEP_LEN = 45;

export const Loop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = Math.max(0, frame - CYCLE_START);
  const active = frame < CYCLE_START ? -1 : Math.floor(t / STEP_LEN) % STEPS.length;
  const angle = interpolate(t, [0, STEP_LEN * STEPS.length], [0, 360]) - 90;

  return (
    <AbsoluteFill style={{ ...base, flexDirection: "row", gap: 120 }}>
      <div style={{ width: 640 }}>
        <div style={{ ...rise(frame, fps, 0), fontSize: 92, fontWeight: 900, lineHeight: 1.2 }}>
          에이전트는
          <br />
          이렇게 일해요
        </div>
        <div style={{ ...rise(frame, fps, 15), fontSize: 48, color: COLORS.muted, marginTop: 32, lineHeight: 1.5 }}>
          목표를 이룰 때까지
          <br />이 과정을 <span style={{ color: COLORS.accent2, fontWeight: 700 }}>스스로 반복</span>
        </div>
      </div>

      <div style={{ position: "relative", width: 820, height: 820 }}>
        <svg width={820} height={820} style={{ position: "absolute", inset: 0 }}>
          <circle cx={410} cy={410} r={RADIUS} fill="none" stroke={COLORS.dim} strokeWidth={6} strokeDasharray="14 18" />
          {frame >= CYCLE_START && (
            <circle
              cx={410 + RADIUS * Math.cos((angle * Math.PI) / 180)}
              cy={410 + RADIUS * Math.sin((angle * Math.PI) / 180)}
              r={18}
              fill={COLORS.accent2}
              style={{ filter: `drop-shadow(0 0 16px ${COLORS.accent2})` }}
            />
          )}
        </svg>
        <div
          style={{
            position: "absolute",
            left: 410 - 110,
            top: 410 - 110,
            width: 220,
            height: 220,
            borderRadius: 999,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 110,
            transform: `scale(${pop(frame, fps, 5)})`,
          }}
        >
          🤖
        </div>
        {STEPS.map((s, i) => {
          const a = ((i * 90 - 90) * Math.PI) / 180;
          const x = 410 + RADIUS * Math.cos(a);
          const y = 410 + RADIUS * Math.sin(a);
          const on = i === active;
          const appear = pop(frame, fps, 10 + i * 6);
          return (
            <div
              key={s.label}
              style={{
                position: "absolute",
                left: x - 150,
                top: y - 80,
                width: 300,
                height: 160,
                borderRadius: 32,
                background: on ? COLORS.accent : COLORS.bgSoft,
                border: `4px solid ${on ? COLORS.accent2 : COLORS.dim}`,
                boxShadow: on ? `0 0 60px ${COLORS.accent}aa` : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${appear * (on ? 1.08 : 1)})`,
              }}
            >
              <div style={{ fontSize: 64 }}>{s.icon}</div>
              <div style={{ fontSize: 44, fontWeight: 700 }}>{s.label}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
