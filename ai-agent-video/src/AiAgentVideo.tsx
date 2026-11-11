import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Intro } from "./scenes/Intro";
import { Compare } from "./scenes/Compare";
import { Loop } from "./scenes/Loop";
import { Example } from "./scenes/Example";
import { Outro } from "./scenes/Outro";

// Scene lengths sum to 948 frames; four 12-frame fades overlap, giving 900 frames (30s @ 30fps).
const FADE = 12;

export const AiAgentVideo: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Intro" durationInFrames={132}>
      <Intro />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: FADE })} />
    <TransitionSeries.Sequence name="Chatbot vs Agent" durationInFrames={192}>
      <Compare />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: FADE })} />
    <TransitionSeries.Sequence name="Agent loop" durationInFrames={312}>
      <Loop />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: FADE })} />
    <TransitionSeries.Sequence name="Example" durationInFrames={192}>
      <Example />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: FADE })} />
    <TransitionSeries.Sequence name="Outro" durationInFrames={120}>
      <Outro />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
