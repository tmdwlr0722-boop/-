import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { base, COLORS } from "../theme";
import { pop, rise } from "../anim";
import { lineStart, SCENES } from "./timing";
import { Voice } from "./Voice";

const vbase: React.CSSProperties = {
  ...base,
  justifyContent: "flex-start",
  padding: "200px 80px 0",
};

/* ---------- 1. Intro ---------- */
export const VIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const glow = interpolate(frame, [0, 120], [0.25, 0.55], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ ...vbase, paddingTop: 330 }}>
      <AbsoluteFill
        style={{ background: `radial-gradient(circle at 50% 33%, rgba(124,92,255,${glow}) 0%, transparent 50%)` }}
      />
      <div style={{ fontSize: 280, transform: `scale(${pop(frame, fps, 0)})` }}>🤖</div>
      <div
        style={{
          ...rise(frame, fps, 8),
          fontSize: 220,
          fontWeight: 900,
          lineHeight: 1,
          marginTop: 40,
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        AI
      </div>
      <div style={{ ...rise(frame, fps, 16), fontSize: 140, fontWeight: 900, marginTop: 10 }}>에이전트란?</div>
      <Voice scene="intro" />
    </AbsoluteFill>
  );
};

/* ---------- 2. Chatbot vs Agent ---------- */
const Card: React.FC<{
  icon: string;
  title: string;
  desc: string;
  color: string;
  highlight: boolean;
  style: React.CSSProperties;
}> = ({ icon, title, desc, color, highlight, style }) => (
  <div
    style={{
      width: 920,
      padding: "40px 48px",
      borderRadius: 40,
      background: COLORS.bgSoft,
      border: `5px solid ${highlight ? color : COLORS.dim}`,
      boxShadow: highlight ? `0 0 80px ${color}66` : "none",
      display: "flex",
      alignItems: "center",
      gap: 40,
      ...style,
    }}
  >
    <div style={{ fontSize: 140 }}>{icon}</div>
    <div>
      <div style={{ fontSize: 88, fontWeight: 900, color }}>{title}</div>
      <div style={{ fontSize: 52, fontWeight: 700, marginTop: 8 }}>{desc}</div>
    </div>
  </div>
);

export const VCompare: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const agentAt = lineStart("compare", 1);
  return (
    <AbsoluteFill style={vbase}>
      <div style={{ ...rise(frame, fps, 0), fontSize: 96, fontWeight: 900, marginBottom: 70 }}>
        챗봇과 뭐가 다를까?
      </div>
      <Card
        icon="💬"
        title="챗봇"
        desc="대답만 한다"
        color={COLORS.muted}
        highlight={frame < agentAt}
        style={{ ...rise(frame, fps, 8), opacity: frame < agentAt ? 1 : 0.55 }}
      />
      <div style={{ ...rise(frame, fps, agentAt - 10), fontSize: 90, fontWeight: 900, color: COLORS.muted, margin: "36px 0" }}>
        VS
      </div>
      <Card
        icon="🤖"
        title="AI 에이전트"
        desc="일을 직접 해낸다"
        color={COLORS.accent2}
        highlight={frame >= agentAt}
        style={rise(frame, fps, agentAt)}
      />
      <Voice scene="compare" />
    </AbsoluteFill>
  );
};

/* ---------- 3. Agent loop ---------- */
const STEPS = [
  { icon: "🎯", label: "목표 이해" },
  { icon: "🗺️", label: "계획 세우기" },
  { icon: "🛠️", label: "도구로 실행" },
  { icon: "🔍", label: "결과 확인" },
];
const C = 460; // diagram center
const R = 330;

export const VLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = SCENES.loop.lines;
  const repeatAt = lines[4].start;
  const current = lines.findIndex((l, i) => frame >= l.start && (i === lines.length - 1 || frame < lines[i + 1].start));
  const repeating = frame >= repeatAt;
  // During the last line the highlight travels around the loop.
  const active = repeating ? Math.floor((frame - repeatAt) / 12) % 4 : current;
  const angle = repeating ? ((frame - repeatAt) / 48) * 360 - 90 : -90 + Math.max(0, active) * 90;

  return (
    <AbsoluteFill style={vbase}>
      <div style={{ ...rise(frame, fps, 0), fontSize: 96, fontWeight: 900, textAlign: "center", lineHeight: 1.25 }}>
        에이전트는
        <br />
        이렇게 일해요
      </div>
      <div style={{ position: "relative", width: C * 2, height: C * 2, marginTop: 30 }}>
        <svg width={C * 2} height={C * 2} style={{ position: "absolute", inset: 0 }}>
          <circle cx={C} cy={C} r={R} fill="none" stroke={COLORS.dim} strokeWidth={6} strokeDasharray="14 18" />
          {active >= 0 && (
            <circle
              cx={C + R * Math.cos((angle * Math.PI) / 180)}
              cy={C + R * Math.sin((angle * Math.PI) / 180)}
              r={20}
              fill={COLORS.accent2}
              style={{ filter: `drop-shadow(0 0 16px ${COLORS.accent2})` }}
            />
          )}
        </svg>
        <div
          style={{
            position: "absolute",
            left: C - 120,
            top: C - 120,
            width: 240,
            height: 240,
            borderRadius: 999,
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 120,
            transform: `scale(${pop(frame, fps, 4)}) rotate(${repeating ? (frame - repeatAt) * 3 : 0}deg)`,
          }}
        >
          {repeating ? "🔄" : "🤖"}
        </div>
        {STEPS.map((s, i) => {
          const a = ((i * 90 - 90) * Math.PI) / 180;
          const on = i === active;
          const shown = frame >= lines[Math.min(i, 3)].start - 4 || repeating;
          return (
            <div
              key={s.label}
              style={{
                position: "absolute",
                left: C + R * Math.cos(a) - 150,
                top: C + R * Math.sin(a) - 85,
                width: 300,
                height: 170,
                borderRadius: 32,
                background: on ? COLORS.accent : COLORS.bgSoft,
                border: `4px solid ${on ? COLORS.accent2 : COLORS.dim}`,
                boxShadow: on ? `0 0 60px ${COLORS.accent}aa` : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: shown ? 1 : 0.25,
                transform: `scale(${on ? 1.1 : 1})`,
              }}
            >
              <div style={{ fontSize: 68 }}>{s.icon}</div>
              <div style={{ fontSize: 46, fontWeight: 700 }}>{s.label}</div>
            </div>
          );
        })}
      </div>
      <Voice scene="loop" />
    </AbsoluteFill>
  );
};

/* ---------- 4. Example ---------- */
const TASKS = [
  { icon: "✈️", text: "항공권 검색" },
  { icon: "🏨", text: "호텔 예약" },
  { icon: "📅", text: "일정 등록" },
];

export const VExample: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const work = SCENES.example.lines[1];
  return (
    <AbsoluteFill style={vbase}>
      <div style={{ ...rise(frame, fps, 0), fontSize: 56, color: COLORS.muted, fontWeight: 700 }}>예를 들어</div>
      <div
        style={{
          ...rise(frame, fps, 6),
          marginTop: 28,
          fontSize: 76,
          fontWeight: 900,
          lineHeight: 1.3,
          textAlign: "center",
          padding: "36px 48px",
          borderRadius: 40,
          background: COLORS.bgSoft,
          border: `4px solid ${COLORS.dim}`,
        }}
      >
        💬 “다음 주 부산
        <br />
        출장 준비해 줘”
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 32, width: 920, marginTop: 70 }}>
        {TASKS.map((t, i) => {
          const start = work.start + Math.round((work.frames / 3) * i);
          const doneAt = start + Math.round(work.frames / 3) - 6;
          const done = frame >= doneAt;
          return (
            <div
              key={t.text}
              style={{
                ...rise(frame, fps, start),
                display: "flex",
                alignItems: "center",
                gap: 36,
                fontSize: 72,
                fontWeight: 700,
                padding: "32px 48px",
                borderRadius: 32,
                background: done ? "rgba(52,211,153,0.14)" : COLORS.bgSoft,
                border: `4px solid ${done ? COLORS.good : COLORS.dim}`,
              }}
            >
              <span>{t.icon}</span>
              <span style={{ flex: 1 }}>{t.text}</span>
              <span style={{ color: COLORS.good, fontSize: 80, transform: `scale(${pop(frame, fps, doneAt)})` }}>✔</span>
            </div>
          );
        })}
      </div>
      <Voice scene="example" />
    </AbsoluteFill>
  );
};

/* ---------- 5. Outro ---------- */
export const VOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nameAt = lineStart("outro", 1);
  const hl = { color: COLORS.accent2 };
  return (
    <AbsoluteFill style={{ ...vbase, paddingTop: 340, textAlign: "center" }}>
      <AbsoluteFill
        style={{ background: `radial-gradient(circle at 50% 38%, rgba(34,211,238,0.22) 0%, transparent 55%)` }}
      />
      <div style={{ fontSize: 112, fontWeight: 900, lineHeight: 1.35 }}>
        <div style={rise(frame, fps, 10)}>
          스스로 <span style={hl}>계획</span>하고,
        </div>
        <div style={rise(frame, fps, 40)}>
          <span style={hl}>도구</span>를 써서,
        </div>
        <div style={rise(frame, fps, 70)}>
          끝까지 <span style={hl}>해내는</span> AI
        </div>
      </div>
      <div
        style={{
          ...rise(frame, fps, nameAt),
          marginTop: 70,
          fontSize: 92,
          fontWeight: 900,
          padding: "24px 56px",
          borderRadius: 999,
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
        }}
      >
        🤖 AI 에이전트
      </div>
      <Voice scene="outro" />
    </AbsoluteFill>
  );
};
