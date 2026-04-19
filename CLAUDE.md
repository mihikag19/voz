# Voz — build rules

Read this file AND ARCHITECTURE.md AND INTERFACE.md before writing any code.

## Project
Voz is a zero-learning-curve commerce platform for immigrant and traditional artisans. Vendor takes a photo, records a voice note in any language, taps one button. They get a live storefront URL shareable via WhatsApp.

## Stack
- Next.js 14 App Router, TypeScript, Tailwind
- Deployed to Vercel
- Supabase for database and image storage
- Anthropic Claude API (model: claude-sonnet-4-6) for 3 of 4 agents
- OpenAI Whisper /audio/translations endpoint for voice (auto-translates to English)
- Fetch.ai ASI1 for Pricing Agent (OpenAI-compatible, model: asi1-mini)

## Ownership lanes
Two people are working in parallel in separate Claude Code sessions. Do NOT modify files outside your lane without a comment marked `// CROSS-LANE:` explaining why.

Backend lane (Sonal):
- /app/api/**
- /lib/**
- supabase/**

Frontend lane (teammate):
- /app/page.tsx
- /app/storefront/[slug]/page.tsx
- /components/**
- /app/globals.css

Shared files (coordinate before touching): INTERFACE.md, CLAUDE.md, ARCHITECTURE.md, package.json, .env.example, tailwind.config.ts.

## Working rules
- When a milestone works, suggest a git commit message and wait for approval before moving on.
- Keep commits small and frequent. Pull before starting new work.
- If an API call fails, add console.log and paste the actual error back — do not guess and rewrite.
- Do not refactor working code unless asked. "Ship it" means commit and move on.
- Validate all agent outputs with the parseJSONSafely pattern in ARCHITECTURE.md. Agents can return malformed JSON.
- Always have a fallback ready if an agent fails. The pipeline must complete end-to-end even if one agent breaks.

## Time discipline
Hackathon ends today. Stop building new features at 2:30 PM. After that: bug fixes, demo prep, deploy only.

## Demo-critical requirements
- /api/demo route returning hardcoded response matching INTERFACE.md schema. Build this FIRST so frontend has something real to hit all day.
- Every async operation must have a timeout and fallback. No silent hangs on stage.
- Frontend shows which agent is running during the pipeline.
