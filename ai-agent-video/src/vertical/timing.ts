import voiceover from "../voiceover.json";

export const FPS = 30;
export const LEAD_IN = 12; // frames of silence before a scene's first line
export const GAP = 8; // frames between lines
export const TAIL = 16; // frames after a scene's last line
export const FADE = 10; // crossfade between scenes

export type Line = { text: string; file: string; start: number; frames: number };
export type Scene = { id: string; lines: Line[]; duration: number };

export const SCENES: Record<string, Scene> = Object.fromEntries(
  voiceover.map((s) => {
    let t = LEAD_IN;
    const lines = s.lines.map((l) => {
      const frames = Math.ceil(l.seconds * FPS);
      const line = { text: l.text, file: l.file, start: t, frames };
      t += frames + GAP;
      return line;
    });
    return [s.id, { id: s.id, lines, duration: t - GAP + TAIL }];
  }),
);

export const ORDER = ["intro", "compare", "loop", "example", "outro"] as const;

export const TOTAL_FRAMES =
  ORDER.reduce((sum, id) => sum + SCENES[id].duration, 0) - FADE * (ORDER.length - 1);

export const lineStart = (id: string, i: number) => SCENES[id].lines[i].start;
