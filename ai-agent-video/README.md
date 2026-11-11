# AI 에이전트 설명 영상 (30초)

Remotion으로 만든 1920×1080, 30fps, 30초 설명 영상입니다.

| 구간 | 장면 |
|---|---|
| 0–4초 | 인트로: "AI 에이전트란?" |
| 4–10초 | 챗봇 vs AI 에이전트 |
| 10–20초 | 에이전트의 작업 루프 (목표 → 계획 → 실행 → 확인) |
| 20–26초 | 예시: "다음 주 부산 출장 준비해 줘" |
| 26–30초 | 한 줄 요약 |

## 미리보기 / 렌더링

```bash
npm i
npm run dev                                   # Remotion Studio 미리보기
npx remotion render AiAgentExplainer out/ai-agent-explainer.mp4
```

완성본: `ai-agent-explainer.mp4`

폰트: Noto Sans KR (SIL Open Font License, `public/fonts/OFL.txt`)

---

# 세로 버전 (쇼츠·릴스용, 음성 + 자막)

- 컴포지션: `AiAgentExplainerVertical` (1080×1920, 30fps, 약 40초)
- 완성본: `ai-agent-explainer-vertical.mp4`
- 대본: `scripts/script.json` (`text` = 자막, `say` = 읽는 방식이 다를 때의 발음용 문장)
- 음성: 오프라인 한국어 TTS(sherpa-onnx + `vits-mimic3-ko_KO-kss_low`)로 생성, `public/voiceover/`
- 장면 길이와 자막 타이밍은 `src/voiceover.json`의 음성 길이에 맞춰 자동 계산됩니다.

대본을 고친 뒤 다시 만들기:

```bash
pip install "sherpa-onnx<2" soundfile
# https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-mimic3-ko_KO-kss_low.tar.bz2 를 받아 압축 해제
python scripts/generate_voiceover.py <모델 폴더>
npx remotion render AiAgentExplainerVertical out/ai-agent-explainer-vertical.mp4
```
