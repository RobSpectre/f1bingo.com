# Product

<!-- impeccable:product-schema 1 -->

_Written from the repository and Rob's requests in Nov 2026. Facts marked (inferred) have not been confirmed by Rob yet._

## Platform

web

## Users

Formula 1 fans following a live race weekend, usually on a phone or laptop while the broadcast is on a TV (inferred). They glance down between incidents, tap a square when something happens on track, and share their card with friends.

## Product Purpose

f1bingo.com makes a free 5×5 bingo card for each Grand Prix. Squares are things that tend to happen in a race ("Ten second penalty", "Turn 1 incident"). The centre square is free ("Lights Out! (Free)"). A completed row, column or diagonal wins and plays a short victory tune. Success means a fan keeps the card open for the whole race and shares it.

## Positioning

A card written fresh for each race weekend, with in-jokes and race-specific squares, rather than a generic F1 bingo template.

## Operating Context

- Used during a live session, often in a second-screen glance pattern (inferred).
- The deck (`src/assets/data/deck.json`) is swapped for each event and carries the event's full title and a version number.
- Sharing copies a PNG of the card to the clipboard; the capture clone hides `.no-capture` elements.
- Deploys from the default branch to GitHub Pages.

## Capabilities and Constraints

- Vue 3 + Pinia (persisted to localStorage), Vite, Tailwind 4, Pug templates, Sass.
- Squares toggle, the free square stays selected, win detection over 12 lines, reset reshuffles.
- Playwright tests cover desktop and mobile and must keep passing.
- Browser support: Safari 16.4+, Chrome 111+, Firefox 128+.

## Brand Commitments

- Name: "Formula 1 Bingo" / f1bingo.com, credited to Rob Spectre.
- "Not affiliated with Formula One Management" must stay visible.
- No official F1 logos, team logos or copyrighted photography.

## Evidence on Hand

- Social and logo images in `public/`.
- No user counts, testimonials or press to quote; don't invent any.

## Product Principles

1. The board is the product: nothing gets in the way of tapping a square mid-race.
2. Each weekend can have its own personality, but it never changes how the game works.
3. Share-worthy: the card should look good as a screenshot.
4. Tributes and one-offs are scoped in time and easy to remove.

## Accessibility & Inclusion

Large touch targets on phones; respect reduced motion; keep text contrast readable on the dark ground (inferred, no formal standard set).
