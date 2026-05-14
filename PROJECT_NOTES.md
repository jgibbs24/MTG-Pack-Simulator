# Project Notes

This file captures useful context from the original Codex development chat that is not fully obvious from the codebase alone.

## Current State

The project has moved from a Stage 1 barebones app into an early interactive pack simulator:

- Full-stack monorepo with `backend/` and `frontend/`.
- Backend is Java 21 + Spring Boot + Maven Wrapper.
- Frontend is React + TypeScript + Vite + TailwindCSS.
- Scryfall is called live and mapped into app-level DTOs.
- The backend has simple in-memory card-pool caching.
- The frontend supports set selection, session stats, card preview, one-by-one reveal, binder view, and animated values.

The project folder was renamed from:

```text
C:\Users\Jameson\Documents\New project
```

to:

```text
C:\Users\Jameson\Documents\MTG-Pack-Simulator
```

If an old Codex chat says the working directory is missing, reopen the project from the new folder.

## Development Environment Notes

Use JDK 21, not Java 18.

Known local JDK 21 path during development:

```powershell
C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot
```

Backend commands should use the Maven Wrapper:

```powershell
cd "C:\Users\Jameson\Documents\MTG-Pack-Simulator\backend"
$env:JAVA_HOME='C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot'
$env:Path="$env:JAVA_HOME\bin;$env:Path"
.\mvnw.cmd spring-boot:run
```

Frontend commands:

```powershell
cd "C:\Users\Jameson\Documents\MTG-Pack-Simulator\frontend"
npm.cmd run dev
```

Build checks used throughout development:

```powershell
cd "C:\Users\Jameson\Documents\MTG-Pack-Simulator\backend"
$env:JAVA_HOME='C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot'
$env:Path="$env:JAVA_HOME\bin;$env:Path"
.\mvnw.cmd -DskipTests compile
```

```powershell
cd "C:\Users\Jameson\Documents\MTG-Pack-Simulator\frontend"
npm.cmd run build
```

If backend startup fails because port `8080` is already in use:

```powershell
netstat -ano | findstr :8080
Stop-Process -Id <PID>
```

## Product Decisions Made In Chat

- Keep Stage 1/2/3 database-free.
- Do not add user accounts yet.
- Do not add PostgreSQL, Spring Data JPA, or Flyway yet.
- Do not add Caffeine yet; current caching is manual in-memory caching.
- Backend should not return raw Scryfall JSON to the frontend.
- Use set codes like `blb`, not full names, for routing and cache keys.
- Keep pack collation intentionally simplified for now.
- Current pack composition is:
  - 10 commons
  - 3 uncommons
  - 1 rare or mythic
  - 1 land
- Mythic chance is approximately 12.5%.
- Current pack type name is `play-booster-barebones`.
- Session stats and binder are frontend-only and reset on refresh.
- Pack summary and session stats should not reveal hidden pack information during one-by-one mode.
- In one-by-one mode, stats and pack summary update only after the user completes the reveal by clicking `Continue`.
- `Reveal all` skips directly to the final grid and updates stats immediately.

## UI / UX Decisions Made In Chat

- Keep a dark MTG-inspired look.
- Avoid a major CSS redesign until a dedicated styling pass.
- Card hover border colors should be rarity-based:
  - Common: muted/darker stone
  - Uncommon: bright silver
  - Rare: bright gold/yellow
  - Mythic: bright orange
- Clicking a card opens a centered larger preview modal.
- One-by-one reveal mode should feel cinematic:
  - One large centered card at a time
  - Previously revealed cards stacked behind the current card
  - Final `Continue` transitions to the full grid
- The static `Bloomburrow` label above the title was removed because the app now supports multiple sets.
- Pack Summary label should say `Pack value`, not `Total value`, because `Total value` is a session stat.
- Binder is currently a session-only top-pulls view.
- Animated currency values should render exactly one dollar sign:
  - `$2.31`
  - `+$4.20`
  - `-$16.21`

## Current Backlog

### Recommended Next Tasks

1. Per-set MSRP / pack metadata
   - Move MSRP out of the frontend hardcoded `$5.99`.
   - Add MSRP to backend pack/set definitions.
   - Return MSRP from `GET /api/sets`.
   - Use the selected set's MSRP for net profit/loss.

2. Better set selection UX
   - Replace the dropdown with richer set cards/buttons.
   - Show set name, code, pack type, and later MSRP.
   - This prepares for a future landing page and set selection flow.

3. New UI flow
   - Landing page with Play button.
   - Dedicated set selection screen.
   - Main opening screen after choosing a set.

4. Binder page improvements
   - Make Binder a fuller view.
   - Add sorting/filtering.
   - Show rarity, set, value, and pull order.
   - Consider separate "best cards" and "all notable pulls" views.

5. Add pack wrapper art
   - Start with static selected-set pack wrapper images.
   - Add opening animation later.

6. Pack wrapper opening animation
   - Add after wrapper art exists.
   - Could transition into the one-by-one reveal.

7. Mythic pull effects
   - Confetti, particles, glow, or a special reveal effect.
   - Best tied to the current one-by-one reveal flow.

8. Animated total value refinements
   - Animate value after each one-by-one reveal.
   - Keep hidden values private until appropriate.

9. Foils
   - Add foil chance.
   - Decide whether foil replaces a slot or is an extra/special slot.
   - Decide how foil pricing is displayed.

10. Alternate arts / showcase / borderless
   - Add treatment-aware Scryfall querying or filtering.
   - Decide how variants affect pack slots.

11. More accurate play booster collation
   - Model real slots more precisely.
   - Add wildcard and foil behavior.

12. Collector booster support
   - Add booster type selection.
   - Add separate `PackDefinition` models for collector boosters.

13. Set-specific themes
   - Backgrounds, accent colors, wrapper art, and UI mood by selected set.

14. Local session persistence
   - Store session stats and binder in `localStorage`.
   - Add a reset session button.

15. Tests
   - Backend tests for pack definitions, unsupported sets, generated counts, and rare/mythic behavior.
   - Frontend tests for set loading, reveal modes, stats timing, and binder updates.

16. Code comments / documentation cleanup
   - Add helpful comments around non-obvious pack generation and reveal logic.
   - Avoid noisy comments that just restate the code.

17. Database
   - PostgreSQL, Spring Data JPA, and Flyway later.
   - Save user collections and pack history later.

18. Real caching library
   - Add Caffeine after caching needs are clearer.

19. User accounts
   - Login/signup.
   - Persistent collection/binder.

20. Deployment
   - Frontend on Vercel.
   - Backend on Render, Railway, or Fly.io.
   - Update CORS and environment configuration.

## Commenting Style Requested

The user asked to see comment style before adding comments throughout the code. The preferred style is to explain why something exists or where future behavior plugs in, not to restate obvious syntax.

Good examples:

```java
// Stage 2 keeps pack definitions in memory so we can add sets without introducing
// PostgreSQL or Flyway yet. This service is the future place for database-backed
// set configuration.
```

```java
// Cache Scryfall pools by set and slot, for example "blb:rare". Opening a pack
// should draw locally from these pools after the first Scryfall request instead
// of making repeated live calls.
```

```tsx
// One-by-one reveal mode should not count the pack in stats until the reveal is
// complete. This prevents hidden pack value, rares, and mythics from leaking early.
```

Avoid comments like:

```tsx
// Set loading to true
setIsLoading(true);
```

or:

```java
// Returns the cards
return cards;
```

## Git / Release Guidance

Regular feature work should be committed and pushed normally.

Create GitHub releases only for stable, meaningful milestones, for example:

- `v0.1.0` - Stage 1 full-stack pack opening works.
- `v0.2.0` - Pack definitions, set selection, and session stats.
- `v0.3.0` - Cinematic reveal flow, card preview, binder, animated values.
- `v1.0.0` - Deployed, polished, stable, and closer to real pack modeling.

## Suggested Prompt For A New Codex Chat

If starting a new chat, use something like:

```text
This is my MTG Pack Simulator project. Please read README.md and PROJECT_NOTES.md first, inspect the repo, and continue from the current codebase. The project is a Java 21 Spring Boot backend plus React/TypeScript/Vite frontend. We have completed Stage 1 full-stack pack opening, added pack definitions, set selection, session stats, cinematic one-by-one reveal, card preview modal, binder page, animated currency values, and more supported sets. Keep backend changes small and do not add PostgreSQL, user accounts, or deployment yet unless I ask.
```
