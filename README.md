# Jarvis OS — Website

Public-facing product website for **Jarvis OS**, a personal AI operating layer designed around continuity, context, agents, voice, files, tools, and long-running work.

## Direction

This is not a generic SaaS landing page. It is an interactive build-in-public product experience: bold editorial typography, cinematic motion, original Jarvis visual identity, explainable AI-system diagrams, simulated product UI, and interactive learning demos.

The website intentionally distinguishes **concept / target capability / simulation** from features that exist in the real Jarvis runtime.

## Current experience

- Cinematic first-visit system awakening + quick session resume
- Original Jarvis Core Sigil and reactive core states
- Hero particles, parallax, HUD telemetry and scroll choreography
- Interactive command center
- Product Truth Lens
- Original neural/context concept artwork
- Jarvis desktop workspace concept
- Agent-system showcase and session-continuity timeline
- Live Orchestration Lab with prompt-dependent routing visualization
- Binary Signal Wall
- **Inside Jarvis** pinned system journey: Input → Context → Memory → Model Router → Agents → Tools → Verification
- Interactive Tech Atlas with connected architecture highlighting
- AI Systems Lab covering embeddings, vector retrieval, RAG, context windows, local-vs-cloud routing and verification
- Product concept suite: Voice Mode, File Intelligence, Memory Manager, Agent Control, Projects and Privacy/Local Mode
- **Before Jarvis / With Jarvis** contrast story
- **One Command / Whole System** orchestration trace that makes multiple sections react to one goal
- Inspectable **Project Memory Capsule** + one-day continuity story
- Deliberately quiet cinematic continuity scene: “You closed the laptop. The context didn’t.”
- **Evidence Trail** for Prompt → Plan → Change → Test → Verified Result
- Scroll-controlled **browser → Jarvis workspace** transformation
- Real workflow stories for student, developer, founder and creator use cases
- Original silicon/compute concept artwork for the physical Jarvis direction
- Contextual **Ask Jarvis** learning actions on AI architecture cards
- Persistent concept-state HUD and extended keyboard/easter-egg controls
- Optional Web Audio UI sound system (off by default)
- Technical hover annotations
- Responsive layout + reduced-motion support
- Favicon, web manifest, social preview artwork, robots policy and validation/deployment workflows

## Keyboard / interaction shortcuts

- `J` — open Jarvis Command Center
- `B` — replay the full system awakening
- `L` — jump to / focus the Live Orchestration Lab
- `R` — toggle Product Truth Lens
- `M` — jump to Memory Capsule
- `A` — jump to Agent System
- `/` — focus Jarvis command input
- `?` — open keyboard map
- Type `WAKEJARVIS` outside an input — hidden awakening easter egg
- Sound is **off by default** and can be enabled from the top navigation

## Run locally

No build step is required.

```bash
python -m http.server 5500 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:5500
```

## Validation

`.github/workflows/validate.yml` checks JavaScript syntax, local asset references and product-truth labels on every push to `main`.

## Deployment

A GitHub Pages Actions workflow is included at `.github/workflows/pages.yml`. If Pages has not been enabled for the repository yet, choose **GitHub Actions** as the Pages source once in repository settings.

## Repository split

- `Jarvis-OS` — actual desktop / AI assistant product
- `Jarvis-OS-Website` — public product website and launch experience

## Product-truth rule

The website may visualize ambitious future behavior, but concept screens and simulations must remain clearly labeled. Visual polish must never imply that unfinished Jarvis runtime capabilities already exist.
