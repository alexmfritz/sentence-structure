# Sentence Structure — Placeholder Content

## What this is

Placeholder editorial content for design testing. Sixteen pieces across the five columns, frontmatter-formatted to match an Astro content collection schema. Voice is deliberately divergent from Alex's actual voice — a quieter, more observational placeholder narrator with a slow positive arc — so this content can be safely thrown away and replaced when real writing begins, without anyone confusing it for the publication's authentic voice.

What this content is for: rendering the design against real-feeling prose, validating treatments (drop cap, pull quote, sidenote, inline mono stats), testing the spine at sparse density, populating recency surfaces, exercising the tag system across columns, and giving you something to critique that isn't lorem ipsum.

What this content is NOT for: publication. Every piece here is throwaway scaffolding. The narrator is fictional. Names of other inmates and staff are placeholders. Statistics in Concrete Truths pieces are illustrative; verify before using.

## How to read this file

Each piece has a YAML frontmatter block followed by body content. Body content includes inline treatment markers in brackets — `[PULL QUOTE: "..."]`, `[SIDENOTE: ...]`, `[H2: ...]`, `[INLINE STAT IN MONO]` — to show where the design treatments would render. When wiring up content collections, the markers come out and the treatments get applied via MDX components or rendered Markdown.

Memoir pieces include `phase` and `experienceDate` fields per the dual-date model. Other columns omit those fields per the schema design.

## Index

Sixteen pieces, by published date descending (recency-view order):

| Date | Column | Title |
|------|--------|-------|
| 2026-04-18 | Off the Record | Recipe |
| 2026-04-10 | Memoir | First Coffee |
| 2026-04-02 | Economics of | The Economics of Ramen |
| 2026-03-30 | Protective Factors | When the Thought Says Always |
| 2026-03-22 | Concrete Truths | What a Call Home Costs |
| 2026-03-15 | Memoir | The First Count *(full piece)* |
| 2026-03-05 | Off the Record | What I Brought Out With Me |
| 2026-02-25 | Protective Factors | Distress Tolerance When You Have Nowhere to Go |
| 2026-02-20 | Memoir | The Bus |
| 2026-02-14 | Off the Record | *(untitled — uses first line)* |
| 2026-02-08 | Concrete Truths | How Many of Us Have GEDs Now |
| 2026-01-29 | Economics of | The Economics of the Phone Call |
| 2026-01-18 | Off the Record | Programming for Beginners |
| 2026-01-12 | Memoir | Programming |
| 2025-12-08 | Memoir | Mail Call |
| 2025-11-15 | Memoir | The Library |

---

# Memoir

## The First Count *(full piece — Option 2)*


```yaml
---
column: memoir
title: "The First Count"
deck: "Standing in your slot. Counting heads. Trying not to count days."
phase: jail
experienceDate: 2018-04-12
publishedDate: 2026-03-15
tags: [intake, count, first-week, mail]
---
```



They told us what to do during count, but they didn't tell us what to feel during count. The instructions were procedural. Stand at the door of your cell. Face forward. Don't talk. Don't move. Wait until the deputy walks past, looks at you, looks at his clipboard, makes a mark, and moves on. The mark means you exist. The mark means you haven't escaped. Most of all, the mark means there will be another count in five hours.

[H2: The math of it]

I learned the rhythm before I learned the rules. Count happened five times a day in jail. Stand-up count, where you had to be on your feet. Bunk count, where you could be lying down but had to be visible. Emergency count, which was rare but loud. The deputies counted because someone, somewhere, was missing the second they stopped counting. The deputies counted because counting was the answer to the problem of bodies that might not stay where they were put.

[PULL QUOTE: "The mark means you exist. The mark means you haven't escaped. Most of all, the mark means there will be another count in five hours."]

For my first count I stood too straight. I stood like someone trying to look innocent, which is to say, guilty. The deputy walked past me, looked at his clipboard, made his mark, and said nothing. I exhaled when he was past. My cellie [SIDENOTE 1: Cellie — short for cellmate. The man you share an eight-by-ten cell with for an indefinite period. The vocabulary moves in fast. Within a week you stop noticing you've absorbed it.] had been in before. Let's call him Jay. He laughed at me afterward. "You stood like a statue, man. You're allowed to breathe."

I learned to stand at count the way you learn to stand at a bus stop. Loosely. With your weight on one foot. With the patience of someone who knows the bus is coming whether you stand right or not. By week two I could read during count. By week three I could carry on conversations through the bars during count, in the seconds between deputies passing each cell. By week four I had stopped noticing it.

[H2: Counting backwards]

What I noticed instead was time. The counts marked time. Five counts a day, seven days a week, thirty-five counts a week, one hundred forty counts a month. I started doing the math even though I shouldn't have. The math was bad for you. The men who had been in for years had stopped doing the math. The men who had been in for years could tell you what week of their sentence they were in, but not what month, and definitely not what year. The math was the wrong calculator. The right calculator was: today. The right calculator was: today's two phone calls. Today's mail. Today's count.

[INLINE IMAGE: PNW landscape stock or atmospheric AI. Caption: "The view from a window I never had."]

I got a letter in the second week. From my mother. The letter said the things mothers say. That she loved me. That she was praying. That she had put money on my books — my commissary account [SIDENOTE 2: "On my books" — money deposited in your inmate account, used for commissary purchases, phone time, and stamps. The account is bookkeeping, not a bank account; you cannot withdraw, only spend.] — so I could buy stamps and ramen. The letter ended with what she always wrote at the end of letters, even before any of this: "I am proud of you for who you are becoming." She had written it for years. I had read it for years. In jail, sitting on my bunk between bunk count and stand-up count, I read it for the first time.

The deputy came past for the next count. I stood at the door of my cell. I faced forward. I did not move. The mark on his clipboard meant I existed.

I let it.

---

## The Bus


```yaml
---
column: memoir
title: "The Bus"
phase: shelton
experienceDate: 2018-08-04
publishedDate: 2026-02-20
tags: [transitions, transport, observation]
---
```



The bus from county to Shelton intake didn't have windows. Or rather, it had windows that had been painted over from the inside, except for a strip about four inches wide at the top of each one. You could see sky through the strip. You could not see the road. You could not see where you were going. You could see, for hours, only sky.

I rode in shackles. Wrist to wrist, ankle to ankle, wrist to ankle by a chain that ran through a ring on the bench in front of me. The man next to me slept. He had been on this bus before, transferred between facilities, and he had learned the lesson that you should sleep whenever sleeping was permitted. I had not learned that yet. I watched the strip of sky.

Sky in western Washington in August is a color I had not made friends with yet. Pale, hot, washed out from the bottom edge. We must have been driving south, then west, by the way the sun moved across the strip. I kept track for the first hour. By the second hour I had lost track. By the third I had stopped trying.

When the bus stopped, the doors opened, and a corrections officer I had never seen looked into the van and said: "You're at Shelton."

The strip of sky was the same color it had been three hours ago. Everything else was different.

---

## Programming


```yaml
---
column: memoir
title: "Programming"
phase: coyote-ridge
experienceDate: 2020-09-15
publishedDate: 2026-01-12
tags: [programs, education, change]
---
```



I signed up for the Thinking for a Change class for the wrong reasons. The right reasons would have been: I wanted to change. The wrong reasons were: it counted toward Good Time, it got me out of my cell three afternoons a week, and the man at the desk who was running sign-ups had a face that did not invite hesitation.

There were eight of us in the class. The facilitator was a counselor I will call Mrs. Reyes. She had been doing this for twelve years, she said. She did not look like a person who had been doing anything for twelve years. She looked like a person who had decided that morning to start something new.

The first thing she taught us was how to recognize a thought.

I had not known thoughts were the kind of thing you recognized. I had assumed they were the kind of thing you had. But Mrs. Reyes drew a circle on the board and called it a thought, and a square and called it a feeling, and an arrow from the circle to the square, and an arrow from the square to a triangle, which she called a behavior. And then she asked us to identify the thought, the feeling, and the behavior in something that had happened to us in the last week.

I identified mine. I wrote it down. I did not show it to her. I sat with the piece of paper in my lap for the rest of the class. It was the most useful piece of paper I had been handed inside, up to that point.

---

## Mail Call


```yaml
---
column: memoir
title: "Mail Call"
phase: coyote-ridge
experienceDate: 2021-06-03
publishedDate: 2025-12-08
tags: [mail, family, waiting, routine]
---
```



Mail came at four in the afternoon, after yard, before count. The officer brought it in a plastic crate. He read names. You stepped forward when you heard yours. You took the envelope. You walked back. You did not open it in front of him.

Some men got mail every day. Some men got mail once a month. Some men got mail never. I learned, over time, which men were which, and I learned not to look at the men in the third group when their names were not called.

I was, for the first six months, in the second group. Then in the first. Then, after a while, I was the kind of man whose mother sent letters every week, whose sister sent cards on holidays, whose grandmother — who was not supposed to have figured out how to send mail to a state correctional facility — sent envelopes addressed in a careful old-person handwriting that I would, years later, be unable to look at without crying.

Inside, I did not cry over mail. Inside, you saved that for things that earned it.

I read the letters at night, after count, after lights had gone soft and the unit was as quiet as it ever got. I read them slowly. I read them more than once. I folded them and put them in a manila envelope under my mattress, and when the envelope was full I started another one, and another after that.

---

## The Library


```yaml
---
column: memoir
title: "The Library"
phase: monroe
experienceDate: 2022-11-20
publishedDate: 2025-11-15
tags: [library, reading, routine, change]
---
```



The library at Monroe was smaller than the library at the elementary school I had gone to, but it was open four hours a day, and it had three things I had not expected: a poetry section, a reference desk, and a librarian who recognized me by my second visit.

Her name was Karen. She had been the librarian at Monroe for nine years. She did not ask what I was in for. She asked what I had read recently. When I said I had not been reading, she nodded the way a doctor nods when a patient describes a familiar symptom, and she walked me to a shelf, and she pulled three books, and she said: "Start with the middle one."

The middle one was a collection of essays about birds. I had no interest in birds. I read it anyway. By the end of it I had a small interest in birds. By the time I returned it I had a slightly larger interest. By the time I had read the next book Karen recommended, I had reorganized something in myself I did not have a name for.

I am not going to say the library saved my life. The library did not save my life. The library was a small room with three hundred books and a woman who asked me what I had read recently. What I am going to say is: that was enough. Sometimes a small room with a few books is enough.

---

## First Coffee


```yaml
---
column: memoir
title: "First Coffee"
phase: community-custody
experienceDate: 2025-08-22
publishedDate: 2026-04-10
tags: [release, transition, small-things]
---
```



Coffee in prison is not coffee. Coffee in prison is brown water, microwaved, with creamer made from no animal that has ever lived. I had not thought about real coffee in years. I had stopped thinking about real coffee around the time I stopped thinking about the smell of cut grass and the feeling of sand. The list of things I stopped thinking about was long, and I had not made it on purpose. I had stopped because thinking about them did not change the situation, and not thinking about them sometimes made the day shorter.

The morning after release I walked to a coffee shop. I had been told about this coffee shop by my sister. It was four blocks from the apartment my parents had rented for me. The coffee shop existed. The four blocks existed. I walked them.

I ordered what my sister had told me to order, because I did not want to look at the menu and discover that I no longer knew how to order coffee. The woman behind the counter said "for here or to go" and I said "for here," because I wanted to sit at a table, and I wanted to drink the coffee out of a cup that was not made of plastic, and I wanted to be a man drinking coffee in a coffee shop on a Tuesday morning in the country I had been born in.

The coffee was good. The Tuesday was good.

I sat for a long time.

---

# Concrete Truths

## What a Call Home Costs


```yaml
---
column: concrete-truths
title: "What a Call Home Costs"
deck: "The bill for staying in touch, in numbers."
publishedDate: 2026-03-22
tags: [phone-calls, commissary, costs, family]
---
```



Phone calls from prison are billed by the minute. The rate varies by state, by facility, and by whether the call is local, in-state, or out-of-state. In Washington State, a fifteen-minute call from a state correctional facility to a number outside the prison system costs approximately [INLINE STAT IN MONO: `$1.40`] at current rates. That number is lower than it was five years ago. It is also lower than it was last year. And it is the result of policy work, advocacy work, and federal regulatory action that took, in total, roughly thirty years.

[H2: How we got here]

In 2024, the FCC capped interstate prison call rates at approximately [INLINE STAT IN MONO: `$0.06`] per minute for prepaid calls. Before that cap, the average rate hovered closer to [INLINE STAT IN MONO: `$0.21`] per minute, and in some facilities it had been as high as [INLINE STAT IN MONO: `$1.13`]. The FCC's authority to regulate these rates had been contested for decades. The cap, when it finally arrived, was the result of a coalition that included formerly incarcerated people, family members, civil rights organizations, and a handful of legislators who had decided that a phone call to your child should not be a luxury good.

[PULL QUOTE: "The cap, when it finally arrived, was the result of a coalition that had decided a phone call to your child should not be a luxury good."]

[H2: What it still costs]

The cap is real. The cap is a victory. The cap is also not the whole story.

Most facilities still levy connection fees, deposit fees, and account maintenance fees on top of the per-minute rate. A family putting [INLINE STAT IN MONO: `$50`] on their incarcerated person's calling account often sees [INLINE STAT IN MONO: `$5–$8`] of that absorbed by service fees before any minute of conversation has happened. Over the course of a year, for a family taking three fifteen-minute calls per week, the math runs to approximately [INLINE STAT IN MONO: `$340`] in direct call charges plus an additional [INLINE STAT IN MONO: `$70–$120`] in fees.

That is the cost of saying I love you, in installments, for a year.

---

## How Many of Us Have GEDs Now


```yaml
---
column: concrete-truths
title: "How Many of Us Have GEDs Now"
deck: "The scale of educational programming inside, by the numbers."
publishedDate: 2026-02-08
tags: [education, programs, ged, statistics]
---
```



The Washington State Department of Corrections reported that in fiscal year 2024, approximately [INLINE STAT IN MONO: `1,847`] incarcerated individuals earned a GED while in custody. The number does not include those who completed coursework but did not test, those who completed individual subject exams without finishing the full credential, or those who continued into post-secondary programs.

I was one of the [INLINE STAT IN MONO: `1,847`] for one of those years, though not 2024. The number is bigger than I expected when I first heard it. The number is smaller than the population it serves.

The Bureau of Justice Statistics estimates that roughly [INLINE STAT IN MONO: `30%`] of state prison population enters custody without a high school credential. In Washington, with a state correctional population of approximately [INLINE STAT IN MONO: `13,500`], that translates to around [INLINE STAT IN MONO: `4,000`] incarcerated individuals who, on intake, do not have the credential that almost any job application requires.

Educational programming meets some, but not all, of that need. Class capacity is finite. Wait lists are real. Some facilities have stronger programs than others. Some men test out quickly; some men spend years working through the same arithmetic that a tenth grader would have learned in a month.

[PULL QUOTE: "Some men test out quickly; some men spend years working through the same arithmetic that a tenth grader would have learned in a month."]

What changes when you earn it: parole eligibility math, in some cases. Job placement, in many. Wages on the inside, occasionally. Self-image, almost always. The credential is small. The credential is also, for many of us, the first piece of paper we have ever held that said something good about us.

---

# Economics of

## The Economics of Ramen


```yaml
---
column: economics-of
title: "The Economics of Ramen"
deck: "Why a 25-cent soup is the universal solvent of carceral commerce."
publishedDate: 2026-04-02
tags: [ramen, commissary, economy, currency]
---
```



Ramen costs [INLINE STAT IN MONO: `$0.25`] at most prison commissaries. It is, by weight, the cheapest available source of calories in the carceral economy. It is also, by transaction frequency, the most exchanged unit of currency.

The dollar exists inside, theoretically. So does the cent. So does the commissary debit card. None of these are widely used between inmates. Inmates use ramen.

[H2: What ramen does]

A ramen pays for haircuts. A ramen pays for laundry done. A ramen pays for a TV channel selection. A ramen pays for a magazine read but not kept. Two ramens pay for a magazine kept. Five ramens pay for a tattoo of approximately one square inch, depending on the tattoo artist's reputation and the buyer's threshold for sterility concerns.

The conversion rates float. Coffee is worth more than ramen but less than tobacco (where tobacco is permitted; in most facilities, it is not). Stamps were worth more than ramen until the price of stamps went up, at which point ramen and stamps reached parity. Soup costs vary slightly by flavor — chicken is the standard, beef is at parity, shrimp commands a small premium — but the ramen as economic unit is flavor-blind.

[PULL QUOTE: "Two ramens pay for a magazine kept. Five ramens pay for a tattoo of approximately one square inch."]

[H2: Why it works]

Three properties make ramen the dominant unit of carceral exchange.

First: it is shelf-stable. A ramen on your shelf today is a ramen on your shelf in eight months.

Second: it is divisible without loss. A ramen can be broken in half. The half-ramen retains caloric value and can be exchanged for half the goods or services of a full ramen.

Third: it is universally desired. Every inmate eats. Most inmates are hungry most of the time. The thing every inmate wants to do, in their cell, alone, in the half-hour between count and lights-out, is eat something hot.

The economist's name for this is "money." We just call it soup.

---

## The Economics of the Phone Call


```yaml
---
column: economics-of
title: "The Economics of the Phone Call"
deck: "What it costs to say I love you for fifteen minutes."
publishedDate: 2026-01-29
tags: [phone-calls, family, economics, commissary]
---
```



A fifteen-minute phone call from a Washington State Department of Corrections facility to an out-of-state landline costs the inmate's family approximately [INLINE STAT IN MONO: `$1.40`] at 2026 rates.

[INLINE STAT IN MONO: `$1.40`] is what fifteen minutes of saying "I love you" costs.

This is, in the aggregate, what makes phone-call economics interesting: there is a market. There has always been a market. The market has prices, and the prices have, until very recently, been set by a small number of telecommunications vendors who held monopolistic contracts with state correctional systems.

[H2: The deal]

The deal works like this. The state contracts with a vendor — there are three or four major ones nationally — to provide phone services to incarcerated populations. The vendor wins the contract by offering the state a "commission" — a per-minute kickback paid to the state for the privilege of charging incarcerated people's families to make phone calls. The vendor sets the rate. The vendor pays the state. The state pays the vendor's invoice from the calling fund.

The math is the math.

[PULL QUOTE: "The vendor wins the contract by offering the state a 'commission' — a kickback paid for the privilege of charging incarcerated people's families to make phone calls."]

In 2018, Washington State eliminated commissions on prison phone calls. The rate immediately dropped from approximately [INLINE STAT IN MONO: `$0.16`] per minute to approximately [INLINE STAT IN MONO: `$0.11`] per minute. In 2024, the FCC's interstate cap further reduced the rate to approximately [INLINE STAT IN MONO: `$0.06`] per minute for prepaid calls.

[H2: What the family pays now]

A family taking three fifteen-minute calls per week now pays approximately [INLINE STAT IN MONO: `$0.27`] per week, or approximately [INLINE STAT IN MONO: `$14`] per year — plus account maintenance fees, deposit fees, and minimum-balance requirements that can quietly push the real annual cost closer to [INLINE STAT IN MONO: `$80–$120`].

[INLINE STAT IN MONO: `$14`] is the price of a paperback book. [INLINE STAT IN MONO: `$120`] is the price of a flight from Seattle to LA. The family pays whichever they pay. The phone call rings.

---

# Off the Record

## Recipe


```yaml
---
column: off-the-record
title: "Recipe"
publishedDate: 2026-04-18
tags: [ramen, small-things]
---
```



Boiling water from the in-cell tap.
Tear the seasoning packet halfway open.
Crumble the noodles by hand.
Wait three minutes.
Eat directly from the bag.
This is dinner. This was always dinner.

---

## What I Brought Out With Me


```yaml
---
column: off-the-record
title: "What I Brought Out With Me"
publishedDate: 2026-03-05
tags: [release, change, small-things]
---
```



A small manila envelope of letters.
The one mug they let me keep — chipped on the rim.
A list of names, in pencil,
of men I told myself I would write to.
The names are still there.
I have written to four.

A way of standing at a doorway —
left foot back, weight slightly forward,
ready to be counted.
I do this in coffee shops now.

A book I started in Monroe and finished
in the apartment my parents rented.
My handwriting in the margins
of the first half. My handwriting,
slightly different, in the second.

Both are mine.

---

## *(untitled — uses first line as title)*


```yaml
---
column: off-the-record
title: ""
publishedDate: 2026-02-14
tags: [family, mail]
---
```



When my mother wrote that she was proud
she wrote it in the same hand
she had used to write my school excuse notes
when I was nine.

I had not noticed, before,
that the handwriting was the same.

I notice now.

I notice the things that were always there
and that I was not, for a long time,
in any kind of shape
to see.

---

## Programming for Beginners


```yaml
---
column: off-the-record
title: "Programming for Beginners"
publishedDate: 2026-01-18
tags: [programs, change, observation]
---
```



The first thing she taught us
was how to recognize a thought.

Until then I had assumed
thoughts were a kind of weather —
something you stood in
and tried to wait out.

She drew a circle on the board.
She said: this is a thought.
She drew a square. She said: this is a feeling.
She drew an arrow. She said: thoughts cause feelings.
She drew another arrow. She said: feelings cause behaviors.

I had spent thirty-one years
in a country
whose grammar I did not speak.

She handed each of us a piece of paper.
She said: write down a thought.
She said: write down what it caused.
She said: notice that you wrote it down.

I noticed.

I had been writing things down
my whole life,
and not noticing.

---

# Protective Factors

## When the Thought Says Always


```yaml
---
column: protective-factors
title: "When the Thought Says Always"
deck: "On catching the word 'always' before it catches you."
publishedDate: 2026-03-30
tags: [cognitive-distortions, cbt, thought-patterns]
---
```



The word "always" is a flag. So is the word "never." So is the word "everyone," and the word "nothing," and the phrase "I should have known."

In CBT, these are called absolutist words. They are the linguistic surface of a deeper pattern called all-or-nothing thinking, also called black-and-white thinking, also called dichotomous thinking. The pattern works like this: a thought arrives in the form of a totalizing claim. The claim feels true. The claim is, almost always, false.

[PULL QUOTE: "A thought arrives in the form of a totalizing claim. The claim feels true. The claim is, almost always, false."]

[H2: What it sounds like]

I always mess this up.
I never get it right.
Everyone hates me.
Nothing I do matters.

The trick is not to argue with the thought. The trick is to notice the word.

[H2: What you do with it]

When you catch the word — "always," "never," "everyone," "nothing" — you do not have to dismiss the thought. You do not have to fight the thought. You only have to write the thought down with one substitution.

*I always mess this up* — becomes — *I sometimes mess this up.*
*I never get it right* — becomes — *I do not always get it right.*
*Everyone hates me* — becomes — *Some people, in some moments, do not like what I am doing.*

The substitutions are small. The substitutions are also, in my experience, the only thing that has ever worked.

The thought does not lose its grip because you argued with it. The thought loses its grip because you wrote down a more accurate version of it, and the more accurate version is — almost imperceptibly — less terrible. The thought wants to be terrible. The thought is not in the business of being accurate. Your job is to be in the business of accuracy on the thought's behalf.

This is one of the cheapest cognitive tools I have learned, and one of the most useful. It costs nothing, takes ten seconds, and can be done in any context, including in a cell, including before a count, including on a Tuesday morning in a coffee shop when a familiar thought arrives unbidden and offers you the word "always."

---

## Distress Tolerance When You Have Nowhere to Go


```yaml
---
column: protective-factors
title: "Distress Tolerance When You Have Nowhere to Go"
deck: "DBT skills, learned in a place with no exits."
publishedDate: 2026-02-25
tags: [distress-tolerance, dbt, coping]
---
```



In Dialectical Behavior Therapy, distress tolerance is the skill set you use when you cannot solve the problem and cannot leave the situation. It is, in other words, the skill set most directly applicable to incarceration.

The skills have acronyms. The acronyms are silly. The acronyms also work.

[H2: TIPP]

**T** — Temperature. Cold water on your face, or holding ice, or breathing cool air. Drops your physiological arousal in seconds. Available in any cell with a sink.

**I** — Intense exercise. Push-ups, jumping jacks, anything that makes your heart move. Ten minutes is enough. Available in any cell with a floor.

**P** — Paced breathing. Exhale longer than you inhale. Four-second inhale, six-second exhale, repeat for two minutes.

**P** — Progressive muscle relaxation. Tense and release each muscle group, head to toe.

[PULL QUOTE: "Distress tolerance is the skill set you use when you cannot solve the problem and cannot leave the situation. It is, in other words, the skill set most directly applicable to incarceration."]

[H2: ACCEPTS]

**A** — Activities. Read, draw, write, play cards.
**C** — Contributing. Help someone with a letter, with a chore, with a problem.
**C** — Comparison. Not "people have it worse," but "I have had it worse and survived."
**E** — Emotions. Generate the opposite emotion deliberately. Watch a comedy. Listen to a song you love.
**P** — Pushing away. Visualize putting the problem in a box on a shelf. Come back to it later.
**T** — Thoughts. Count. Recite something. Do mental math.
**S** — Sensations. Cold water again. Strong taste. Loud music if you have headphones.

The skills do not solve the problem. The skills are not designed to solve the problem. The skills get you through the next ten minutes without doing something that will make the problem worse.

I learned these skills in a class taught by a counselor who had, herself, spent a decade as a clinician on a locked psychiatric unit. She knew the population. She knew the room. She did not pretend the skills were a cure. She presented them as what they are: tools that work, on the average, in the moments where the only options are to sit through the wave or to break something.

I have, in the years since, sat through more waves than I have broken things. The math is in the skills' favor.

---

# Filling out density: lorem ipsum convention

For surfaces that need higher post counts than the sixteen pieces above can provide — Memoir spine dense mode (16+ posts in a single phase), archive pagination, recency tile rotation — fill with bracket-convention placeholders matching the foundational doc.

## Memoir lorem entry


```yaml
---
column: memoir
title: "[ Memoir post — first week of intake ]"
deck: "[ Optional one-sentence deck ]"
phase: jail
experienceDate: 2018-04-18
publishedDate: 2026-02-01
tags: [intake, count]
---
```



[ Body text. ~600-900 words. Memoir piece in the jail phase, first-person, observational voice. ]

## Concrete Truths lorem entry


```yaml
---
column: concrete-truths
title: "[ Concrete Truths data piece — visitation rates ]"
deck: "[ One-sentence deck framing the statistical claim ]"
publishedDate: 2026-01-22
tags: [visitation, family, statistics]
---
```



[ Body text. ~800-1200 words. Includes inline mono statistics, citations, and pull quote. ]

## Economics of lorem entry


```yaml
---
column: economics-of
title: "[ The Economics of the Visit ]"
deck: "[ Satirical-deck-one-liner ]"
publishedDate: 2025-12-22
tags: [visitation, economics, family]
---
```



[ Body text. ~400-700 words. Satirical economic analysis of a routine prison phenomenon. ]

## Off the Record lorem entry


```yaml
---
column: off-the-record
title: "[ ~12 lines / free verse / on the silence after intake ]"
publishedDate: 2025-11-30
tags: [intake, silence]
---
```



[ ~12 lines of verse. Subject as indicated in title. ]

## Protective Factors lorem entry


```yaml
---
column: protective-factors
title: "[ DBT/CBT skill — radical acceptance ]"
deck: "[ One-sentence deck ]"
publishedDate: 2025-11-12
tags: [radical-acceptance, dbt, coping]
---
```


[ Body text. ~500-800 words. CBT or DBT skill explained with personal application. ]

---

## Notes for the build

Three things to know when wiring this content into the Astro content collections:

1. **Sidenote markers in The First Count.** I numbered them inline (`[SIDENOTE 1: ...]`, `[SIDENOTE 2: ...]`) so you can see the desktop margin column populated in two places. The actual implementation will use MDX components or footnote-style references; the bracket markers come out at that point.

2. **Inline mono stats in Concrete Truths and Economics of pieces.** Marked with `[INLINE STAT IN MONO: \`$0.06\`]` to show where Plex Mono treatment would render against body serif. The actual implementation will likely use a `<Stat>` MDX component or a markdown convention like backtick-wrapped numbers with custom CSS.

3. **The untitled Off the Record poem** uses an empty `title` field in frontmatter. The column landing template should detect empty titles and render the first line of the body in italic at `text-pull` size, per the editorial-list spec in the foundational doc.
