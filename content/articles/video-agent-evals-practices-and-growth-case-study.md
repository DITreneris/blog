---
authors: Tomas Staniulis
body_locked: true
category: Case Studies
content_tier: playbook
date: 2026-10-15
faq:
- answer: Remotion's bundled ffmpeg binary omits filters like freezedetect and signalstats.
    Piping 192x108 grayscale rawvideo frames into Node lets motion-audit.mjs inspect
    every frame transition in under two seconds.
  question: Why does motion-audit.mjs read rawvideo pixel buffers instead of standard
    ffmpeg filters?
- answer: Decoding MP3 voiceovers to 16-bit PCM revealed an AAC decoder priming transient
    around -0.62 dBFS in the first 50 milliseconds. Skipping those first 50 milliseconds
    eliminated the click and kept voice peaks between -1.6 and -2.2 dBFS.
  question: Why does the audio eval skip the first 50 milliseconds of each voiceover
    clip?
- answer: Before writing any Remotion code, 20 JEV Decision Cards from promptanatomy.pro
    scored candidate video ideas into Shoot, Queue, and Drop so the agent only rendered
    high-leverage concepts.
  question: How did JEV Decision Cards govern what the Video Agent was allowed to
    build?
hero_caption: Three gates before a 4K render — voice with no click, pixels with
  no flash, and a person signing the stills.
hero_image: images/articles/video-agent-evals-practices-and-growth-case-study/hero.png
key_takeaway: If a video agent cannot fail its own render on a one-frame white flash,
  a 9-gray luma jump, or a 50ms audio click, a human still has to scrub every timeline
  by hand.
slug: video-agent-evals-practices-and-growth-case-study
status: published
summary: How we wired a 5-gate rawvideo pixel auditor, 50ms PCM transient trimming,
  Scribe v2 word captions, and 20 JEV scope cards to grow our local Video Agent from
  .app to .blog.
tags:
- eval
- agents
- workflow-automation
- governance
- benchmarks
title: Video Agent Evals and Production Gates
---

[One Agent and Four Bounded Video Tools](/articles/video-agent-four-bounded-tools-case-study/) names the runtime. The agent is a Cursor session on this machine. It edits the project, calls ElevenLabs for voice, and renders with Remotion. A failed script returns a log. The session proposes a fix. I still authorize the stills and the upload. This part is what those scripts actually measure. The channel at [youtube.com/@MrBulletLt](https://www.youtube.com/@MrBulletLt) has about 17.9 million views. Years of hearing a bad stem is why a 50-millisecond click counts as a failed check.

## Audio and caption evals: beat-level timing, AAC priming clicks, and `scribe_v2`

Years of cutting music videos train your ear to refuse a clipped consonant or a late subtitle. When we wired `scripts/voiceover.mjs` as the first automated gate in our [evaluation hooks for AI workflows](/articles/evaluation-hooks-for-ai-workflows/), we found three failure modes that a human would only notice after rendering.

First, after the pre-API `<= 2.6 words/sec` check passes and ElevenLabs returns the audio, `voiceover.mjs` runs `ffprobe` on every generated file. If the actual duration exceeds the scene's `fits` window or overlaps the next line's `at` start timestamp, the script exits non-zero and blocks the render. Second, decoding generated MP3 clips to `pcm_s16le` WAV in Node exposed an AAC decoder priming transient hitting `-0.62 dBFS` inside the first 50 milliseconds. Skipping those first `50ms` during peak analysis and gain staging (`VOICE_GAIN = 1.7` to `2.0`) stabilized voice peaks between `-1.6` and `-2.2 dBFS`. Every master shipped with zero clipped samples.

Third, static sentence subtitles felt dead against a 30fps motion canvas. We upgraded the agent to call ElevenLabs `scribe_v2` (`timestamps_granularity=word`), convert the response through `@remotion/elevenlabs`, and commit word-timed JSON to the repo. A dedicated `SpokenCaptions.tsx` layer now highlights the active spoken word in brand gold (`#cfa73a`) across both English and Lithuanian tracks without calling any external API during Remotion renders.

## Visual evals: building a 5-gate rawvideo pixel auditor (`motion-audit.mjs`)

A coding agent cannot "watch" an MP4 the way an editor watches a monitor, and Remotion's bundled `ffmpeg` binary omits standard diagnostic filters like `freezedetect` and `signalstats`. To make the **QA • PASS / FAIL** box in our architecture diagram real, we wrote `scripts/motion-audit.mjs`. It pipes the rendered MP4 out as `192x108` grayscale `rawvideo` buffers at 30fps and runs five binary checks in under two seconds.

- **Gate 1 — Zero blank dips (`blankDips === 0`):** Counts frames where fewer than `0.2%` of pixels are lit (`pixel > 28`). This immediately caught a Remotion `<Series>` boundary bug at frames 322 and 715. Fading an outer `AbsoluteFill` exposed a 1-frame white flash instead of fading content over a persistent `NavyBase` (`#0b1320`).
- **Gate 2 — Maximum freeze ceiling (`maxFreezeS <= 2.0s`):** Measures consecutive frames with mean luma delta `< 0.12` outside the intentional end-card hold. A broken spring never leaves the viewer staring at a frozen screen.
- **Gate 3 — Zero hard cuts (`hardCuts === 0`, `diff <= 4`):** Flags any frame-to-frame luma spike above 4 gray levels outside declared scene boundaries. When a white browser card covering 47% of the viewport in `AppInsideEn` exited over a `0.4s` ease, it spiked at `~9 gray/frame` and failed the gate. Replacing that ease with a `1.3s` linear fade ending `0.4s` before the scene boundary brought the transition inside spec. The same check also caught instant boolean border toggles (`frame >= 96`) and forced 8-frame `interpolate()` ramps.
- **Gate 4 — Broadcast pixel format (`pix_fmt === "yuv420p"`):** Caught `setVideoImageFormat("jpeg")` in `remotion.config.ts` emitting full-range `yuvj420p` (`bt470bg`) and forced TV-range PNG frame rendering.
- **Gate 5 — Color space lock (`color_space === "bt709"`):** Verifies standard HD and 4K color metadata on every master file.

```javascript
const gates = [
  { name: "no blank dips (<0.2% lit pixels)", ok: blankDips === 0, detail: `${blankDips} frames` },
  { name: "max freeze <= 2.0s (excl. end hold)", ok: maxFreezeS <= 2.0, detail: `${maxFreezeS}s` },
  { name: "no hard cuts (diff > 4)", ok: hardCuts === 0, detail: `${hardCuts} spikes` },
  { name: "pixel format yuv420p (TV range)", ok: probe.pix_fmt === "yuv420p", detail: probe.pix_fmt },
  { name: "color space bt709", ok: probe.color_space === "bt709", detail: probe.color_space },
];
```

<figure class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/2bjr6CMt46c"
    title="Prompt Anatomy 2: The Model Is Not The System"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    allow="encrypted-media; picture-in-picture; fullscreen"
    allowfullscreen>
  </iframe>
  <figcaption>Video 2. <em>Prompt Anatomy 2: The Model Is Not The System</em>. Every transition, caption highlight, and color token passed the 5-gate rawvideo pixel auditor before the 4K master was rendered.</figcaption>
</figure>

## Production practices: 20 JEV decision cards, brand sync, and the 6-still human gate

Fast agents create a new risk: rendering twenty mediocre videos just because rendering is cheap. Before we let `video-agent` build a catalog, we used `promptanatomy.pro` to generate **20 JEV Decision Cards** that scored every candidate concept on value, evidence, and execution fit. Five concepts scored `0.95` to `1.0` and entered the **Shoot** lane (`shoot_context`, `shoot_model`, `shoot_ground`, `shoot_cloud`, `shoot_inside`). Three concepts stayed in **Queue** (`queue_injection`, `queue_hooks`, `queue_mcp`), while low-leverage ideas were explicitly **Dropped** (`drop_vibe`, `drop_fourth`, `drop_help`, `drop_pro`). We recorded those decisions in `docs/video-production-plan.md` as an append-only state ledger, applying the same discipline we teach in [prompt regression testing in one week](/articles/prompt-regression-testing-week/).

We also drew a hard line between automated gates and human judgment, matching [handoff rules between humans and AI](/articles/handoff-rules-between-humans-and-ai/). Before running a `--scale=2` 4K export, the agent renders six diagnostic PNG stills (`frames 75, 230, 400, 500, 650, 850`) for human sign-off. Meanwhile, the Remotion project stays outside the public repository and the Vercel build, so Chromium and ffmpeg dependencies never bloat the web deploys described in [shipping Prompt Anatomy](/articles/shipping-prompt-anatomy/).

| Maturity stage | Capability added to the Video Agent | Failure mode eliminated |
|---|---|---|
| **Stage 1 (`v1` silent cuts)** | Remotion 30fps scenes + 44px type floor + `#0b1320` / `#cfa73a` tokens | Illegible mobile text and legacy `#fbd304` color drift |
| **Stage 2 (`v2` voiced masters)** | `voiceover.mjs --check` (`<= 2.6 w/s`) + `50ms` PCM transient trim + `motion-audit.mjs` | Scene audio overflows, `-0.62 dBFS` AAC clicks, and `<Series>` white flashes |
| **Stage 3 (`v3` live UI + captions)** | `scribe_v2` word-synced EN/LT captions + Playwright `2880x1800` live captures | Static subtitles and screenshots showing unshipped authoring modules |
| **Stage 4 (Cross-repo `.blog` scale)** | The `.app` harness checks a second Remotion project (`ContextArchitectureVo`) rendered for `.blog` | Single-repo lock-in; blog pillars now compile into companion films |

## What traveled to this blog

The table is the growth. The move was the test. `ContextArchitectureVo` is composed in a small Remotion project that sits beside this blog, outside the public repository. The harness stayed in the `promptanatomy.app` checkout. The same `voiceover.mjs --check` budget and the same `motion-audit.mjs` gates ran against the `.blog` render before it was signed. Pacing and color did not get debugged a second time.

<figure class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/UFexDA-Br3E"
    title="Prompt Anatomy 3: Inside view. Modules 1–3"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    allow="encrypted-media; picture-in-picture; fullscreen"
    allowfullscreen>
  </iframe>
  <figcaption><em>Prompt Anatomy 3: Inside view. Modules 1–3.</em> The product surface those captures and pixel checks are guarding.</figcaption>
</figure>

<div class="video-shorts">
  <figure class="video-embed video-embed--short">
    <iframe
      src="https://www.youtube-nocookie.com/embed/po8tLKN4E0w"
      title="Why the model is not the same as a system?"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen>
    </iframe>
    <figcaption>Short. Why the model is not the same as a system.</figcaption>
  </figure>
  <figure class="video-embed video-embed--short">
    <iframe
      src="https://www.youtube-nocookie.com/embed/AsYQxA2_JYk"
      title="Prompt Anatomy short on prompt engineering and training"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen>
    </iframe>
    <figcaption>Short. Prompt engineering and Prompt Anatomy training.</figcaption>
  </figure>
</div>

In 2019 the automated system was still a wish. This workstation now runs the Cursor session from [Part 1](/articles/video-agent-four-bounded-tools-case-study/). These checks are what that session reads before I sign a master. The channel at [@MrBulletLt](https://www.youtube.com/@MrBulletLt) has about 17.9 million views. The views did not build the gates. The failed stems did.
