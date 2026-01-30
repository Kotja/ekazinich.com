
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
        desc: "A user-centric overhaul of a photographer's portfolio to recapture lost business through improved UX and mobile responsiveness.",
        tags: ["UX/UI Design", "Mobile First", "CMS Integration"],
        challenge: "Categorical Ambiguity. The previous digital presence failed to distinguish between the photographer's disparate disciplines. High-energy \"Action\" shots of music performances were diluted by \"Fashion\" editorials, creating a confused brand signal that hindered specialist bookings.",
        challengeImage: brandChallengeAni,
        role: "End-to-End Product Architecture. Responsible for the strategic taxonomy audit, UI system design, and CMS integration.",
        process: "Systemisation & \"Invisible\" UI.\n\nIA Strategy: Flattened the hierarchy. Users land directly on the category selector, eliminating the \"Mystery Meat\" navigation of the previous site.\n\nVisuals: Adopted a brutalist, utility-first aesthetic. White space is used as an active element to frame the work.\n\nTech: Implemented a high-performance lazy-loading stack to ensure the \"Action\" portfolio loads as fast as the \"Portraits,\" despite the heavy data payload.",
        impact: {
            description: "Taxonomy Migration & Funnel Optimisation. Transformed a generalist photography archive into a targeted B2B sales tool.",
            outcomes: [
                { title: "Zero-Friction Inquiry", desc: "Users are never more than 2 clicks from booking." },
                { title: "Operational Autonomy", desc: "Client manages assets via custom CMS." },
                { title: "Funnel Optimisation", desc: "60% shorter journey to contact via IA." }
            ]
        },
        keyTakeaway: {
            title: "Key Takeaway",
            description: "I also discovered the importance of explicit trust signals, such as displaying an ABN number. These details validiate the business's legitimacy and remove doubt.\n\nMy key takeaway from this project is the importance of simplification. The need to use the simplest words to define - so the user don't have to guess or think twice. This builds trust - the crucial part for the business-client relationship.",
            outcomes: [
                { title: "Simplification", desc: "The need to use the simplest words to define." },
                { title: "Clarity", desc: "User doesn't guess or think twice." },
                { title: "Trust", desc: "Crucial for business-client relationships." }
            ],
            image: processBrandKeyTakeaway1,
            stackedImages: [
                { src: processBrandKeyTakeaway1, alt: "Primary View", rotate: 0 },
                { src: processBrandAfterLayout, alt: "Layer 1", rotate: 20 },
                { src: processBrandKeyTakeaway2, alt: "Layer 2", rotate: 40 },
                { src: processBrandKeyTakeaway3, alt: "Layer 3", rotate: 60 }
            ],
            imageCaption: "By strictly separating the portfolio into 'Commercial' and 'Personal' streams, we didn't just organise images - we aligned the digital product with the business model.\n\nStrategic Nuance: The 'Value Multiplier' effect of negative space is industry-dependent. While essential for luxury positioning, density remains a valid strategy for volume-based retail (e.g., marketplaces)."
        },
        wanderingContent: {
            challengeImage: brandChallengeAni,
            impact: {
                description: "From Static Repository to Scalable Sales Product. The primary objective was to operationalise the client's digital presence, replacing a passive archive with a commercial engine.",
                outcomes: [
                    { title: "Asset Discoverability", desc: "New system restructures taxonomy." },
                    { title: "Lean Sales Tool", desc: "Self-serve CMS filters high-value clients." },
                    { title: "Revenue Focus", desc: "Commercial logic converts traffic to revenue." }
                ]
            },
            challenge: "Information Architecture (IA) Failure. The core business risk was Audience Mismatch.\n\nA Brand looking for Fashion editorials viewed the site as \"too rugged.\"\n\nBy housing these contradictions in a single stream, the portfolio was neutralising its own impact. The technical challenge was to engineer a system that supports high-fidelity imagery (Retina/4K) without compromising the \"instant\" load feel required for mobile retention.",
            role: "Strategic Segmentation & CMS Architecture.\n\nTimeline: 4 Weeks Sprint (3 Weeks Discovery/Design + 1 Week Integration).\n\nThe Consultation: I challenged the client's initial request for high-density grids. Through iterative ideation, I demonstrated that for high-value art, negative space is a 'Value Multiplier,' not empty space. 'More' does not equal 'Better.'\n\nThe Handover: I didn't just deliver a design; I mapped the architecture directly into Contentful CMS. I defined rigid dynamic zones, ensuring the business owner could autonomously scale the portfolio without compromising the visual integrity.",
            roleImage: brandCms,
            process: {
                type: 'rich',
                sections: [
                    {
                        type: 'text',
                        content: 'The "Utility" Interface: The design language is strictly functional. I removed all decorative borders and shadows. The typography is utilitarian, serving only to label the work. This "Zero-UI" approach ensures that 100% of the viewer\'s cognitive load is spent processing the photography, not the interface.'
                    },
                    {
                        type: 'comparison',
                        bg: '#1A1A1A',
                        items: [
                            {
                                title: 'Before: The Obstacle',
                                desc: 'The previous architecture was a passive "dumping ground" with disparate categories mixed, creating a confused brand signal.',
                                img: brandFlowChartBeforeInDepth
                            },
                            {
                                title: 'After: The Strategy',
                                desc: 'The Navigation Strategy: We removed the traditional "Home" landing page in favour of immediate directory access. The navigation is persistent and minimal.',
                                img: brandFlowChartAfterInDepth
                            }
                        ]
                    },
                    {
                        type: 'comparison',
                        bg: '#1A1A1A',
                        items: [
                            {
                                title: 'Before: High Density Request',
                                desc: "The client initially pushed for high-density grids, believing that showing more work would lead to more bookings. They equated 'More' with 'Better'.",
                                img: processBrandBeforeLayout
                            },
                            {
                                title: 'After: The "Value Multiplier"',
                                desc: "Through iterative ideation, I demonstrated that for high-value art, negative space is a 'Value Multiplier.' We moved to a layout where white space actively frames the work.",
                                img: processBrandAfterLayout
                            }
                        ]
                    }
                ]
            },
            refinement: {
                outcomesTitle: "Key Takeaway",
                outcomes: [
                    { title: "Simplification", desc: "The need to use the simplest words to define." },
                    { title: "Clarity", desc: "User doesn't guess or think twice." },
                    { title: "Trust", desc: "Crucial for business-client relationships." }
                ],
                description: "I also discovered the importance of explicit trust signals, such as displaying an ABN number. These details validiate the business's legitimacy and remove doubt.\n\nMy key takeaway from this project is the importance of simplification. The need to use the simplest words to define - so the user don't have to guess or think twice. This builds trust - the crucial part for the business-client relationship."
            }
        },
        images: [
            projectBrandScalingHero,
            brandChallengeV2,
            brandFlowChartAfterImpact,
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
        desc: "Optimising complex data tables for mobile viewports without losing fidelity.",
        tags: ["Mobile First", "UX Research", "Figma"],
        challenge: "Environmental Mismatch. The legacy mobile interface was not optimised for the physical constraints of the checkout line. Critical payment assets (Digital Card, Barcode) were buried below the fold, forcing users to \"thumb-scroll\" while under pressure at the register. This created measurable friction and delay at the point of revenue capture.",
        role: "Mobile Strategy & Heuristic Audit. Lead UX Designer responsible for auditing the \"In-Store\" user journey and restructuring the mobile Information Architecture (IA) to support \"On-the-Go\" utility.",
        process: {
            type: 'rich',
            sections: [
                {
                    type: 'text',
                    content: "Architecture Inversion.\n\nThe Pivot: Migrated from a list-based hierarchy to a \"Header-First\" utility model.\n\nThe Execution: Pulled the Digital Card out of the content stream and pinned it to the top viewport.\n\nThe Result: Transformed the user flow from a \"Hunt\" (Login > Scroll > Find > Tap) to a \"Reflex\" (Login > Tap).",
                    video: b2bAnimationProcessNoBg
                }
            ]
        },
        impact: {
            description: "Retention through Friction Reduction. Minor conveniences make a huge impact on how people feel in a stressful environment. The ability of a business to address these anxieties creates retention and puts the business in a growth position.",
            outcomes: [
                { title: "Retention Strategy", desc: "Loyal customers spread the word and buy more." },
                { title: "Growth Position", desc: "Less manual tax, more focus on trade." },
                { title: "Operational Efficiency", desc: "Faster PoS processing cuts queue times." }
            ]
        },
        keyTakeaway: {
            title: "Key Takeaway",
            description: "This project taught me that the best design solutions often come from living the problem yourself. As both a designer and a small business owner juggling family shopping and work purchases, I felt the stress of fumbling through apps while a queue formed behind me.\n\nPresenting this redesign to the Customer Experience (CX) team wasn't just about showcasing better UI - it was about demonstrating how removing small frictions creates real retention value. The validation I received showed me that micro-optimisations aren't just 'nice to have' features. They're strategic tools that help businesses keep customers loyal and coming back.",
            outcomes: [
                { title: "Validation", desc: "Recognised by the CX team for strategic alignment." },
                { title: "Benchmark", desc: "Serves as a model for user-led design in retail." },
                { title: "Performance", desc: "Proves micro-optimisations drive retention." }
            ]
        },
        wanderingContent: {
            challenge: "The 'Weekend Project' & The Anxiety of the Checkout.\n\nAs a business owner myself, coming to the store with family was a stressful experience. With separate shopping lists in both hands, I felt anxious - what if I forget something important? What if they ran out of ink?\n\nSo every time I approach the cashier, I split the items: 'House needs' vs 'Business needs'. Then the cashier asks: 'How would you like to pay?'\n\n- 'This goes first (business)... give me a second...'\n\nI run through my phone to find the site, find the business card... meanwhile kids are adding snacks... 'Sorry, I need to find the card... put it back darling... yes they are cute but we don't need erasers now.'\n\nIt's a high-stress environment where digital friction becomes personal embarrassment.",
            role: "Proactive Problem Solving.\n\nI discovered the app only by working there. I realised I’m not the only one unwilling to download an app for every store. I sat down and thought: what if I take over this specific account page logic and bring the card and all important info 'Above the Fold'?",
            process: {
                type: 'rich',
                sections: [
                    {
                        type: 'text',
                        content: 'The Solution: Priority Architecture.\n\nEverything crucial had to be immediately accessible. I reorganised the hierarchy so the account profile and digital card sat side-by-side above the fold, with the thirty-day credit limit and tracking details flowing naturally underneath. This ensured no digging and no searching while people waited behind in the queue.'
                    }
                ]
            },
            refinement: {
                description: "This project taught me that living the problem yourself creates insights that no amount of user research can replace.\n\nAs both a UX designer and a small business owner, I experienced the exact pain point I was designing for. Standing at checkout with family shopping and work purchases separated, fumbling through apps while a queue forms behind you, kids adding items - that moment of stress and embarrassment became my design brief.\n\nThe insight wasn't just 'move the card higher.' It was understanding that mobile apps in retail aren't used in calm, focused environments. They're used in chaos. The 'Above the Fold' solution was born from that lived experience.\n\nPresenting this to the Customer Experience team wasn't just about showcasing better UI. It was about demonstrating how removing small frictions in high-stress moments creates profound retention value. The validation showed me that micro-optimisations aren't 'nice to have' - they're strategic tools that businesses use to build loyalty.\n\nThis project serves as a benchmark for how empathy-driven, user-led design can address systemic frictions and drive commercial performance. While implementation requires long-term scheduling within the digital roadmap, it proves that even small UX improvements can have measurable business impact when they target the right moments of friction.",
                outcomesTitle: "Key Takeaway",
                outcomes: [
                    { title: "Lived Experience Design", desc: "Best solutions from experiencing problems." },
                    { title: "Strategic Validation", desc: "CX proved micro-optimisations drive strategy." },
                    { title: "Commercial Impact", desc: "Small frictions = big loyalty impact." }
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
