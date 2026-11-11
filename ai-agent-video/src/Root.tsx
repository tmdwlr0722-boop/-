import { Composition } from "remotion";
import { AiAgentVideo } from "./AiAgentVideo";
import { VerticalVideo } from "./vertical/VerticalVideo";
import { TOTAL_FRAMES } from "./vertical/timing";
import "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AiAgentExplainerVertical"
        component={VerticalVideo}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AiAgentExplainer"
        component={AiAgentVideo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
