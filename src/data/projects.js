
import projectBookingChallenge from '../assets/studio-booking-challenge.webp';

import projectBookingProcess from '../assets/booking-process-new.webp';
import projectBookingFlow from '../assets/studio-booking-flow.webp';
import brandTrustSignals from '../assets/brand-trust-signals.webp';
import brandCms from '../assets/brand-cms.webp';
import brandFlowChartBeforeInDepth from '../assets/process-brand-flow-chart-before-in-depth.webp';
import brandFlowChartAfterImpact from '../assets/process-brand-flow-chart-after-impact.webp';
import brandFlowChartAfterInDepth from '../assets/process-brand-flow-chart-after-in-depth.webp';
import processBrandBeforeLayout from '../assets/process-brand-before-layout.png';
import processBrandAfterLayout from '../assets/process-brand-after-layout.png';
import processBrandKeyTakeaway1 from '../assets/process-brand-keytakeaway-1.webp';
import processBrandKeyTakeaway2 from '../assets/process-brand-keytakeaway-2.webp';
import processBrandKeyTakeaway3 from '../assets/process-brand-keytakeaway-3.webp';
import projectB2BNew from '../assets/b2b-hero-v2.webp';
import brandChallengeV2 from '../assets/brand-challenge-v2.webp';
import brandChallengeImpact from '../assets/challenge-brand-impact.webp';
import brandChallengeInDepth from '../assets/challenge-brand-in-depth.webp';
import brandChallengeAni from '../assets/brand-challenge-ani.webp';
import brandChallengeAniOnWhite from '../assets/brand-challenge-ani-onwhite.webp';
import brandChallengeAniOnBlack from '../assets/brand-challenge-ani-onblack.webp';
import brandChallengeFirstFrame from '../assets/brand-challenge-firstframe.webp';
import brandChallengeAniFirstFrame from '../assets/brand-challenge-ani-firstframe.webp';
import projectB2BProcessNew from '../assets/b2b-flow-audit.svg';
import OWChallengeHeatmap from '../assets/OW-challenge-heatmap.webp';
import projectBrandScalingHero from '../assets/brand-scaling-hero.webp';
import automationHero from '../assets/automation-hero.webp';
import decisionNode from '../assets/decision-node.png';
import reviewAndSign from '../assets/review-and-sign.webp';
import serviceBlueprint from '../assets/service-blue-print.webp';
import spreadsheetProcess1 from '../assets/Spread_sheet_doom_process_1.webp';
import spreadsheetProcess2 from '../assets/Spread_sheet_doom_process_2.webp';
import spreadsheetProcess3 from '../assets/Spread_sheet_doom_process_3.webp';
import spreadsheetProcess4 from '../assets/Spread_sheet_doom_process_4.webp';
import spreadsheetProcess5 from '../assets/Spread_sheet_doom_process_5.webp';

import projectB2BVideo from '../assets/HeroB2BOW.mp4';
import projectCandidateVideo from '../assets/hero-candidate-pipeline.mp4';
import candidateProcessIndepth from '../assets/Canidate-pipeline-process-indepth.webp';
import candidateChallenge from '../assets/candidate-challenge.webp';
import candidateOnTheGo from '../assets/candidate-on-the-go.webp';
import b2bGreetingVar3 from '../assets/main-body-b2b-greeting-page-var3.webp';
import b2bGreetingVar4 from '../assets/main-body-b2b-greeting-page-var4.webp';
import b2bGreetingVar8 from '../assets/main-body-b2b-greeting-page-var8-fin.webp';
import b2bAnimationProcessNoBg from '../assets/B2B_animation_process_nobg.webm';

export const PROJECTS = [
    {
        id: 3,
        title: "Brand Scaling & Client Acquisition Platform",
        desc: "End-to-end design and build of a content platform for a specialist photography brand - separating audience streams, introducing B2B trust signals, and deploying a headless CMS to convert specialist traffic into bookings.",
        tags: ["UX/UI Design", "Mobile First", "Headless CMS"],
        challenge: "Strategic Audience Mismatch. By presenting high-energy music photography alongside luxury fashion editorials in a single, unsorted stream, the brand signal was diluted. Specialist B2B clients perceived it as unfocused, leading to drop-off before they made contact. A secondary challenge was ensuring the platform could handle large, high-resolution images without sacrificing load speed or mobile performance.",
        challengeImage: brandChallengeAniFirstFrame,
        role: "End-to-End Product Design. Responsible for the content strategy audit, design system, and headless CMS integration via Contentful.",
        process: "Content-First Design & Structured Navigation.\n\nIA Strategy: Simplified the structure so users land directly on the category selector - removing the ambiguous navigation of the previous site.\n\nVisuals: Adopted a clean, minimal aesthetic. White space is used deliberately to let the photography speak for itself.\n\nTech: Implemented lazy loading via a headless Contentful CMS with structured Content Models, so the client can update the site independently without breaking the design.",
        impact: {
            description: "Turned a generalist photography site into a focused B2B sales tool - separating 'Commercial' and 'Personal' streams so the platform reflects how the client actually earns.",
            outcomes: [
                { title: "Zero-Friction Inquiry", desc: "Users are never more than 2 clicks from booking." },
                { title: "Operational Autonomy", desc: "Client updates the site independently via Contentful CMS." },
                { title: "Funnel Optimisation", desc: "60% shorter path to contact after restructuring the navigation." }
            ]
        },
        keyTakeaway: {
            title: "Trust & Compliance",
            description: "A key discovery was how much regulatory detail matters in a B2B context. Displaying an ABN number - a small, easily overlooked detail - meaningfully reduced friction for commercial clients who need to verify a business before engaging.\n\nThe broader lesson: in B2B, trust has to be built deliberately. Every label, every piece of copy, every ambiguous moment is a potential reason to leave. Clear, direct language at each step shortens the distance between first impression and a booking.",
            outcomes: [
                { title: "Regulatory Confidence", desc: "ABN display meets B2B verification expectations." },
                { title: "Clarity", desc: "Direct language removes hesitation at every step." },
                { title: "Built-In Trust", desc: "Essential for high-value commercial relationships." }
            ],
            image: processBrandKeyTakeaway1,
            stackedImages: [
                { src: processBrandKeyTakeaway1, alt: "Primary View", rotate: 0 },
                { src: processBrandAfterLayout, alt: "Layer 1", rotate: 20 },
                { src: processBrandKeyTakeaway2, alt: "Layer 2", rotate: 40 },
                { src: processBrandKeyTakeaway3, alt: "Layer 3", rotate: 60 }
            ],
            imageCaption: "By separating the platform into 'Commercial' and 'Personal' streams, we didn't just organise the images - we aligned the site's structure with how the business actually works.\n\nA note on the design approach: white space as a quality signal is context-dependent. For high-value commercial work, it elevates the photography. In volume-based retail, density is often the right call."
        },
        wanderingContent: {
            challengeImage: brandChallengeAniFirstFrame,
            impact: {
                description: "From Passive Archive to a Commercial Platform. The primary objective was to turn the client's digital presence into something that actively works for the business - a clearly structured, content-governed site built on a headless CMS.",
                outcomes: [
                    { title: "Content Discoverability", desc: "Structured taxonomy surfaces the right work to the right audience." },
                    { title: "Governed CMS", desc: "Contentful Content Models keep the brand consistent as the site grows." },
                    { title: "Commercial Focus", desc: "Separate user journeys convert specialist visitors into enquiries." }
                ]
            },
            challenge: "Strategic Audience Mismatch.\n\nThe core issue was a mismatch between the brand's audience and how the site was presenting the work. By showing high-energy music photography alongside luxury fashion editorials in a single, unsorted stream, the brand signal was diluted. Specialist B2B clients - the ones with the highest commercial value - saw a mixed portfolio and left.\n\nThe problem wasn't the quality of the work. It was that the site gave no signal of specialisation. A commercial fashion client encountering action photography switched off immediately. The structure was undermining the brand at its most critical touchpoint.\n\nThe technical challenge was ensuring the platform could support large, high-resolution images at speed - without sacrificing mobile performance or Core Web Vitals.",
            role: "Strategic Design Lead & CMS Architecture.\n\nTimeline: 4-Week Sprint (3 Weeks Discovery/Design + 1 Week Integration).\n\nThe Consultation: I pushed back on the client's initial request for high-density grids. Using competitor benchmarking, I made the case that for high-value commercial photography, white space is a quality signal - not wasted room. More images doesn't mean more impact.\n\nThe Build: I led the transition from a passive portfolio to a focused sales tool by separating the user journey into distinct 'Commercial' and 'Personal' streams. I also structured the Content Models directly in Contentful - defining clear rules for how content is entered - so the client can update and grow the site independently without breaking the design.",

            process: {
                type: 'rich',
                sections: [
                    {
                        type: 'text',
                        content: 'The Design Language: Strictly functional. All decorative elements were removed. Typography exists only to label and categorise the photography - so the viewer\'s attention goes entirely to the work, not the interface.\n\nThe CMS Architecture: The platform is built on Contentful\'s headless CMS. I structured the Content Models - the rules that govern how content is entered - so the client can update and expand the portfolio without accidental design breaks. The handover included full governance: a site that stays well-designed even when the designer isn\'t in the room.',
                        image: brandCms
                    },
                    {
                        type: 'comparison',
                        bg: 'var(--color-charcoal)',
                        items: [
                            {
                                title: 'Before: Ambiguous Navigation',
                                desc: 'The previous site mixed all disciplines into a single stream. Visitors had no clear signal of specialisation — a major obstacle for commercial clients evaluating the brand.',
                                img: brandFlowChartBeforeInDepth
                            },
                            {
                                title: 'After: A Focused Sales Tool',
                                desc: 'The cluttered structure was replaced with an immediate category selector - routing commercial and personal audiences into separate, clearly defined journeys from the very first interaction.',

                                img: brandFlowChartAfterInDepth
                            }
                        ]
                    },
                    {
                        type: 'comparison',
                        bg: 'var(--color-charcoal)',
                        items: [
                            {
                                title: 'Before: High-Density Grid Request',
                                desc: "The client wanted high-density grids, assuming that showing more work would lead to more bookings. Competitor benchmarking was used to challenge that assumption with evidence.",
                                img: processBrandBeforeLayout
                            },
                            {
                                title: 'After: White Space as a Quality Signal',
                                desc: "Benchmarking showed that for high-value commercial photography, white space signals quality - it gives each image room to be considered, rather than competing for attention.",
                                img: processBrandAfterLayout
                            }
                        ]
                    }
                ]
            },
            refinement: {
                outcomesTitle: "Trust & Compliance",
                outcomes: [
                    { title: "Regulatory Confidence", desc: "ABN display meets standard B2B verification expectations." },
                    { title: "Clarity", desc: "Direct language removes hesitation at every step." },
                    { title: "Built-In Trust", desc: "Essential for high-value commercial relationships." }
                ],
                description: "Trust & Compliance: B2B Trust Signals & Regulatory Identifiers.\n\nOne of the more unexpected discoveries was how much a small regulatory detail - the ABN number - mattered to commercial clients. For B2B buyers, it's a standard due-diligence check: is this a real, registered business? Displaying it prominently removed a subtle but real barrier to engagement.\n\nThe broader lesson: in a B2B context, trust isn't assumed - it needs to be demonstrated. Every ambiguous label, every missing detail, every moment of uncertainty is a reason to leave. The design discipline here was ensuring that clarity was built into every touchpoint, so the client's credibility was never in question."
            }
        },
        images: [
            projectBrandScalingHero,
            brandChallengeV2,
            brandCms,
            brandTrustSignals
        ]
    },
    {
        id: 4,
        title: "The 'Spreadsheet of Doom' & Personal CRM",
        desc: "Pivoting to a 'Personal CRM' to solve candidate anxiety. A research-led strategy that uncovered the 'Spreadsheet of Doom'.",
        tags: ["Product Discovery", "UX Research", "Product Strategy"],
        challenge: "The Problem: Data Fragmentation. The modern job search is multi-channel and inherently mobile. Candidates using desktop-only tools (Excel) lose data while 'on the go.' The solution necessitated a Mobile-First architecture to eliminate this friction and capture progress in real-time.",
        role: "Lead UX Researcher & Product Strategist. Responsible for the End-to-End Research Ops: Screener design, 1:1 qualitative interviews, affinity mapping, and Defining the MVP feature set.",
        process: "Evidence-Based Product Definition.\n\nMethodology: Conducted 6 qualitative face-to-face interviews and dug into different industries by conducting a quantitative questionnaire around different countries.\n\nSynthesis: Used Affinity Mapping to cluster pain points into themes: \"Ghosting,\" \"Repetitive Entry,\" and \"Status Anxiety.\"\n\nOutcome: Defined the \"Job Wallet\" concept as a central repository for all application data.",
        impact: {
            outcomesTitle: "Key Discoveries",
            description: "De-risking the 'Job Hunt' Vertical. Conducted foundational research to validate the market need for a candidate-centric Application Tracking System (ATS).",
            outcomes: [
                { title: "The Insight", desc: "Managing emotional data, not finding jobs." },
                { title: "The Strategy", desc: "Shifted from aggregation to management." },
                { title: "The Validation", desc: "Found 3 critical anxiety drop-off points." }
            ]
        },
        keyTakeaway: {
            title: "Key Takeaway",
            description: "Going into this research, I expected candidates would want a powerful job search engine. What I discovered was something far more human - they needed help managing the emotional weight of rejection and uncertainty.\n\nThe moment a candidate loses track of where they applied or when to follow up, anxiety spikes. By shifting the focus from 'Finding Jobs' to 'Managing Anxiety', we built a tool that users actually wanted to keep open. The insight wasn't just about features - it was about understanding the mental state of someone in career transition and designing to support them through it.",
            outcomes: [
                { title: "Mental Model", desc: "Aligned the tool with the user's actual status." },
                { title: "Retention", desc: "Users stay for utility, not job listings." },
                { title: "Trust", desc: "Feedback loops build long-term confidence." }
            ],
            processImages: [
                spreadsheetProcess1,
                spreadsheetProcess2,
                spreadsheetProcess3,
                spreadsheetProcess4,
                spreadsheetProcess5
            ]
        },
        wanderingContent: {
            challenge: "The \"Spreadsheet of Doom\" Phenomenon. Qualitative research exposed a universal pain point: the \"Manual Tax.\"\n\nCognitive Overload: Users reported high anxiety when asked, \"Where did you apply last week?\" because the data was scattered.\n\nThe Feedback Void: The lack of status updates from companies creates an \"Open Loop\" in the user's mind. Existing tools don't close this loop; they just list it. The challenge was to design a system that captures this data automatically or with zero friction, acknowledging that unemployed users have low motivation for data entry.",
            role: "From Ambiguity to Architecture. My role was to bring structure to a chaotic problem space.\n\nDiscovery: I didn't start with UI. I started with Mental Models. I conducted diary studies to map the emotional highs and lows of a 3-month job search.\n\nSynthesis: I translated raw qualitative data into actionable \"How Might We\" statements that formed the backlog for the design phase.",
            process: {
                type: 'rich',
                renderComponent: 'CandidateJourneyGraph',
                beforeGraph: 'Designing for Low Motivation. Early concepts assumed users would want detailed analytics. The research proved this wrong. Users wanted "Minimal Viable Effort."',
                afterGraph: [
                    'Key Research Artifact: The Emotional Journey Map. We mapped the user\'s mood against the application timeline and uncovered a critical pattern: motivation crashes approximately 2-3 weeks after applying when no response is received. This "crash point" represents the moment when candidates are most vulnerable to abandoning their job search entirely.',
                    'The insight shifted our design thinking from feature richness to emotional support. Rather than building a passive tracker with dashboards and charts, we needed to create an active coach that intervenes precisely when users need it most.',
                    'The Design Decision: The interface must not just track applications; it must nudge users during these "Crash Points" with low-effort actions (e.g., "One-tap follow-up email generator"). This insight moved the product from a passive tracker to an active coach.'
                ],
                sections: []
            },
            impact: {
                outcomesTitle: "Key Discoveries",
                description: "Defining the Unmet Need. The hypothesis was that candidates needed a better way to find roles, but data disproved this.\n\nThe real problem was \"Application Amnesia\" - users apply to so many roles across disparate platforms that they lose track of follow-ups.",
                outcomes: [
                    { title: "The Pivot", desc: "From Job Board to Personal CRM for Careers." },
                    { title: "The Crash Point", desc: "Motivation crashes at 2 weeks. Intervene here." },
                    { title: "Active Coaching", desc: "Nudging closes the feedback loop." }
                ]
            },
            refinement: {
                outcomesTitle: "Key Takeaway",
                outcomes: [
                    { title: "Mental Model Shift", desc: "Aligned with emotional state, not mechanics." },
                    { title: "Retention through Utility", desc: "Emotional support beats listings alone." },
                    { title: "Active Coaching Model", desc: "Proactive nudges build engagement and trust." }
                ],
                description: "This research fundamentally shifted my understanding of product design from feature-driven to empathy-driven.\n\nGoing into this project, I expected candidates would want sophisticated search algorithms and comprehensive job databases. What the research revealed was far more human - they needed help managing the psychological burden of career transition.\n\nThe 'Spreadsheet of Doom' wasn't just a tool for tracking applications. It was a coping mechanism for anxiety. Every row represented hope. Every empty cell represented uncertainty. When I mapped the emotional journey and discovered the 2-week 'crash point,' it became clear that the product couldn't just be a passive tracker.\n\nThis insight transformed the entire product vision from 'helping people find jobs' to 'helping people emotionally survive the job hunt.' It taught me that the most powerful design solutions often address the unspoken emotional needs that users can't always articulate, but deeply feel."
            }
        },
        images: [candidateOnTheGo, candidateChallenge, candidateOnTheGo],
        video: projectCandidateVideo,
    },
    {
        id: 1,
        title: "Optimising B2B Workflow & Retention",
        desc: "Identified a critical environmental mismatch at the Point of Sale - moving payment assets from a scroll-dependent zone to a fixed-action zone cut interaction cost by 50% and secured re-prioritisation of the FY26 Mobile Roadmap.",
        tags: ["Mobile First", "UX Research", "Figma"],
        challenge: "Retention Risk at the Point of Sale. A Contextual Inquiry at the checkout identified a critical environmental mismatch: payment utilities (Digital Card, Barcode) were buried in a scroll-dependent zone, forcing business users to hunt through nested content during high-pressure POS moments. Relocating these assets from a scroll-dependent zone to a fixed-action zone reduced target acquisition time by 50%, directly addressing the friction at the point of revenue capture.",
        role: "Lead UX Designer. Responsible for the flow audit and IA restructure - drawing on first-hand experience as a regular user of the platform to identify friction the internal data was missing.",
        process: {
            type: 'rich',
            sections: [
                {
                    type: 'text',
                    content: "The fix was structural. The mobile IA was reorganised from a list-based content hierarchy to a persistent utility header model - extracting payment assets from scrollable content and pinning them to a fixed position at the top of the viewport.\n\nThis shifted the interaction pattern from Hunt behaviour (Login > Scroll > Locate > Tap) to Reflex behaviour (Login > Tap). That compression - four steps to two - cut interaction cost by 50% at the exact moment the user is under the most pressure.\n\nThe result: the interface stopped fighting the environment it was being used in.",
                    video: b2bAnimationProcessNoBg
                }
            ]
        },
        impact: {
            description: "Successfully secured stakeholder buy-in to elevate POS utility from a backlog item to a Strategic Priority — validated by CX leadership as the Target State for mobile Point of Sale interactions and formally integrated into the FY26 roadmap.",
            outcomes: [
                { title: "Strategic Catalyst", desc: "Shifted internal conversation on mobile utility architecture." },
                { title: "Stakeholder Validation", desc: "Adopted as Target State by CX leadership." },
                { title: "Quantified Impact", desc: "Demonstrated 50% interaction cost reduction." }
            ]
        },
        keyTakeaway: {
            title: "Key Takeaway",
            description: "Being a regular user of the platform meant I could see something the internal data couldn't: the checkout experience was broken in ways that didn't show up in a dashboard.\n\nThe fix wasn't complicated. Moving payment assets out of a scroll-dependent zone and into a fixed-action zone reduced the interaction from four steps to two. Half the effort, at the moment it mattered most. Presenting that to CX leadership reframed it from a UI preference to a retention argument - and got it into the FY26 roadmap.",
            outcomes: [
                { title: "Roadmap Advisory", desc: "Influenced platform Target State architecture." },
                { title: "Strategic Validation", desc: "CX leadership adopted as benchmark model." },
                { title: "Lived Experience Design", desc: "Auto-ethnography revealed overlooked friction." }
            ]
        },
        wanderingContent: {
            challenge: "Environmental Mismatch at the Point of Sale.\n\nThe problem wasn't visible in the data. Quantitative reporting showed no unusual drop-off at checkout - but using the platform as a regular customer told a different story.\n\nCheckout isn't a calm environment. You're separating household and business purchases, holding items, operating one-handed, with a queue behind you. The existing mobile interface was designed as if none of that was happening. The Digital Card and Barcode - the two utilities needed at the counter - were buried four levels deep in a scrollable list. Getting to them required four deliberate steps at the moment you had no attention to spare.\n\nThe problem wasn't the features. It was where they were placed.",
            role: "Lead UX Designer, responsible for the flow audit and IA restructure.\n\nI positioned this as a research finding, not a design request. By using the platform as a customer, I could document the friction precisely - not as a preference, but as a structural problem with a measurable cost.\n\nI audited the legacy flow, quantified the interaction depth, and prepared the case for CX leadership. The goal was to make the architectural issue legible to stakeholders who weren't experiencing it firsthand.",
            process: {
                type: 'rich',
                sections: [
                    {
                        type: 'text',
                        content: 'The Flow Audit.\n\nI mapped the full interaction sequence to quantify the problem. As per the flow audit, the Digital Card was nested four levels deep inside a scrollable list. The pattern was Login > Navigate > Scroll > Locate > Tap - five steps where one should do.\n\nThe Target State replaced that with a Persistent Utility Header - payment assets pinned to a fixed position, always visible, always one tap away. Secondary functions like order history and credit tracking stay accessible, but they stop competing with the tools you need at the counter.\n\nThe decision was about hierarchy, not aesthetics. At the checkout counter, attention is already maxed out. Every extra step makes it worse. Reducing to two steps wasn\'t an improvement on the old design - it was the baseline the experience should have started from.'
                    }
                ]
            },
            impact: {
                description: "The fix was deliberate: extract the Digital Card and Barcode from a scrollable list and pin them to a fixed position at the top of the viewport. One tap instead of four. The utilities are now where the environment demands them to be.",
                outcomesTitle: "What Changed Architecturally",
                outcomes: [
                    { title: "IA Inversion", desc: "Shifted from list-based hierarchy to a Persistent Utility Header model." },
                    { title: "Fixed-Action Zone", desc: "Removed scroll dependency for time-critical POS interactions." },
                    { title: "Hunt → Reflex", desc: "4-step acquisition reduced to 2 steps at the point of revenue capture." }
                ]
            },
            refinement: {
                description: "From Backlog to Strategic Priority.\n\nI presented the audit to CX leadership not as a request for a redesign, but as evidence of a structural problem the organisation's existing data had missed. The argument was simple: there are things a dashboard can't tell you that a regular user already knows. This was one of them.\n\nCX leadership validated the proposed architecture as the Target State for mobile POS interactions. What had been sitting in the backlog with no defined champion was committed to the FY26 roadmap as a Strategic Priority. That shift didn't come from a design review - it came from the audit making the problem legible in business terms.\n\nThe broader lesson: being close to the user context isn't a conflict of interest. It's a research advantage. Quantitative data tells you what's happening. Lived experience tells you why it matters.",
                outcomesTitle: "Key Takeaway",
                outcomes: [
                    { title: "Contextual Inquiry", desc: "Domain expertise revealed a blind spot in quantitative data." },
                    { title: "Roadmap Reprioritisation", desc: "POS utility elevated from backlog to Strategic Priority for FY26." },
                    { title: "50% Interaction Cost Reduction", desc: "Fixed-action zone cut target acquisition time at point of sale." }
                ]
            }
        },
        images: [projectB2BNew, OWChallengeHeatmap, projectB2BProcessNew],
        video: projectB2BVideo,
    },
    {
        id: 0,
        title: "Service Automation: Zero-Touch Model",
        desc: "A streamlined SaaS solution reducing admin time by 40% for creative studios.",
        tags: ["Service Design", "Product Strategy", "UX/UI"],
        challenge: "The Problem: Operational Paralysis. The legacy site functioned as a static blog, burying critical class details and forcing 100% of bookings into manual phone calls. This bottleneck capped the business’s growth potential.",
        challengeImage: serviceBlueprint,
        role: "Service Design & Product Strategy. Lead Product Designer responsible for the end-to-end transformation from a manual service to an automated product ecosystem.",
        process: {
            type: 'rich',
            sections: [
                {
                    type: 'text',
                    content: 'Logic Architecture & Flow Unification.\n\nDiscovery: Identified "Phone Tag" as the root cause of churn and disputes.\n\nArchitecture: Integrated "Class Trials" and "Full Terms" into a single decision tree, removing the disjointed experience of separate products.\n\nResult: A unified path to purchase that allows flexible commitment levels.',
                    image: reviewAndSign
                }
            ]
        },
        impact: {
            description: "Achieving the \"Zero-Admin\" State. Redesigned the service model to eliminate manual booking friction, resulting in a 40% reduction in administrative workload within month one.",
            outcomes: [
                { title: "The Shift", desc: "Digital booking replaces phone tag model." },
                { title: "Risk Reduction", desc: "Digital agreements cut disputes by 90%." },
                { title: "Growth Signal", desc: "36% revenue up, 28% bounce rate down." }
            ]
        },
        keyTakeaway: {
            title: "Key Takeaway",
            description: "Watching the studio owner drown in spreadsheets and phone calls was like watching someone try to grow a business with one hand tied behind their back. Every booking required manual intervention, every payment risked a dispute, and the owner's time was consumed by admin instead of teaching.\n\nAutomating the 'Trust Contract' wasn't just about saving time - it was about giving the business room to breathe and grow. When you remove the friction between a customer's interest and their ability to commit, magic happens. Revenue scales without adding headcount, and the owner gets to focus on what they actually love doing.",
            outcomes: [
                { title: "Scalability", desc: "Revenue decoupled from owner's time." },
                { title: "Efficiency", desc: "Eliminated 90% of admin hours." },
                { title: "Clarity", desc: "Digital terms eliminated payment disputes." }
            ]
        },
        wanderingContent: {
            challenge: "Diagnosing the \"Admin Loop.\" The issue wasn't just usability; it was an Operational Bottleneck.\n\nThe Friction Trap: Potential customers abandoned the site because the interaction cost (making a phone call) was too high compared to competitors.\n\nThe Dispute Cycle: The lack of a structured digital agreement meant terms were verbal and ambiguous, leading to hours spent resolving payment misunderstandings. The manual burden was consuming the client's actual teaching time.",
            challengeImage: serviceBlueprint,
            role: "Mapping the \"Zero-Touch\" Blueprint. My strategy focused on Service Blueprinting - identifying every point where a human had to intervene (emailing, calling, confirming) and designing a digital proxy to handle it. I didn't just design the interface; I engineered the business logic to automate the \"Trust and Transaction\" simultaneously.",
            process: {
                type: 'rich',
                sections: [
                    {
                        type: 'text',
                        content: 'Refining the Booking Logic (The Decision Node).\n\n1. The "Tentative" Protocol: I prototyped a flow where the contract\'s not just a checkbox, but a confirmation step. This required users to agree to terms digitally before a booking is confirmed, creating a psychological commitment that reduced no-shows.\n\n2. The Integration of "Trials": Early iterations treated "Class Trials" as a separate product, which fragmented the user journey. I corrected this by integrating the choice as a Decision Node within the main class flow. This allows users to verify that a specific class fits their schedule before deciding on their level of commitment (Trial vs. Term), resulting in a more intuitive, flexible funnel.\n\nThe breakthrough was recognising that the \'Trust Contract\' - the moment when a customer decides to commit - didn\'t need to be manual. By creating a \'Tentative Contract\' model, we automated the entire decision tree from interest to commitment without requiring human intervention.',
                        image: decisionNode
                    }
                ]
            },
            impact: {
                description: "We digitized trust via a \"Tentative Contract\" Model. By moving the \"Trial vs. Term\" decision node inside the main flow, we respected the user's need to verify schedules before committing.",
                outcomes: [
                    { title: "Risk Reduction", desc: "Digital agreements cut disputes by 90%." },
                    { title: "Growth Signal", desc: "36% revenue up, 28% bounce rate down." },
                    { title: "Unit Economics", desc: "No admin tax, focus on teaching not invoices." }
                ]
            },
            refinement: {
                outcomesTitle: "Key Takeaway",
                outcomes: [
                    { title: "Scalability Architecture", desc: "Revenue decoupled from owner's time." },
                    { title: "Operational Efficiency", desc: "Digitised booking cuts 90% of admin hours." },
                    { title: "Clarity and Trust", desc: "Digital terms eliminate payment disputes." }
                ],
                description: "Watching the studio owner struggle with manual bookings taught me that the best product design often comes from observing operational pain first-hand.\n\nEvery phone call was a bottleneck. Every manual confirmation was a risk. The business was trapped in a cycle where growth meant more admin burden, which meant less time for the core service.\n\nThis project reinforced a fundamental principle: when you remove friction between customer interest and their ability to act, you don't just improve UX - you unlock business scalability. The 36% revenue increase wasn't because we added features. It was because we removed barriers that prevented people from saying 'yes.'"
            }
        },
        images: [
            automationHero,
            projectBookingChallenge,
            projectBookingProcess,
            projectBookingFlow
        ],
        refinement: "Refining the Booking Logic: Early iterations of this flow treated 'Class Trials' as a separate product, creating a disjointed experience. In this final architecture, I integrated the 'Trial vs. Term' choice as a decision node within the main class flow. This allows users to verify that a specific class fits their schedule before deciding on their level of commitment, resulting in a more intuitive and flexible path to purchase."
    },
];
