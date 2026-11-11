import { Composition } from "remotion";
import { AiAgentVideo } from "./AiAgentVideo";
import "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
