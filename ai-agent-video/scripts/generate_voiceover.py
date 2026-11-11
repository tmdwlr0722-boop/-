"""Generate Korean voiceover lines with an offline sherpa-onnx VITS model.

Requires sherpa-onnx<2 and the vits-mimic3-ko_KO-kss_low model
(https://github.com/k2-fsa/sherpa-onnx/releases/tag/tts-models).

Usage: python generate_voiceover.py <model_dir>
Writes public/voiceover/<scene>-<n>.wav and src/voiceover.json (line timings).
"""
import json
import pathlib
import sys

import sherpa_onnx
import soundfile as sf

root = pathlib.Path(__file__).resolve().parent.parent
model = pathlib.Path(sys.argv[1])
script = json.loads((root / "scripts/script.json").read_text())

tts = sherpa_onnx.OfflineTts(
    sherpa_onnx.OfflineTtsConfig(
        model=sherpa_onnx.OfflineTtsModelConfig(
            vits=sherpa_onnx.OfflineTtsVitsModelConfig(
                model=str(model / "ko_KO-kss_low.onnx"),
                tokens=str(model / "tokens.txt"),
                data_dir=str(model / "espeak-ng-data"),
                length_scale=1.0,
            ),
            num_threads=4,
        )
    )
)

out_dir = root / "public/voiceover"
out_dir.mkdir(parents=True, exist_ok=True)
result = []
for scene in script["scenes"]:
    lines = []
    for i, line in enumerate(scene["lines"]):
        text = line["text"]
        audio = tts.generate(line.get("say", text), sid=0, speed=script.get("speed", 1.0))
        name = f"{scene['id']}-{i}.wav"
        sf.write(out_dir / name, audio.samples, audio.sample_rate)
        dur = len(audio.samples) / audio.sample_rate
        lines.append({"text": text, "file": f"voiceover/{name}", "seconds": round(dur, 3)})
        print(f"{name}: {dur:.2f}s  {text}")
    result.append({"id": scene["id"], "lines": lines})

(root / "src/voiceover.json").write_text(json.dumps(result, ensure_ascii=False, indent=2))
