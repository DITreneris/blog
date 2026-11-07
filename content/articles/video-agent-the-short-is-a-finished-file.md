---
authors: Tomas Staniulis
body_locked: true
category: Case Studies
content_tier: playbook
date: 2026-11-07
faq:
- answer: It may replace the old ending with the destination close. On The List
    the Thanks ending comes out and the app line goes in. The list, and the voice
    recorded for it, stay as approved.
  question: What may the Video Agent change after the master is approved?
- answer: A render script can draw the frames and still pass a joke that a person
    will not sign. Animator's decision is whether the story is clear in one still
    and whether the laugh holds. The Video Agent never makes that call. It receives
    the master after a person has approved it.
  question: Why is Animator an agent rather than a rendering script?
- answer: Compare the approved master with the delivered file. The animator
    file of The List still closes on Thanks. The short does not. Frame and
    loudness checks still run. They do not sign the laugh.
  question: How is the delivered file checked?
hero_caption: 17.00 seconds of joke, a person between the files, 18.41 seconds
  delivered. The ending may change. The joke stays locked.
hero_image: images/articles/video-agent-the-short-is-a-finished-file/hero.png
key_takeaway: Once a person approves the master, the next agent's work is delivery.
  The old ending can come off. The joke stays, including the voice recorded for
  The List.
slug: video-agent-the-short-is-a-finished-file
status: draft
summary: A cartoon passed the frame checks and still failed as a joke. Animator
  owns that decision. After a person approves the master, the Video Agent may
  replace the old ending with the destination close and may not redraw the joke.
tags:
- agents
- orchestration
- workflow-automation
- eval
title: The Short Is a Finished File
---

The first cut of this pay joke was readable and dead. Sixteen numbers sat on screen, and nothing moved that a viewer could follow. Frame checks would have passed it. A person would not. I split the work. Animator decides whether the joke is clear. The Video Agent receives the approved master and prepares delivery. The part worth copying is the limit on that second agent. Delivery may replace the ending. It may not redraw the joke.

## Where the still came from

I published two books of short stories before any of this was a video problem. Hemingway, Jack London, and O. Henry were the teachers. A story works when one turn lands, and the rest can go. Songs later taught the same cut. Three minutes was already short if the hook was late. From 2022 to 2024 I made static PNG memes, a large set of them, and each one had to carry the joke in a single frame. I kept that folder because the frame was the whole piece. Making a still move is this thirty-second film. The motion has to serve that frame. That is why the list had to be clear before I animated it.

## The explainer keeps its owner

[One Agent and Four Bounded Video Tools](/articles/video-agent-four-bounded-tools-case-study/) is still the right owner for a 16:9 lesson. The Video Agent is the Cursor session on this machine. It writes the scene, calls voice, renders with Remotion, and reads a failed script. When a film shows the product, Playwright still captures the live interface, and a person still signs the stills before upload. [Video Agent Evals and Production Gates](/articles/video-agent-evals-practices-and-growth-case-study/) is what that session reads before a master is signed. A click, a flash, or a line that misses its bar fails the film.

A cartoon punchline fails a different test. The frame can be legal and the joke can still be unclear. Putting that test inside the explainer pipeline would ask a pixel check to approve a laugh. The teaching films stay on the first agent. The joke gets its own repository, its own frame clock, and a person whose job is the laugh.

## One screen, then a still, then the motion

The sixteen-number cut animated the whole comparison. Separate shots for each character made individual gags louder and lost the story. A viewer could no longer tell who was who, or why the coder was the one paying.

The version that was approved went back to one screen. One gag and one number per row. A single still of the finished list had to read in a few seconds before any animation time was spent. Recorded voice lines set the scene lengths, and the on-screen caption matches the spoken line. Code can check frames and loudness. Comedy timing still needs a person. Reviewer scores stay opinions until a viewer test says otherwise.

That work lives in [animator](https://github.com/DITreneris/animator), separate from the teaching films. Every frame of this film is drawn from code. Music and effects are synthesized on the same frame numbers as the picture, and the punchline uses recorded lines. The repository can rebuild the file. The same reason [the model is not the system](/articles/the-model-is-not-the-system/) applies on a vertical canvas. A generate call would hide the clock, the joke, and the rebuild inside one file nobody can diff.

Three rules are enough to approve the next cut of this joke:

- The story has to survive as one still.
- The voice length sets the scene length.
- A person signs the laugh. Code signs the frames and the loudness.

Those three rules are how this joke was approved. Delivery is the next step, and it is a smaller one.

## The second agent does not reopen the joke

The hero is that handoff. Animator hands over a finished joke. A person approves it. The Video Agent may change the ending and may not redraw the joke.

On *The List* the voice is mine. The line is "Wait, you guys are getting paid?" You can hear it in the first player. The animator file still closes on "Thanks!" and the app mark. The short does not. That ending was replaced with the line that points at the app. The rows, the voice, and the jaw-drop stayed.

[How to design an AI agent workflow](/articles/how-to-design-an-ai-agent-workflow/) gives each tool one job. Here the split is between two decisions. Animator decides whether the joke holds. The Video Agent decides only how an approved master is delivered. The MP4 is the object that crosses. The approval is the person's signature on that master, which a file cannot supply by itself.

The other three shorts use the same limit, and they did not arrive as the same kind of file. *Says Here* keeps the cartoon and puts the app pill after it. The voices in that cartoon are synthetic, and the model license is still unconfirmed, so this note does not treat them as a cleared commercial take. *Payday Slot Machine* has no spoken cast. The on-screen payoff stays in the picture, and no spoken close was added. *Emma Blocked* started as a chat GIF with no app mark. Animator retimed it and added taps and whooshes. The upload closes on the line that points at this blog.

<div class="video-shorts">
  <figure class="video-embed video-embed--short">
    <iframe
      src="https://www.youtube-nocookie.com/embed/qu4R-JZ8UkI"
      title="You guys are getting paid?"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen>
    </iframe>
    <figcaption>Short. You guys are getting paid? I recorded this voice. The joke stays.</figcaption>
  </figure>
  <figure class="video-embed video-embed--short">
    <iframe
      src="https://www.youtube-nocookie.com/embed/jb_VvvTDIrk"
      title="Says here you used to be our boss?"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen>
    </iframe>
    <figcaption>Short. Says here you used to be our boss? The cartoon stays. The app pill comes after it.</figcaption>
  </figure>
  <figure class="video-embed video-embed--short">
    <iframe
      src="https://www.youtube-nocookie.com/embed/iY9uynyrZsE"
      title="Payday Slot Machine"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen>
    </iframe>
    <figcaption>Short. Payday Slot Machine. The reels are the whole film. No spoken close was added.</figcaption>
  </figure>
  <figure class="video-embed video-embed--short">
    <iframe
      src="https://www.youtube-nocookie.com/embed/TVcre9iFpj0"
      title="You cheated on me!"
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen>
    </iframe>
    <figcaption>Short. You cheated on me! The chat stays. The close points at the blog.</figcaption>
  </figure>
</div>

The four players are the same boundary on four files: my voice on a doodle, a synthetic cartoon, silent reels, and a retimed chat GIF. *The List* rebuilds from [The List](https://github.com/DITreneris/animator/tree/main/the-list) in the animator repository. The file in that repository still contains the Thanks ending. The player above is the cut that replaced it.

Once a person has approved the master, downstream work stays on delivery. The receiving agent does not get permission to reopen the joke. That is the boundary worth designing before a third agent.
