import projectBookingFlow from '../assets/studio-booking-flow.webp';
import brandTrustSignals from '../assets/brand-trust-signals.webp';
import heroZhmodikov1 from '../assets/Hero Zhmodikov 1.webp';
import heroZhmodikov2 from '../assets/Hero Zhmodikov 2.webp';
import brandCms from '../assets/brand-cms.webp';
import brandFlowChartBeforeInDepth from '../assets/process-brand-flow-chart-before-in-depth.webp';
import brandFlowChartAfterInDepth from '../assets/process-brand-flow-chart-after-in-depth.webp';
import processBrandBeforeLayout from '../assets/process-brand-before-layout.png';
import processBrandAfterLayout from '../assets/process-brand-after-layout.png';
import processBrandKeyTakeaway1 from '../assets/process-brand-keytakeaway-1.webp';
import processBrandKeyTakeaway2 from '../assets/process-brand-keytakeaway-2.webp';
import processBrandKeyTakeaway3 from '../assets/process-brand-keytakeaway-3.webp';
import projectB2BNew from '../assets/b2b-hero-v2.webp';
import b2bShopScreen from '../assets/b2b-mobile-shop.webp';
import b2bAccountScreen from '../assets/b2b-mobile-account.webp';
import brandChallengeAniFirstFrame from '../assets/brand-challenge-ani-firstframe.webp';
import OWChallengeHeatmap from '../assets/OW-challenge-heatmap.webp';
import projectBrandScalingHero from '../assets/brand-scaling-hero.webp';
import automationHero from '../assets/automation-hero.webp';
import decisionNode from '../assets/decision-node.png';
import reviewAndSign from '../assets/review-and-sign.webp';
import serviceBlueprint from '../assets/service-blue-print.webp';
import serviceIaBlogCropped from '../assets/service-ia-blog-cropped.png';
import serviceIaBlogSite from '../assets/service-ia-blog-site.webp';
import serviceIaSimplified from '../assets/service-ia-simplified.webp';
import spreadsheetProcess1 from '../assets/Spread_sheet_doom_process_1.webp';
import spreadsheetProcess2 from '../assets/Spread_sheet_doom_process_2.webp';
import spreadsheetProcess3 from '../assets/Spread_sheet_doom_process_3.webp';
import spreadsheetProcess4 from '../assets/Spread_sheet_doom_process_4.webp';
import spreadsheetProcess5 from '../assets/Spread_sheet_doom_process_5.webp';
import behaviouralStrategy1 from '../assets/Behavioural strategy1.webp';
import behaviouralStrategy2 from '../assets/Behavioural startegy2.webp';

import projectB2BVideo from '../assets/HeroB2BOW.mp4';
import projectCandidateVideo from '../assets/hero-candidate-pipeline.mp4';
import springboardPlaceholder from '../assets/springboard-placeholder.svg';
import bookingAutomation from '../assets/booking-automation.webp';
import shedQuoteSketches from '../assets/shed/quote-sketches.jpg';
import shedQuoteWelcome from '../assets/shed/quote-welcome.jpg';
import shedQuoteSpecs from '../assets/shed/quote-specs.jpg';
import shedPayment from '../assets/shed/payment.jpg';
import shedCosts from '../assets/shed/costs.jpg';
import shedVscode from '../assets/shed/vscode.jpg';
import shedGenerator from '../assets/shed/generator.jpg';
import shedSalesforceSync from '../assets/shed/salesforce-sync.mp4';
import candidateChallenge from '../assets/candidate-challenge.webp';
import candidateOnTheGo from '../assets/candidate-on-the-go.webp';
import b2bAnimationProcessNoBg from '../assets/B2B_animation_process_nobg.webm';

export const PROJECTS = [
  {
    id: 3,
    title: 'Brand Scaling & Client Acquisition Platform',
    desc: 'End-to-end design and build of a content platform for a specialist photography brand - separating audience streams, introducing B2B trust signals, and deploying a headless CMS to convert specialist traffic into bookings.',
    tags: ['UX/UI Design', 'Mobile First', 'Headless CMS'],
    challenge:
      'Strategic Audience Mismatch. By presenting high-energy music photography alongside luxury fashion editorials in a single, unsorted stream, the brand signal was diluted. Specialist B2B clients perceived it as unfocused, leading to drop-off before they made contact. A secondary challenge was ensuring the platform could handle large, high-resolution images without sacrificing load speed or mobile performance.',
    challengeImage: brandChallengeAniFirstFrame,
    role: 'End-to-End Product Design. Responsible for the content strategy audit, design system, and headless CMS integration via Contentful.',
    process:
      'Content-First Design & Structured Navigation.\n\nIA Strategy: Simplified the structure so users land directly on the category selector - removing the ambiguous navigation of the previous site.\n\nVisuals: Adopted a clean, minimal aesthetic. White space is used deliberately to let the photography speak for itself.\n\nTech: Implemented lazy loading via a headless Contentful CMS with structured Content Models, so the client can update the site independently without breaking the design.',
    impact: {
      description:
        "Turned a generalist photography site into a focused B2B sales tool - separating 'Commercial' and 'Personal' streams so the platform reflects how the client actually earns.",
      outcomes: [
        {
          title: 'Zero-Friction Inquiry',
          desc: 'Users are never more than 2 clicks from booking.',
        },
        {
          title: 'Operational Autonomy',
          desc: 'Client updates the site independently via Contentful CMS.',
        },
        {
          title: 'Funnel Optimisation',
          desc: '60% shorter path to contact after restructuring the navigation.',
        },
      ],
    },
    keyTakeaway: {
      title: 'Trust & Compliance',
      description:
        'A key discovery was how much regulatory detail matters in a B2B context. Displaying an ABN number - a small, easily overlooked detail - meaningfully reduced friction for commercial clients who need to verify a business before engaging.\n\nThe broader lesson: in B2B, trust has to be built deliberately. Every label, every piece of copy, every ambiguous moment is a potential reason to leave. Clear, direct language at each step shortens the distance between first impression and a booking.',
      outcomes: [
        {
          title: 'Regulatory Confidence',
          desc: 'ABN display meets B2B verification expectations.',
        },
        { title: 'Clarity', desc: 'Direct language removes hesitation at every step.' },
        { title: 'Built-In Trust', desc: 'Essential for high-value commercial relationships.' },
      ],
      image: processBrandKeyTakeaway1,
      stackedImages: [
        { src: processBrandKeyTakeaway1, alt: 'Primary View', rotate: 0 },
        { src: processBrandAfterLayout, alt: 'Layer 1', rotate: 20 },
        { src: processBrandKeyTakeaway2, alt: 'Layer 2', rotate: 40 },
        { src: processBrandKeyTakeaway3, alt: 'Layer 3', rotate: 60 },
      ],
      imageCaption:
        "By separating the platform into 'Commercial' and 'Personal' streams, we didn't just organise the images - we aligned the site's structure with how the business actually works.\n\nA note on the design approach: white space as a quality signal is context-dependent. For high-value commercial work, it elevates the photography. In volume-based retail, density is often the right call.",
    },
    wanderingContent: {
      challengeImage: brandChallengeAniFirstFrame,
      impact: {
        description:
          "From Passive Archive to a Commercial Platform. The primary objective was to turn the client's digital presence into something that actively works for the business - a clearly structured, content-governed site built on a headless CMS.",
        outcomes: [
          {
            title: 'Content Discoverability',
            desc: 'Structured taxonomy surfaces the right work to the right audience.',
          },
          {
            title: 'Governed CMS',
            desc: 'Contentful Content Models keep the brand consistent as the site grows.',
          },
          {
            title: 'Commercial Focus',
            desc: 'Separate user journeys convert specialist visitors into enquiries.',
          },
        ],
      },
      challenge:
        "Strategic Audience Mismatch.\n\nThe core issue was a mismatch between the brand's audience and how the site was presenting the work. By showing high-energy music photography alongside luxury fashion editorials in a single, unsorted stream, the brand signal was diluted. Specialist B2B clients - the ones with the highest commercial value - saw a mixed portfolio and left.\n\nThe problem wasn't the quality of the work. It was that the site gave no signal of specialisation. A commercial fashion client encountering action photography switched off immediately. The structure was undermining the brand at its most critical touchpoint.\n\nThe technical challenge was ensuring the platform could support large, high-resolution images at speed - without sacrificing mobile performance or Core Web Vitals.",
      role: "Strategic Design Lead & CMS Architecture.\n\nTimeline: 4-Week Sprint (3 Weeks Discovery/Design + 1 Week Integration).\n\nThe Consultation: I pushed back on the client's initial request for high-density grids. Using competitor benchmarking, I made the case that for high-value commercial photography, white space is a quality signal - not wasted room. More images doesn't mean more impact.\n\nThe Build: I led the transition from a passive portfolio to a focused sales tool by separating the user journey into distinct 'Commercial' and 'Personal' streams. I also structured the Content Models directly in Contentful - defining clear rules for how content is entered - so the client can update and grow the site independently without breaking the design.",

      process: {
        type: 'rich',
        sections: [
          {
            type: 'text',
            content:
              "The Design Language: Strictly functional. All decorative elements were removed. Typography exists only to label and categorise the photography - so the viewer's attention goes entirely to the work, not the interface.\n\nThe CMS Architecture: The platform is built on Contentful's headless CMS. I structured the Content Models - the rules that govern how content is entered - so the client can update and expand the portfolio without accidental design breaks. The handover included full governance: a site that stays well-designed even when the designer isn't in the room.",
            image: brandCms,
          },
          {
            type: 'comparison',
            bg: 'var(--color-charcoal)',
            items: [
              {
                title: 'Before: Ambiguous Navigation',
                desc: 'The previous site mixed all disciplines into a single stream. Visitors had no clear signal of specialisation — a major obstacle for commercial clients evaluating the brand.',
                img: brandFlowChartBeforeInDepth,
              },
              {
                title: 'After: A Focused Sales Tool',
                desc: 'The cluttered structure was replaced with an immediate category selector - routing commercial and personal audiences into separate, clearly defined journeys from the very first interaction.',

                img: brandFlowChartAfterInDepth,
              },
            ],
          },
          {
            type: 'comparison',
            bg: 'var(--color-charcoal)',
            items: [
              {
                title: 'Before: High-Density Grid Request',
                desc: 'The client wanted high-density grids, assuming that showing more work would lead to more bookings. Competitor benchmarking was used to challenge that assumption with evidence.',
                img: processBrandBeforeLayout,
              },
              {
                title: 'After: White Space as a Quality Signal',
                desc: 'Benchmarking showed that for high-value commercial photography, white space signals quality - it gives each image room to be considered, rather than competing for attention.',
                img: processBrandAfterLayout,
              },
            ],
          },
        ],
      },
      refinement: {
        outcomesTitle: 'Trust & Compliance',
        outcomes: [
          {
            title: 'Regulatory Confidence',
            desc: 'ABN display meets standard B2B verification expectations.',
          },
          { title: 'Clarity', desc: 'Direct language removes hesitation at every step.' },
          { title: 'Built-In Trust', desc: 'Essential for high-value commercial relationships.' },
        ],
        description:
          "Trust & Compliance: B2B Trust Signals & Regulatory Identifiers.\n\nOne of the more unexpected discoveries was how much a small regulatory detail - the ABN number - mattered to commercial clients. For B2B buyers, it's a standard due-diligence check: is this a real, registered business? Displaying it prominently removed a subtle but real barrier to engagement.\n\nThe broader lesson: in a B2B context, trust isn't assumed - it needs to be demonstrated. Every ambiguous label, every missing detail, every moment of uncertainty is a reason to leave. The design discipline here was ensuring that clarity was built into every touchpoint, so the client's credibility was never in question.",
      },
    },
    heroScreen: brandTrustSignals,
    heroPhones: [
      {
        src: heroZhmodikov1,
        alt: 'Valentin Zhmodikov mobile site, with Portraits and Action as the two categories.',
        width: 245,
        height: 492,
      },
      {
        src: heroZhmodikov2,
        alt: 'Valentin Zhmodikov mobile site, showing a fashion portrait.',
        width: 245,
        height: 492,
      },
    ],
    images: [projectBrandScalingHero, undefined, brandCms, brandTrustSignals],
  },
  {
    id: 4,
    title: 'Behavioural Product Strategy in Job Search',
    subtitle: "The 'Spreadsheet of Doom' & Personal CRM",
    desc: "Validated the need for a Personal CRM built for candidates. When you're applying to multiple roles at once, managing the information becomes a job in itself. Research confirmed that losing track mid-process was the real barrier to a successful job search.",
    tags: ['Product Discovery', 'UX Research', 'Product Strategy'],
    challenge:
      "When you're actively applying for jobs, you're managing a lot of information across multiple platforms and conversations. Job descriptions, salary details, recruiter names, what was discussed in the first call — it all blurs together when volume is high. The same recruiter might contact you about a different role and you have no record of the previous conversation. Without a system, crucial context disappears at the worst possible moment.",
    role: 'Product Strategist & Lead Researcher. Responsible for the full Discovery phase: screener design, 1:1 qualitative interviews, affinity mapping, and defining the MVP feature set.',
    process:
      "Research-Led Definition.\n\nI ran 6 face-to-face interviews and a broader questionnaire across industries and countries to understand how people actually manage a job search.\n\nThe same problem kept surfacing: when applying to multiple roles at once, candidates lost critical context. They couldn't remember the salary they'd been quoted, what the role actually involved, or whether they'd already spoken to that recruiter before.\n\nThe research changed the original brief. Candidates didn't need more job listings. They needed one place to capture everything that mattered about each application.",
    impact: {
      outcomesTitle: 'Key Discoveries',
      description:
        "De-risking the Job Hunt. Research validated the need for a candidate-centric Personal CRM. The real problem wasn't finding jobs — it was 'Application Amnesia': applying across multiple platforms and losing track of the details that matter in every conversation.",
      outcomes: [
        {
          title: 'The Pivot',
          desc: 'From job board to Personal CRM. One place for every application.',
        },
        { title: 'The Insight', desc: 'Context collapse, not job scarcity, was the real barrier.' },
        {
          title: 'The Fix',
          desc: 'Capture the role, the HR contact, the offer details — all in one place.',
        },
      ],
    },
    keyTakeaway: {
      title: 'Key Takeaway',
      description:
        "The most useful tools solve concrete problems people are already trying to fix themselves. Candidates were building 'Spreadsheets of Doom' because nothing else captured the right information in one place. That's a market signal.\n\nThe research also uncovered a timing problem: around two weeks with no response, motivation drops and people quietly stop following up. The product needed to manage context and prompt action — not just log applications.",
      outcomes: [
        {
          title: 'Right Problem',
          desc: 'Built around managing information, not finding more listings.',
        },
        { title: 'One Source of Truth', desc: 'Role, contact, offer details — all in one place.' },
        {
          title: 'Keeps People Going',
          desc: 'A follow-up prompt at the right moment closes the loop.',
        },
      ],
      processImages: [
        spreadsheetProcess1,
        spreadsheetProcess2,
        spreadsheetProcess3,
        spreadsheetProcess4,
        spreadsheetProcess5,
      ],
    },
    wanderingContent: {
      challenge:
        "The 'Spreadsheet of Doom.'\n\nThat's what candidates called the document they used to track their applications. A sprawling spreadsheet that started as a practical solution and became a source of dread.\n\nThe underlying problem was concrete: when you're applying to multiple roles at the same time, information management becomes overwhelming. Each application has its own context — the job description, the salary range, the perks, the recruiter's name. If the same HR contact reaches out about a different role two weeks later, you have no record of what was discussed, what was offered, or which role they're calling about.\n\nWhen that context collapses, conversations break down. Candidates show up underprepared. Opportunities are lost not because of the candidate's ability, but because the information wasn't there when it was needed.\n\nThe task: design a system that captures this information automatically and surfaces it at the moment it matters.",
      role: 'Product Strategist & Lead Researcher. I led the discovery phase, turning a messy problem into a defined product brief.\n\nI brought my own experience as a job seeker into the research as a starting point, not as a conclusion. Having applied to multiple roles simultaneously, I knew firsthand how quickly context collapses — and how much rides on remembering the right detail at the right moment.\n\nOver three months, I ran diary studies and face-to-face interviews to map how candidates actually manage their applications. That research became the foundation for the product direction.',
      process: {
        type: 'rich',
        renderComponent: 'CandidateJourneyGraph',
        beforeGraph:
          "Early concepts assumed people wanted rich dashboards and analytics to manage their search. The diary study and interviews dismantled this. What candidates needed wasn't more data to review. It was a reliable place to store context — so they could walk into any conversation knowing exactly where they stood.",
        afterGraph: [
          "The Emotional Journey Map. Mapping mood against the timeline revealed a consistent pattern: motivation drops sharply around 14 to 21 days in, when nothing has come back from an employer. That is the moment most people quietly stop following up — not because they gave up on the role, but because they've lost track of where it stood.",
          'This finding added a second layer to the product. Beyond storing information, the tool needed to prompt action at exactly the right moment. A single follow-up prompt, sent when a response was overdue, dramatically reduced drop-off.',
          "The core design principle: the product holds the context so the candidate doesn't have to. Every role tracked. Every conversation logged. Every follow-up timed. The cognitive work shifts from the user to the tool.",
        ],
        sections: [],
      },
      impact: {
        outcomesTitle: 'Key Discoveries',
        description:
          "The original assumption was that candidates needed more job listings. Better search, broader reach. The research said otherwise.\n\nCandidates were applying to multiple roles at once — across different platforms, with different recruiters, at different stages. Each application had its own context: the role's requirements, the salary offered, what was discussed in the first conversation. When volume is high and tracking is manual, that context disappears. By the time a recruiter calls back, the candidate has no record of the role, the offer, or what was said.\n\nThat breakdown — losing critical information mid-process — was the core problem. The product needed to solve for that first.",
        outcomes: [
          {
            title: 'The Pivot',
            desc: 'From job board to Personal CRM. Managing information, not listings.',
          },
          {
            title: 'The Insight',
            desc: 'Context collapse, not job scarcity, was the real barrier.',
          },
          {
            title: 'The Supporting Find',
            desc: 'Motivation drops at 14 to 21 days in. The product addresses both.',
          },
        ],
      },
      refinement: {
        outcomesTitle: 'Key Takeaway',
        outcomes: [
          { title: 'Right Problem', desc: 'Built around the process, not the listings.' },
          { title: 'Less is More', desc: 'Fewer features, better timed.' },
          {
            title: 'Shows Up When It Counts',
            desc: 'A nudge at the right moment keeps people going.',
          },
        ],
        description:
          "The best products solve problems people are already trying to fix themselves. That's what this one did.\n\nCandidates weren't lacking motivation. They were lacking a system. When you're applying to ten or fifteen roles simultaneously, across multiple platforms, the information load is enormous. Job descriptions blur together. Recruiter names get confused. Salary conversations are forgotten. And when that same recruiter calls back three weeks later about a different role — you have nothing to reference.\n\nThe 'Spreadsheet of Doom' was candidates doing the job themselves, manually, under pressure. That's a market signal, not a failure of organisation.\n\nThe research added a timing insight on top: around two weeks in, when no response has arrived, people quietly stop following up. Not because they lost interest, but because the mental overhead of staying on top of it had become too high. The product needed to address both: store the context, and surface it at the right moment.\n\nThis project proved that a product's success isn't about how many features it has, but how well it fits into the user's reality. The lesson: in emotionally demanding products, retention is a byproduct of empathy and taking the mental weight off the user.",
      },
    },
    heroPhones: [
      {
        src: behaviouralStrategy1,
        alt: 'joboffer.fit opportunities, filtered by Applied, Interview, Follow up, and Offer, with cards for IBM, Officeworks, and Seed.',
        width: 393,
        height: 852,
      },
      {
        src: behaviouralStrategy2,
        alt: 'joboffer.fit follow-up screen, asking to send a follow-up for the Officeworks and Seed applications.',
        width: 393,
        height: 852,
      },
    ],
    images: [candidateOnTheGo, candidateChallenge, candidateOnTheGo],
    video: projectCandidateVideo,
  },
  {
    id: 1,
    title: 'Optimising B2B Workflow & Retention',
    desc: 'A self-initiated audit of the Officeworks mobile account architecture, conducted from the perspective of a business customer. Identified a revenue-critical friction point at the Point of Sale and built the business case that moved it from an unowned backlog item to the official Target State for the FY26 mobile roadmap.',
    tags: ['Mobile First', 'UX Research', 'Figma'],
    challenge:
      'Retention Risk at the Point of Sale. Payment utilities on the Officeworks mobile account were buried below the fold, inside a scroll-dependent list. At the checkout counter, operating one-handed with a queue behind you, reaching the Digital Card or Barcode required four deliberate steps. The interaction cost was too high for the environment the product was being used in.',
    role: 'Digital Engagement Designer, Proactive Strategic Lead. This was not an assigned task. I identified the friction firsthand as a regular Officeworks business customer and self-initiated the audit alongside my standard campaign responsibilities.',
    process: {
      type: 'rich',
      sections: [
        {
          type: 'text',
          content:
            'The fix was structural: an Information Architecture Inversion. The mobile IA was reorganised from a list-based content hierarchy to a Persistent Utility Header model, extracting payment assets from scrollable content and pinning them to a fixed position at the top of the viewport.\n\nThis shifted the interaction pattern from Hunt behaviour (Login, Navigate, Scroll, Locate, Tap) to Reflex behaviour (Login, Tap). That compression, from four steps to two, cut interaction cost by 50% at the exact moment the user is under the most pressure.\n\nThe result: the interface stopped fighting the environment it was being used in.',
          video: b2bAnimationProcessNoBg,
        },
      ],
    },
    impact: {
      description:
        'Influenced the official Target State for the FY26 Officeworks mobile roadmap. A self-initiated audit, socialised with CX leadership and validated as the benchmark architecture for mobile Point of Sale interactions.',
      outcomes: [
        {
          title: 'Strategic Influence',
          desc: 'Moved the architecture from backlog to FY26 roadmap priority.',
        },
        { title: 'Stakeholder Validation', desc: 'Adopted as Target State by CX leadership.' },
        {
          title: '50% Cost Reduction',
          desc: 'Interaction steps at Point of Sale cut from four to two.',
        },
      ],
    },
    keyTakeaway: {
      title: 'Key Takeaway',
      description:
        'The most commercially valuable work is not always what is assigned. Identifying a revenue risk at the Point of Sale required nothing more than using the product as its customers do. The discipline was in what came next: turning a personal observation into a structured audit, a structured audit into a business case, and a business case into a roadmap commitment.\n\nThat progression, from individual insight to corporate benchmark, is what defines seniority. Not the title.',
      outcomes: [
        {
          title: 'Bottom-Up Influence',
          desc: 'Self-initiated audit adopted as FY26 Target State.',
        },
        {
          title: 'Strategic Validation',
          desc: 'CX leadership adopted the architecture as the benchmark model.',
        },
        {
          title: 'Contextual Research',
          desc: 'Lived experience as a customer surfaced what internal data missed.',
        },
      ],
      image: OWChallengeHeatmap,
    },
    wanderingContent: {
      challenge:
        'Environmental Mismatch at the Point of Sale.\n\nThe problem was not visible in campaign data or standard reporting. It surfaced through Contextual Inquiry: using the Officeworks B2B account as a business customer in an actual checkout environment.\n\nCheckout is not a calm experience. You are separating business and personal purchases, holding items, operating one-handed, with a queue forming behind you. In that context, the Digital Card and Barcode needed to be immediately accessible. They were not.\n\nBoth utilities were located below the fold inside a scrollable account list. Reaching them required four sequential steps at the exact moment attention was already at its limit. For a B2B platform where checkout frequency is high, this was not a usability complaint. It was a retention risk.\n\nThe problem was not the features. It was where they were placed.',
      role: 'Digital Engagement Designer, operating beyond the standard campaign brief.\n\nI positioned this as a research finding, not a design request. Using the platform regularly as a business customer gave me access to context that internal data could not surface. The problem was not a statistic. It was a structural flaw that only becomes visible when you are actually at the counter.\n\nI audited the existing interaction flow, quantified the step cost, and prepared the case for CX leadership. The goal was to make the architectural problem legible in business terms.',
      process: {
        type: 'rich',
        sections: [
          {
            type: 'text',
            content:
              'The Flow Audit and IA Inversion.\n\nI mapped the full interaction sequence to establish the cost baseline. The Digital Card was nested four levels deep inside a scrollable account list. The pattern was: Login, Navigate, Scroll, Locate, Tap. Five steps where one should do.\n\nThe Target State replaced that pattern with a Persistent Utility Header: payment assets pinned to a fixed position at the top of the viewport, always visible, always one tap away. Secondary functions including order history and credit tracking remain accessible, but they no longer compete with the tools required at the counter.\n\nThe decision was about hierarchy, not aesthetics. At the checkout counter, attention is already at its limit. Every additional step compounds the pressure. Reducing to two steps was not an improvement on the old design. It was the baseline the experience should have started from.',
            video: b2bAnimationProcessNoBg,
          },
        ],
      },
      impact: {
        description:
          'The audit established a concrete business case for IA Inversion. Moving the Digital Card and Barcode to a Persistent Utility Header reduced the interaction from five steps to two: a 50% reduction in interaction cost at the point of revenue capture.\n\nIt was not presented as a UX improvement. It was presented as a structural fix with direct implications for checkout completion and B2B retention.',
        outcomesTitle: 'What Changed Architecturally',
        outcomes: [
          {
            title: 'IA Inversion',
            desc: 'Shifted from list-based hierarchy to a Persistent Utility Header model.',
          },
          {
            title: 'Fixed-Action Zone',
            desc: 'Removed scroll dependency for time-critical POS interactions.',
          },
          {
            title: 'Hunt to Reflex',
            desc: 'Four-step acquisition reduced to two at the point of revenue capture.',
          },
        ],
      },
      refinement: {
        description:
          "Moving the Needle from a Contract Role.\n\nI presented the audit to CX leadership not as a request for a redesign, but as evidence of a structural problem the organisation's data had not surfaced. The argument was straightforward: there are things a dashboard cannot tell you that a regular user already knows. This was one of them.\n\nCX leadership validated the proposed architecture as the Target State for mobile POS interactions. What had been sitting in the backlog without a defined champion was committed to the FY26 roadmap as a strategic priority. That shift did not come from a design review. It came from the audit making the problem legible in business terms.\n\nThe broader lesson: being a contract-based Digital Engagement Designer does not limit your strategic reach. It limits your title. Understanding when your work has implications beyond your scope, and acting on it with evidence and clarity, is what defines a senior contributor regardless of the role you are contracted into.",
        outcomesTitle: 'Key Takeaway',
        outcomes: [
          {
            title: 'Bottom-Up Strategy',
            desc: 'Self-initiated audit elevated to corporate benchmark without a formal brief.',
          },
          {
            title: 'Roadmap Reprioritisation',
            desc: 'POS utility moved from backlog to Strategic Priority for FY26.',
          },
          {
            title: '50% Interaction Cost Reduction',
            desc: 'Fixed-action zone cut target acquisition time at the point of sale.',
          },
        ],
      },
    },
    heroScreen: projectB2BNew,
    heroPoster: false,
    heroPhones: [
      {
        src: b2bShopScreen,
        alt: 'Officeworks mobile shop home, with shortcuts for laptops, phones, paper, and printing, plus a deals banner.',
        width: 532,
        height: 1076,
        frame: true,
      },
      {
        src: b2bAccountScreen,
        alt: 'Officeworks mobile account, with quick access to the in-store digital card, 30-day business credit, unpaid invoices, and order tracking.',
        width: 528,
        height: 1074,
        frame: true,
      },
    ],
    images: [projectB2BNew, OWChallengeHeatmap],
    video: projectB2BVideo,
  },
  {
    id: 0,
    title: 'Service Automation: Zero-Touch Model',
    desc: 'A streamlined SaaS solution reducing admin time by 40% for creative studios.',
    tags: ['Service Design', 'Product Strategy', 'UX/UI'],
    challenge:
      'The Problem: Operational Paralysis. The legacy site functioned as a static blog, burying critical class details and forcing 100% of bookings into manual phone calls. This bottleneck capped the business’s growth potential.',
    challengeImage: serviceBlueprint,
    role: 'Service Design & Product Strategy. Lead Product Designer responsible for the end-to-end transformation from a manual service to an automated product ecosystem.',
    process: {
      type: 'rich',
      sections: [
        {
          type: 'comparison',
          heading: 'The Process',
          items: [
            {
              title: 'Moving away from a blog',
              desc: 'The working model was still a blog. Home, news, gallery, policies, and pricing each had their own note, and nothing connected a visitor to a booking.',
              img: serviceIaBlogSite,
              alt: 'The Iris Art Studio site laid out as a blog, with a long news archive, tags, and contact details in the footer.',
              natural: true,
            },
            {
              title: 'A simpler information architecture',
              desc: 'The structure was reduced to the decisions that matter: what is offered, the program and price, about, gallery, the online or in-person schedule, and contact at the end.',
              img: serviceIaSimplified,
              alt: 'Sticky notes for a simpler site: home and what we offer, program description and price plans, about, gallery, online and offline schedule, and contact at the bottom.',
              natural: true,
            },
          ],
        },
        {
          type: 'text',
          content:
            'Logic Architecture & Flow Unification.\n\nDiscovery: Identified "Phone Tag" as the root cause of churn and disputes.\n\nArchitecture: Integrated "Class Trials" and "Full Terms" into a single decision tree, removing the disjointed experience of separate products.\n\nResult: A unified path to purchase that allows flexible commitment levels.',
          image: reviewAndSign,
        },
      ],
    },
    impact: {
      description:
        'Achieving the "Zero-Admin" State. Redesigned the service model to eliminate manual booking friction, resulting in a 40% reduction in administrative workload within month one.',
      outcomes: [
        { title: 'The Shift', desc: 'Digital booking replaces phone tag model.' },
        { title: 'Risk Reduction', desc: 'Digital agreements cut disputes by 90%.' },
        { title: 'Growth Signal', desc: '36% revenue up, 28% bounce rate down.' },
      ],
    },
    keyTakeaway: {
      title: 'Key Takeaway',
      description:
        "40% reduction in admin workload within month one. 36% revenue up. 28% bounce rate down. Not from adding features — from removing the barriers that were stopping people from saying yes.\n\nThe studio owner was spending teaching hours on phone calls and spreadsheets because the process required it. Automating the Trust Contract — the moment a customer decides to commit — didn't just save time. It decoupled revenue from manual effort and gave the business room to grow.",
      outcomes: [
        { title: 'Scalability', desc: "Revenue decoupled from owner's time." },
        { title: 'Efficiency', desc: 'Eliminated 90% of admin hours.' },
        { title: 'Clarity', desc: 'Digital terms eliminated payment disputes.' },
      ],
    },
    wanderingContent: {
      challenge:
        'Diagnosing the "Admin Loop." The issue wasn\'t just usability; it was an Operational Bottleneck.\n\nThe Friction Trap: Potential customers abandoned the site because the interaction cost (making a phone call) was too high compared to competitors.\n\nThe Dispute Cycle: The lack of a structured digital agreement meant terms were verbal and ambiguous, leading to hours spent resolving payment misunderstandings. The manual burden was consuming the client\'s actual teaching time.',
      challengeImage: serviceBlueprint,
      role: 'Mapping the "Zero-Touch" Blueprint. My strategy focused on Service Blueprinting - identifying every point where a human had to intervene (emailing, calling, confirming) and designing a digital proxy to handle it. I didn\'t just design the interface; I engineered the business logic to automate the "Trust and Transaction" simultaneously.',
      process: {
        type: 'rich',
        sections: [
          {
            type: 'comparison',
            heading: 'The Process',
            items: [
              {
                title: 'A second thought on the IA',
                desc: 'It was a second thought on the IA, to make sure everything the client wanted to keep was still covered. Then it moved further, cutting off the unnecessary noise, so only the most important information was left: what tired parents need to be able to grasp when they come to the website.',
                img: serviceIaBlogCropped,
                alt: 'Sticky notes gathering everything the client wanted to keep: Home, what we offer, News, Gallery and achievements, policies, free classes, offline and online, contact, and pricing.',
                natural: true,
              },
              {
                title: 'A simpler information architecture',
                desc: 'The structure was reduced to the decisions that matter: what is offered, the program and price, about, gallery, the online or in-person schedule, and contact at the end.',
                img: serviceIaSimplified,
                alt: 'Sticky notes for a simpler site: home and what we offer, program description and price plans, about, gallery, online and offline schedule, and contact at the bottom.',
                natural: true,
              },
            ],
          },
          {
            type: 'text',
            content:
              'Refining the Booking Logic (The Decision Node).\n\n1. The "Tentative" Protocol: I prototyped a flow where the contract\'s not just a checkbox, but a confirmation step. This required users to agree to terms digitally before a booking is confirmed, creating a psychological commitment that reduced no-shows.\n\n2. The Integration of "Trials": Early iterations treated "Class Trials" as a separate product, which fragmented the user journey. I corrected this by integrating the choice as a Decision Node within the main class flow. This allows users to verify that a specific class fits their schedule before deciding on their level of commitment (Trial vs. Term), resulting in a more intuitive, flexible funnel.\n\nThe breakthrough was recognising that the \'Trust Contract\' - the moment when a customer decides to commit - didn\'t need to be manual. By creating a \'Tentative Contract\' model, we automated the entire decision tree from interest to commitment without requiring human intervention.',
            image: decisionNode,
          },
        ],
      },
      impact: {
        description:
          'We digitized trust via a "Tentative Contract" Model. By moving the "Trial vs. Term" decision node inside the main flow, we respected the user\'s need to verify schedules before committing.',
        outcomes: [
          { title: 'Risk Reduction', desc: 'Digital agreements cut disputes by 90%.' },
          { title: 'Growth Signal', desc: '36% revenue up, 28% bounce rate down.' },
          { title: 'Unit Economics', desc: 'No admin tax, focus on teaching not invoices.' },
        ],
      },
      refinement: {
        outcomesTitle: 'The Result',
        outcomes: [
          { title: '40% Admin Reduction', desc: 'Achieved within month one of going live.' },
          { title: '36% Revenue Growth', desc: 'By removing barriers, not adding features.' },
          {
            title: '90% Fewer Disputes',
            desc: 'Digital terms replaced ambiguous verbal agreements.',
          },
        ],
        description:
          "The outcome validated the diagnosis. Within the first month, admin workload dropped 40%, revenue climbed 36%, and payment disputes — previously a recurring drain on the owner's time — fell by 90%.\n\nThe principle that held across every design decision: when you remove the cost of saying yes, people say yes. The booking didn't get easier because we made a better form. It got easier because we removed the phone call, automated the agreement, and let the product handle the trust layer.\n\nThe reusable lesson: operational pain that feels personal to a business owner is almost always a systemic friction point. The role of service design is to make those invisible costs visible — then design them out.",
      },
    },
    heroScreen: bookingAutomation,
    images: [automationHero, undefined, undefined, projectBookingFlow],
    refinement:
      "Refining the Booking Logic: Early iterations of this flow treated 'Class Trials' as a separate product, creating a disjointed experience. In this final architecture, I integrated the 'Trial vs. Term' choice as a decision node within the main class flow. This allows users to verify that a specific class fits their schedule before deciding on their level of commitment, resulting in a more intuitive and flexible path to purchase.",
  },
  {
    id: 5,
    title: 'Visa Rights & Workforce Matching Platform',
    subtitle: 'Reducing friction in short-term contract work and visa rights management',
    desc: 'A workforce-matching product for high-skilled international professionals and employers covering parental or sick leave — making work-rights duration visible, and handovers structured, so neither side is guessing.',
    tags: ['Product Design', 'Hackathon', 'Accessibility'],
    challenge:
      'High-skilled international professionals face unnecessary friction and anxiety tracking work rights, while employers struggle to manage smooth short-term contract handovers. Visa conditions are dense, time-bound, and easy to misread. Leave coverage is urgent. The result is cognitive stress at the exact moment both sides need clarity.',
    role: 'Lead Product Designer / Co-founder. 1st Place Winner at the Cremorne Digital Hub Vibe-a-thon. Responsible for product direction, interaction design, and rapid concept validation under hackathon constraints.',
    process:
      'The Visa Clock: visualising work-right durations as a readable timeline instead of legalese — remaining time, restrictions, and eligibility at a glance.\n\nHandover Workflows: a step-by-step system for leave coverage so knowledge transfer is structured, not improvised.\n\nResearch & AI: used AI tools to synthesise friction points quickly and pressure-test concepts against real user language under a tight build window.\n\nCraft & Accessibility: WCAG 2.2 contrast, clear hierarchy, and low cognitive load so the interface stays usable when the stakes are high.',
    impact: {
      description:
        'Recognised with 1st Place at the Cremorne Digital Hub Vibe-a-thon — a clear, stress-free experience that gives workers and employers transparency over work rights and transition workflows.',
      outcomes: [
        { title: 'The Visa Clock', desc: 'Complex durations made visible without legal overload.' },
        {
          title: 'Structured Handovers',
          desc: 'Leave coverage follows a shared, step-by-step path.',
        },
        { title: '1st Place', desc: 'Cremorne Digital Hub Vibe-a-thon.' },
      ],
    },
    keyTakeaway: {
      title: 'Key Takeaway',
      description:
        'Work rights are not a settings page. They are a source of anxiety that sits underneath every contract decision. The product only works if it removes that anxiety — for the worker checking remaining time, and for the employer trying to cover a leave gap without breaking compliance.\n\nThe reusable lesson: when the domain is legally dense, the design job is translation. Visualise time. Sequence the handover. Keep the interface quiet enough that people can think.',
      outcomes: [
        {
          title: "Translate, Don't Dump",
          desc: 'Duration belongs on a clock, not in a policy PDF.',
        },
        {
          title: 'Two Audiences',
          desc: 'Workers and employers need the same truth, different jobs.',
        },
        {
          title: 'Speed With Standards',
          desc: 'Hackathon pace still held WCAG 2.2 and low cognitive load.',
        },
      ],
    },
    wanderingContent: {
      challenge:
        'The anxiety is not abstract. International professionals are tracking visa clocks in their heads — how long they can work, under what conditions, and what happens if a contract overruns. Employers covering parental or sick leave need someone in the seat quickly, without creating a compliance problem they cannot see.\n\nBoth sides are operating under time pressure. Both are underserved by tools that treat work rights as fine print. The brief was to make the rights layer as visible as the roster.',
      role: 'Lead Product Designer / Co-founder at SpringBoard.\n\nContext: 1st Place, Cremorne Digital Hub Vibe-a-thon.\n\nI owned the product framing, the Visa Clock concept, and the handover flow. Under hackathon constraints, the work was to find the sharpest friction — visa opacity and messy leave coverage — and design a system that could be validated in days, not quarters.',
      process:
        'The Visa Clock was the core artefact: a visual remaining-time model that replaces dense visa language with duration, constraints, and status. If you cannot see the clock, you cannot plan.\n\nHandover workflows turned leave coverage into a shared sequence — what to transfer, in what order, and when the incoming contractor is actually ready. That is operations design, not decoration.\n\nAI was used as a research accelerator: clustering friction language, testing whether the concept matched how people described the problem, and cutting the time from insight to prototype. Accessibility was non-negotiable even at speed — WCAG 2.2 contrast, clear type hierarchy, and an interface that does not add cognitive load to an already stressful moment.',
      impact: {
        description:
          'The concept won 1st Place at the Cremorne Digital Hub Vibe-a-thon. The win was not polish for its own sake. It was a readable rights layer plus a handover system that treated leave coverage as a designed workflow.',
        outcomesTitle: 'What Landed',
        outcomes: [
          { title: 'Rights, Visualised', desc: 'Duration and constraints without legal theatre.' },
          { title: 'Handover as a System', desc: 'Coverage is sequenced, not hoped for.' },
          {
            title: 'Validated Under Pressure',
            desc: 'Concept held up in a judged, time-boxed build.',
          },
        ],
      },
      refinement: {
        outcomesTitle: 'Key Takeaway',
        outcomes: [
          {
            title: 'Anxiety is the Requirement',
            desc: 'Design for the feeling of not knowing, not just the form.',
          },
          {
            title: 'Shared Source of Truth',
            desc: 'Workers and employers should not hold different versions of the clock.',
          },
          {
            title: 'Roadmap',
            desc: 'Scale the matching layer without losing the clarity that won.',
          },
        ],
        description:
          'SpringBoard started as a hackathon product and pointed at a longer ecosystem: matching people who can legally work a short contract with businesses that need coverage now.\n\nThe lesson I am taking forward is that compliance UX fails when it asks users to interpret law. It works when it shows remaining time, states the constraint in plain language, and gives both sides a workflow they can finish. Visuals, sequence, and accessibility were the whole strategy — not a later pass.',
      },
    },
    images: [springboardPlaceholder],
    placeholder: true,
  },
  {
    id: 6,
    title: 'Custom Configurator: Instant Quotes',
    headline: 'Custom Configurator: Instant Quotes & Smart Handoff',
    subtitle:
      'Accelerating custom shed purchases by turning slow sales chases into an automated, transparent quoting journey.',
    desc: 'A self-serve quote journey for Shed Bonanza: a visual HTML quote, upfront slab and permit costs, and a one-click deposit that logs back into Salesforce.',
    tags: ['Systems Thinking', 'End-to-End UX', 'Salesforce Integration'],
    challenge:
      'Quoting a custom shed was trapped in a slow manual cycle. When an online enquiry arrived, sales staff faced endless follow-up loops: multiple phone calls, manual CRM updates, separate 3D prototype models, and back-and-forth approval emails before an invoice could even be generated. By the time customers saw a complete price, days had passed, momentum was lost, and high drop-off rates followed.',
    role: 'Senior Product Designer / UX Lead.\n\nOwned the path from enquiry to deposit: the quote letter, the payment handoff, and the Salesforce record that keeps sales in the loop.',
    process: {
      type: 'rich',
      sections: [
        {
          type: 'text',
          hideImage: true,
          content:
            'Designed a self-serve quote journey backed by rich HTML quote summaries and automated two-way Salesforce integration.',
        },
        {
          type: 'text',
          label: 'On paper first',
          fit: 'contain',
          image: shedQuoteSketches,
          alt: 'Handwritten Shed Bonanza notes for the quote page, slab counts, and shed elevation',
          content:
            'The quote was drawn on letterhead before it was a screen. Slab and footing counts, the page the buyer would see, and the shed in elevation sat on the same pages. The generator follows that order.',
        },
        {
          type: 'text',
          label: 'Progressive configuration',
          fit: 'contain',
          image: shedQuoteSpecs,
          content:
            'Customers choose their structure step-by-step rather than facing a wall of engineering choices. The quote shows the 3D render, dimensions, and line items that match those selections.',
        },
        {
          type: 'text',
          label: 'First prototype',
          hideImage: true,
          content:
            'An early pass at how the quote should open: the structure in frame, a short welcome, the investment in one figure, and four marks — Australian made and owned, engineered for durability, high quality steel, built to last. The specification, slab and permit figures, and deposit were built into the quote after this.',
        },
        {
          type: 'text',
          label: 'Easy handover',
          hideImage: true,
          content:
            'Any picture chosen for the top of the quote is tinted monochrome blue, so the opening stays consistent no matter which view is used.\n\nThe shed the customer agreed to is taken from the 3D planner at a set angle, then placed on the quote.',
        },
        {
          type: 'text',
          label: 'Upfront slab and permit costs',
          fit: 'contain',
          image: shedCosts,
          content:
            'Foundation, assembly, and council costs sit in the quote body, so the price the buyer sees is the price they are agreeing to.',
        },
        {
          type: 'text',
          label: 'Instant payment handoff',
          fit: 'contain',
          image: shedPayment,
          content:
            'Embedded one-click deposit links into the quote body, letting buyers confirm designs and pay immediately.',
        },
        {
          type: 'text',
          label: 'Two-way Salesforce sync',
          hideImage: true,
          content:
            'Customer requirements automatically populate Salesforce, and the generated quote document logs straight back into the record to give sales full context.',
        },
        {
          type: 'media',
          video: shedSalesforceSync,
          caption: 'The rendered HTML quote and the one-click jump to the secure payment screen.',
        },
      ],
    },
    impact: {
      description:
        'The sales cycle moved from days of follow-ups to a quote the buyer can review and approve in one session.',
      outcomes: [
        {
          title: 'Faster Deals',
          desc: 'Immediate quote review and approval, instead of a multi-day chase.',
        },
        {
          title: 'Transparent Pricing',
          desc: 'Slab needs and permit costs are calculated before anyone is asked to commit.',
        },
        {
          title: 'Fewer Lost Leads',
          desc: 'The multi-touchpoint chase that stalled deals is no longer the path to a price.',
        },
      ],
    },
    keyTakeaway: {
      title: 'Key Takeaway',
      description:
        'The useful order was already on the letterhead: slab and footing counts, the page the buyer would see, and the shed in elevation. The generator follows that order, so the screen is a faster version of the letter, not a new product the buyer has to learn.\n\nWhat closed the deal was putting the real cost and the deposit on that same page, then logging the document back into Salesforce. Sales stops chasing a price the buyer has already seen.',
      outcomes: [
        {
          title: 'Letter, Then Screen',
          desc: 'Slab counts, the quote page, and the elevation were settled on paper.',
        },
        {
          title: 'The Full Price',
          desc: 'Permit, assembly, and the slab sit in the figure the buyer agrees to.',
        },
        {
          title: 'One Record',
          desc: 'The paid quote is the document that lands on the Salesforce record.',
        },
      ],
    },
    wanderingContent: {
      headline: 'Custom Configurator: Turning Envelope Maths into a Guided Digital Experience',
      subtitle:
        "How we took chaotic, manual calculations out of sales reps' heads and built an automated, customer-facing quoting engine.",
      tags: [
        'Product Design',
        'Service Design',
        'Information Architecture',
        'Systems Architecture',
      ],
      challengeTitle: 'The Discovery',
      challenge:
        'Custom sheds are structural buildings, not simple catalogue items. Size, roof pitch, cladding, roller doors, and site conditions all dictate concrete thickness, footing count, and council permits.\n\nOn paper, the company had a digital intake form. In reality, the sales journey was a multi-day chase: online enquiry, then call, then another call, then SMS, then a lead marked closed lost.',
      role: 'Senior Product Designer / UX Lead.\n\nDiscipline: Product Design, Service Design, Information Architecture, Systems Architecture.\n\nI sat with the way quotes were actually produced — scrap-paper footing counts, manual Salesforce updates, static PDFs — and redesigned that operation into a generator the customer could finish.',
      process: {
        type: 'rich',
        sections: [
          {
            type: 'text',
            heading: 'The Friction Behind the Curtain',
            hideImage: true,
            content:
              'An enquiry arrived, kicking off a long manual chase across phone calls and text messages.',
            outcomes: [
              {
                title: 'By Hand',
                desc: 'Sales reps calculated slab requirements, footings, and structural limits by hand at their desks.',
              },
              {
                title: 'Manual Updates',
                desc: 'Reps manually updated Salesforce, built 3D prototype renders, and sent static PDFs.',
              },
              {
                title: 'Deals Went Cold',
                desc: 'Buyers hesitated over hidden installation costs. Deals went cold, and leads were marked closed lost.',
              },
            ],
          },
          {
            type: 'text',
            heading: 'Translating Formulae into Code',
            fit: 'contain',
            image: shedVscode,
            caption:
              'Developing dynamic HTML templates to parse Opportunity data into visual quotes.',
            content:
              'To replace the manual chase, we had to encode engineering logic without exposing technical complexity to the user.\n\nSystematising the maths: formulas that lived on scrap paper, such as (Length / 4 + 1) × 2 + 4 + 2 × roller doors, moved into automated backend calculations.\n\nData pipeline: configurator inputs push to Salesforce and build the Opportunity record. An internal generator pulls that record and assembles an interactive quote package in seconds.',
          },
          {
            type: 'text',
            label: 'The internal generator',
            fit: 'contain',
            image: shedGenerator,
            content:
              'Sales paste a Salesforce Opportunity ID. The tool returns the live HTML quote, the stage breakdown, and a test payment link from that record.',
          },
          {
            type: 'text',
            heading: 'The Quote Engine',
            fit: 'contain',
            image: shedCosts,
            content:
              'The generator builds a personalised HTML quote from the Opportunity.\n\nThe opening direction started here, as a first prototype: the structure, a short welcome, the investment, and four marks of proof.\n\nThe quote carries the specification, the slab and permit figures, the milestone path, and a secure deposit.',
          },
          {
            type: 'media',
            video: shedSalesforceSync,
            caption:
              'End-to-end flow: from entering the Salesforce Opportunity ID to previewing the live HTML quote and launching the secure payment screen.',
          },
        ],
      },
      impact: {
        description:
          'Desk sketches and waiting days for a draft were replaced by a quote a buyer can inspect and pay against in a single session.',
        outcomesTitle: 'The Business Impact',
        outcomes: [
          {
            title: 'No Manual Calculation Bottleneck',
            desc: 'Scrap-paper slab and footing maths now run as system calculations.',
          },
          {
            title: 'No Waiting on a Draft',
            desc: 'Buyers receive a complete visual proposal immediately.',
          },
          {
            title: 'A Faster Pipeline',
            desc: 'Specification review and the deposit happen in one session.',
          },
        ],
      },
      refinement: {
        outcomesTitle: 'Key Takeaway',
        outcomes: [
          {
            title: 'Letter, Then Screen',
            desc: 'Slab counts, the quote page, and the elevation were settled on paper.',
          },
          {
            title: 'The Full Price',
            desc: 'Permit, assembly, and the slab sit in the figure the buyer agrees to.',
          },
          {
            title: 'One Record',
            desc: 'The paid quote is the document that lands on the Salesforce record.',
          },
        ],
        description:
          'The useful order was already on the letterhead: slab and footing counts, the page the buyer would see, and the shed in elevation. The generator follows that order, so the screen is a faster version of the letter, not a new product the buyer has to learn.\n\nWhat closed the deal was putting the real cost and the deposit on that same page, then logging the document back into Salesforce. Sales stops chasing a price the buyer has already seen.',
      },
    },
    heroScreen: shedQuoteWelcome,
    heroFrame: 'wide',
    images: [shedQuoteWelcome],
    heroAlt: 'First prototype of the Shed Bonanza quote opening',
    heroCaption:
      'First prototype of the quote opening — a layout direction, ahead of the specification, costs, and deposit.',
    placeholder: false,
  },
];
