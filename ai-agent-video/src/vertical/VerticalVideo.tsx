import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { VCompare, VExample, VIntro, VLoop, VOutro } from "./scenes";
import { FADE, SCENES } from "./timing";

// Scene lengths follow the generated voiceover (see scripts/generate_voiceover.py).
export const VerticalVideo: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Intro" durationInFrames={SCENES.intro.duration}>
      <VIntro />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: FADE })} />
    <TransitionSeries.Sequence name="Chatbot vs Agent" durationInFrames={SCENES.compare.duration}>
      <VCompare />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: FADE })} />
    <TransitionSeries.Sequence name="Agent loop" durationInFrames={SCENES.loop.duration}>
      <VLoop />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: FADE })} />
    <TransitionSeries.Sequence name="Example" durationInFrames={SCENES.example.duration}>
      <VExample />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: FADE })} />
    <TransitionSeries.Sequence name="Outro" durationInFrames={SCENES.outro.duration}>
      <VOutro />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
