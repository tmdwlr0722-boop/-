import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../theme";
import { SCENES } from "./timing";

const Caption: React.FC<{ text: string; frames: number }> = ({ text, frames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 8 });
  const exit = interpolate(frame, [frames, frames + 6], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 1450 }}>
      <div
        style={{
          maxWidth: 920,
          padding: "22px 40px",
          borderRadius: 28,
          background: "rgba(0,0,0,0.62)",
          border: `3px solid ${COLORS.accent2}55`,
          fontSize: 58,
          fontWeight: 700,
          lineHeight: 1.35,
          textAlign: "center",
          wordBreak: "keep-all",
          opacity: enter * exit,
          transform: `translateY(${interpolate(enter, [0, 1], [24, 0])}px)`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

/** Plays a scene's voice lines and shows each one as a caption. */
export const Voice: React.FC<{ scene: string }> = ({ scene }) => (
  <>
    {SCENES[scene].lines.map((l) => (
      <Sequence key={l.file} name={l.text} from={l.start} durationInFrames={l.frames + 6} layout="none">
        <Audio src={staticFile(l.file)} />
        <Caption text={l.text} frames={l.frames} />
      </Sequence>
    ))}
  </>
);
