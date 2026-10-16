---
authors: Tomas Staniulis
body_locked: true
category: Case Studies
content_tier: playbook
date: 2026-10-14
faq:
- answer: A single text-to-video prompt mixes writing, voice, layout, and QA into
    one opaque render. Splitting work across Cursor, ElevenLabs, Remotion, and Playwright
    keeps every layer inspectable and repeatable.
  question: Why use four bounded tools instead of an all-in-one AI video generator?
- answer: The pre-API script checks each voiceover line against a 2.6 words-per-second
    ceiling before calling ElevenLabs. That is a preflight filter. After synthesis,
    the script measures the audio duration, and the 900-frame cut does not stretch.
  question: How does the Video Agent prevent voiceover from overflowing a scene?
- answer: Playwright launches a headless browser at 2x device scale against VITE_MAX_BUILD_MODULE=12
    so the capture is aimed at the live twelve-module release rather than unshipped
    authoring drafts. The setting aims the browser. The still review confirms the frame.
  question: Why does Playwright capture product stills inside the video pipeline?
hero_caption: Pipeline worksheet of the local Video Agent — input brief flows to the
  Agent Brain, across four bounded tools (Cursor, ElevenLabs, Remotion, Playwright),
  and through the render QA pass or fail gates before delivery.
hero_image: images/articles/video-agent-four-bounded-tools-case-study/hero.png
key_takeaway: A production video agent is not one giant text-to-video prompt. It is
  an orchestrator over four tools with clearly assigned jobs, and a pass-or-fail check
  before any MP4 ships.
slug: video-agent-four-bounded-tools-case-study
status: published
summary: In 2019 I wanted an automated video system after cutting hip-hop videos as
  Mr.Bullet. The channel now has 164 videos and about 17.9 million views. The Video
  Agent orchestrates Cursor, ElevenLabs, Remotion, and Playwright from brief to master.
tags:
- agents
- orchestration
- workflow-automation
- eval
- context
title: One Agent and Four Bounded Video Tools
---

*First-party operator build on `promptanatomy.app` and `promptanatomy.blog`, paired with an anonymized composite (Northline B2B) enablement team contrast.*

In 2019, when I started my serious run as the hip-hop creator **Mr.Bullet** on [youtube.com/@MrBulletLt](https://www.youtube.com/@MrBulletLt), I kept coming back to one engineering thought. The channel in Lithuania had been registered since July 5, 2007, and over the years it grew to **164 videos**, **13.2K subscribers**, and **17,932,573 views**. Behind those numbers sat hundreds of late nights manually nudging keyframes, lining vocal stems up to the drum grid, and waiting on timeline exports. Even in 2019, I wanted to build an automated video system that could take a structured idea and compile a finished master. Seven years later, that dream finally came true.

## Why the 2019 dream waited seven years for the right system

Hip-hop production teaches you a blunt lesson that most AI video demos ignore: rhythm, syllable density, and cut timing are math, not vibes. An anonymized composite (Northline B2B) hit that same wall. Their enablement team tried to automate product explainers with browser timeline editors and one-shot video generators. Every time product copy changed, someone had to re-record audio, drag scene markers by hand, and re-export broken captions. They were prompting a black box instead of engineering a repeatable workflow.

The hero diagram above shows the architecture that solved that problem for our own ecosystem: **One Agent: Video From Idea to Result**. Instead of asking one model to hallucinate pixels, the system separates orchestration from execution. Work moves left to right across four stages: **INPUT** (*Brief, idea or requirements*), **AGENT BRAIN** (*Plans and orchestrates*), **PRODUCTION** (*four bounded tools*), and **OUTPUT** (*Approved video*). Underneath the production block sits the step that makes the pipeline trustworthy. **RENDER MP4** feeds a **QA PASS / FAIL** gate where failures loop back via the red `Fix & iterate` path.

The Agent Brain is the Cursor session on this machine. It plans the cut, edits the repository, and reads a failed script. The Cursor box in the diagram is that session's editing job, not a second planner beside it. ElevenLabs is an external voice service. Composition, render, and the session itself stay local.

That layout mirrors the core thesis in [The Model Is Not the System](/articles/the-model-is-not-the-system/). In 2019, the missing pieces were code-driven video composition, word-accurate neural speech, and a coding agent that could read a compiler or pixel error. By 2026 those pieces could sit in one repository under one session.

## Inside the production box: four tools with clearly assigned jobs

Most multi-tool agents fail because tools share blurry responsibilities. When we designed the local `video-agent` following [how to design an AI agent workflow](/articles/how-to-design-an-ai-agent-workflow/), we gave each tool inside the **PRODUCTION** container one job. The jobs meet. Cursor writes the composition, and Remotion runs it. What they do not share is the brief.

- **Cursor (`Build / Refine logic`):** The session writes and refines the TypeScript scene files (`Scene1.tsx` through `Scene3.tsx`), spring physics (`anim.ts`), and shared typography tokens (`layout.ts`). It does not edit raw video files by hand. Every visual change is a diff in React state and frame math.
- **ElevenLabs (`Generate voice`):** ElevenLabs handles neural narration (`eleven_multilingual_v2`) and word-level forced alignment (`scribe_v2` via `@remotion/elevenlabs`). The session does not call ElevenLabs until the local pacing check passes.
- **Remotion (`Compose video`):** Remotion 4 compiles the React composition into a frame-locked 30fps stream at `1920x1080` (and `--scale=2` for `3840x2160` 4K masters). Scenes render over a persistent navy base so a transition does not open onto a blank canvas.
- **Playwright (`Automated evals / QA` and live UI capture):** Whenever a film shows the product interface, Playwright boots headless Chromium at `deviceScaleFactor: 2` (`2880x1800`) against `VITE_MAX_BUILD_MODULE=12`. That pin aims the capture at the twelve live modules on `promptanatomy.app`, rather than the eighteen modules in local authoring drafts. The pin aims the browser. I still look at the frame.

| Production block | Assigned job | Check the session enforces |
|---|---|---|
| **Cursor** | Scene logic, spring math, and copy constants | Strings come from live `.app` or `.blog` source files |
| **ElevenLabs** | Voice synthesis and `scribe_v2` word timestamps | Blocked until `voiceover.mjs --check` confirms `<= 2.6 words/sec` |
| **Remotion** | Frame-locked 30fps React composition and 4K scaling | `calculateMetadata` duration stretching is forbidden |
| **Playwright** | Retina `2880x1800` product captures | Pointed at `VITE_MAX_BUILD_MODULE=12`, then checked by eye |

## The input contract: live copy lock and pre-API speech budgets

The left side of the architecture diagram starts with **INPUT** feeding the **AGENT BRAIN**. In a naive setup, an operator types "make a 30-second promo video" and the LLM invents marketing slogans. In our system, the input contract follows [context architecture](/articles/what-is-context-architecture/) rules. The session must ground every on-screen card and spoken sentence in the live repository (`src/i18n/translations.ts` on `.app` or the published Markdown playbook on `.blog`). Prices are banned from the canvas so videos never go stale when packaging evolves.

Before the session spends a single ElevenLabs credit, it runs `node scripts/voiceover.mjs <target> --check`. That script measures every planned line against the exact frame window (`fits`) allocated in the Remotion timeline. If a line exceeds `2.6 words/sec`, the gate fails before any network call happens. That count is a preflight filter. It does not by itself prove the spoken file fits. After ElevenLabs returns the clip, the same script measures duration. The session is also forbidden from using Remotion's `calculateMetadata` to stretch a composition when narration runs long. A 30-second cut stays locked at 900 frames at 30fps. If the voiceover does not fit the bar, the session rewrites the line the same way an MC trims extra syllables to stay in pocket.

<figure class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/65iv21lZttk"
    title="Prompt Anatomy 1: From random AI chats to a workflow"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    allow="encrypted-media; picture-in-picture; fullscreen"
    allowfullscreen>
  </iframe>
  <figcaption>Video 1. <em>Prompt Anatomy 1: From random AI chats to a workflow</em> (30s, 30fps). Built from live repository copy, paced under the preflight, duration-checked, and rendered through Remotion.</figcaption>
</figure>

Watching the embedded cut above shows what that input contract buys in practice. Every card enters on a deterministic spring curve. Typography stays at or above the 44px floor at 1080p so the type is large. That floor is a design choice. I still check the stills before I trust the cut on a phone. Narration lands inside each scene transition because the audio was measured after synthesis, not only counted in advance.

## One failed stem

A finished render is not a shipped film. A failed check comes back as a log. The session proposes a fix. I still decide when the file goes out.

The first voice stem failed on a click at -0.62 dBFS in the first 50 milliseconds. That spike is decoder priming, not speech. It is the pop I used to catch by scrubbing exports for [@MrBulletLt](https://www.youtube.com/@MrBulletLt). The fix skips those 50 milliseconds and restages the gain. The next pass held peaks around -1.6 to -2.2 dBFS, with 0 clipped samples. The script could report the pass. It could not call the film ready.

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

Blank frames, freezes, and hard cuts are in [Part 2: Video Agent Evals and Production Gates](/articles/video-agent-evals-practices-and-growth-case-study/). Never stop dreaming, mate. Make the gate a measurement, then watch the stills.
