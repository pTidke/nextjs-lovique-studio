# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Gift buyers in India — mostly young adults buying for a partner, best friend, sibling or parent — who discover Lovique Studio on Instagram and tap through on their phones. Their job: find (or dream up) a handmade gift that feels personal to *their* person, understand roughly what it costs and how ordering works, then message the studio to order.

## Product Purpose

Lovique Studio is a small, founder-led studio that hand-makes "forever flowers" — bouquets and floral gifts that never wilt — and personalises them for the recipient. The website is the studio's shop window: it shows the work, makes custom gifting feel possible, and turns a browser into an Instagram DM enquiry. Success = more confident, well-informed enquiries (product, budget, occasion already clear).

## Positioning

Handmade, made-for-your-person gifts. Every piece is crafted by hand from satin ribbon, crochet/yarn and paper (and other craft materials), and can be themed around the recipient — characters, fandoms, favourite drinks, photos, names. Not a fresh-flower florist and not mass-produced: personal, playful, lasting.

## Operating Context

- Discovery and ordering happen on Instagram (@lovique._studio). There is no cart or checkout; the site's primary action is "Enquire to Order", which opens an Instagram DM and copies a ready-made message.
- Orders are made to order: customers should order 4–5 days in advance; rush orders (<1 day) may cost extra. An advance UPI payment confirms an order.
- Ships across India.
- Content (products, prices, images, testimonials) is managed in a separate Sanity Studio; categories are a fixed list mirrored in `src/lib/categories.ts`.

## Capabilities and Constraints

- Customisation offered: themed bouquets (characters, fandoms, favourite drinks/snacks), colours and flower choice/size, photos and names/notes, add-ons (teddies, chocolates, cards, lights, etc.).
- Categories: Singles, Flower Basket, Bouquets, Flower Pots, Magazine (personalised photo/memory magazine-style keepsakes — inferred from product names, owner to confirm), Wall Art.
- Prices: the owner is adding INR prices in Sanity; any product still without a price must show "Price on enquiry", never a blank.
- Materials: satin ribbon, crochet/yarn, paper and other craft materials. Never describe products as "preserved", "dried" or "fresh" flowers.
- Product photos are owner-shot phone photos (hand-held, varied backgrounds). No professional studio photography or founder/process photos exist yet.

## Brand Commitments

- Name: Lovique Studio. Tagline: "Wrapped in grace, sealed with love — where flowers meet forever."
- Voice: warm, personal and a little playful — the brand of a real maker who loves gifting, not a luxury house. (Confirmed direction, 2026-10-01: move away from "luxury minimalism" positioning toward warm, personal gifting.)
- Existing identity to keep: logo (`public/logo.png`), Playfair Display + Poppins, the pink brand colour.

## Evidence on Hand

- ~20 products with real photos in Sanity; 25 real customer testimonials in Sanity (casual voice: "my GF loved it", "bestie", themed requests like a Diet Coke bouquet).
- Instagram account @lovique._studio.
- Absent — must not be fabricated: order counts, delivery stats, reply-time promises, ratings, founder name/photo, press, process photos.

## Product Principles

1. Show the work first — real products and real customers beat ambience.
2. Make personal possible — always signal that a piece can be made for *your* person.
3. Answer before they ask — price state, materials, lead time, delivery and how ordering works sit next to the decision.
4. One clear next step — Enquire to Order; everything else is secondary.
5. Honest craft — describe materials and process truthfully; no borrowed luxury claims.

## Accessibility & Inclusion

WCAG 2.1 AA: text contrast ≥4.5:1 (including white text on brand pink), visible branded focus states, keyboard-operable overlays, respect `prefers-reduced-motion`. Most visitors are on phones — touch targets ≥44px, thumb-reachable primary action.
