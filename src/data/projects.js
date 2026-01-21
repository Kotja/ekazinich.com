
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
import projectB2BProcessNew from '../assets/b2b-flow-audit.svg';
import OWChallengeHeatmap from '../assets/OW-challenge-heatmap.webp';
import projectBrandScalingHero from '../assets/brand-scaling-hero.webp';
import automationHero from '../assets/automation-hero.webp';
import decisionNode from '../assets/decision-node.png';
import reviewAndSign from '../assets/review-and-sign.webp';
import serviceBlueprint from '../assets/service-blue-print.webp';

import projectB2BVideo from '../assets/HeroB2BOW.mp4';
import projectCandidateVideo from '../assets/hero-candidate-pipeline.mp4';
import candidateProcessIndepth from '../assets/Canidate-pipeline-process-indepth.webp';
import candidateChallenge from '../assets/candidate-challenge.webp';
import candidateOnTheGo from '../assets/candidate-on-the-go.webp';
import b2bGreetingVar3 from '../assets/main-body-b2b-greeting-page-var3.webp';
import b2bGreetingVar4 from '../assets/main-body-b2b-greeting-page-var4.webp';
import b2bGreetingVar8 from '../assets/main-body-b2b-greeting-page-var8-fin.webp';

export const PROJECTS = [
    {
        id: 3,
        title: "Brand Scaling & Client Acquisition Platform",
        desc: "A user-centric overhaul of a photographer's portfolio to recapture lost business through improved UX and mobile responsiveness.",
        tags: ["UX/UI Design", "Mobile First", "CMS Integration"],
        challenge: "Categorical Ambiguity. The previous digital presence failed to distinguish between the photographer's disparate disciplines. High-energy \"Action\" shots of music performances were diluted by \"Fashion\" editorials, creating a confused brand signal that hindered specialist bookings.",
        challengeImage: brandChallengeImpact,
        role: "End-to-End Product Architecture. Responsible for the strategic taxonomy audit, UI system design, and CMS integration.",
        process: "Systemisation & \"Invisible\" UI.\n\nIA Strategy: Flattened the hierarchy. Users land directly on the category selector, eliminating the \"Mystery Meat\" navigation of the previous site.\n\nVisuals: Adopted a brutalist, utility-first aesthetic. White space is used as an active element to frame the work.\n\nTech: Implemented a high-performance lazy-loading stack to ensure the \"Action\" portfolio loads as fast as the \"Portraits,\" despite the heavy data payload.",
        impact: {
            description: "Taxonomy Migration & Funnel Optimisation. Transformed a generalist photography archive into a targeted B2B sales tool.",
            outcomes: [
                { title: "Zero-Friction Inquiry", desc: "Users are never more than 2 clicks from booking." },
                { title: "Operational Autonomy", desc: "Client manages all assets via a custom CMS, removing developer dependency." },
                { title: "Funnel Optimisation", desc: "Reduced the user journey from \"Landing\" to \"Contact\" by roughly 60% via Category-First Architecture." }
            ]
        },
        keyTakeaway: {
            title: "Key Takeaway",
            description: "I also discovered the importance of explicit trust signals, such as displaying an ABN number. These details validiate the business's legitimacy and remove doubt.\n\nMy key takeaway from this project is the importance of simplification. The need to use the simplest words to define - so the user don't have to guess or think twice. This builds trust - the crucial part for the business-client relationship.",
            outcomes: [
                { title: "Simplification", desc: "The need to use the simplest words to define." },
                { title: "Clarity", desc: "Ensuring the user doesn't have to guess or think twice." },
                { title: "Trust", desc: "The crucial part for the business-client relationship." }
            ],
            image: processBrandKeyTakeaway1,
            stackedImages: [
                { src: processBrandKeyTakeaway1, alt: "Primary View", rotate: 0 },
                { src: processBrandAfterLayout, alt: "Layer 1", rotate: 20 },
                { src: processBrandKeyTakeaway2, alt: "Layer 2", rotate: 40 },
                { src: processBrandKeyTakeaway3, alt: "Layer 3", rotate: 60 }
            ],
            imageCaption: "By strictly separating the portfolio into 'Commercial' and 'Personal' streams, we didn't just organise images — we aligned the digital product with the business model.\n\nStrategic Nuance: The 'Value Multiplier' effect of negative space is industry-dependent. While essential for luxury positioning, density remains a valid strategy for volume-based retail (e.g., marketplaces)."
        },
        wanderingContent: {
            challengeImage: brandChallengeInDepth,
            impact: {
                description: "From Static Repository to Scalable Sales Product. The primary objective was to operationalise the client's digital presence, replacing a passive archive with a commercial engine.",
                outcomes: [
                    { title: "Asset Discoverability", desc: "I engineered a new system focused on restructuring the taxonomy." },
                    { title: "Lean Sales Tool", desc: "By implementing a self-serve CMS, we turned the website from a cost-centre into a conversion engine that filters High-Value Clients directly to the right specialist category." },
                    { title: "Revenue Focus", desc: "Replaced the 'dumping ground' approach with commercial logic to actively convert traffic into revenue." }
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
                    { title: "Clarity", desc: "Ensuring the user doesn't have to guess or think twice." },
                    { title: "Trust", desc: "The crucial part for the business-client relationship." }
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
                { title: "The Insight", desc: "Research revealed that the core friction isn't \"finding\" jobs, but \"managing the emotional data\" of the process." },
                { title: "The Strategy", desc: "Shifted product focus from \"Aggregation\" (finding jobs) to \"Management\" (tracking status)." },
                { title: "The Validation", desc: "Identified 3 critical \"Drop-off Points\" where users abandon the process due to anxiety." }
            ]
        },
        keyTakeaway: {
            title: "Key Takeaway",
            description: "The shift from 'Finding Jobs' to 'Managing Anxiety' proved that utility drives retention better than novelty. Addressing the emotional state of the user created a stickier product.",
            outcomes: [
                { title: "Mental Model", desc: "Aligned the tool with the user's actual status." },
                { title: "Retention", desc: "Users stay for the utility, not just the job listings." },
                { title: "Trust", desc: "Transparency and feedback loops build long-term confidence." }
            ]
        },
        wanderingContent: {
            challenge: "The \"Spreadsheet of Doom\" Phenomenon. Qualitative research exposed a universal pain point: the \"Manual Tax.\"\n\nCognitive Overload: Users reported high anxiety when asked, \"Where did you apply last week?\" because the data was scattered.\n\nThe Feedback Void: The lack of status updates from companies creates an \"Open Loop\" in the user's mind. Existing tools don't close this loop; they just list it. The challenge was to design a system that captures this data automatically or with zero friction, acknowledging that unemployed users have low motivation for data entry.",
            role: "From Ambiguity to Architecture. My role was to bring structure to a chaotic problem space.\n\nDiscovery: I didn't start with UI. I started with Mental Models. I conducted diary studies to map the emotional highs and lows of a 3-month job search.\n\nSynthesis: I translated raw qualitative data into actionable \"How Might We\" statements that formed the backlog for the design phase.",
            process: {
                type: 'rich',
                sections: [
                    {
                        type: 'text',
                        content: 'The Pivot: Designing for Low Motivation. Early concepts assumed users would want detailed analytics. The research proved this wrong. Users wanted "Minimal Viable Effort."\n\nKey Research Artifact: The Emotional Journey Map. We mapped the user\'s mood against the application timeline. We found that motivation crashes 2 weeks after applying if no response is received. The Design Decision: The interface must not just track applications; it must nudge users during these "Crash Points" with low-effort actions (e.g., "One-tap follow-up email generator"). This insight moved the product from a passive tracker to an active coach.',
                        image: candidateProcessIndepth
                    }
                ]
            },
            impact: {
                outcomesTitle: "Key Discoveries",
                description: "Defining the Unmet Need. The hypothesis was that candidates needed a better way to find roles, but data disproved this.\n\nThe real problem was \"Application Amnesia\" — users apply to so many roles across disparate platforms that they lose track of follow-ups.",
                outcomes: [
                    { title: "The Pivot", desc: "Research shifted the product vision from a generic 'Job Board' to a \"Personal CRM for Careers\"." },
                    { title: "The Crash Point", desc: "Motivation crashes 2 weeks after applying if no response is received. The system must intervene here." },
                    { title: "Active Coaching", desc: "Moved from passive tracking to active nudging (e.g., 'Follow-up Generators') to close the feedback loop." }
                ]
            }
        },
        images: [candidateOnTheGo, candidateChallenge, candidateOnTheGo],
        video: projectCandidateVideo,
    },
    {
        id: 1,
        title: "Optimising B2B Workflow & Retention",
        desc: "Optimising complex data tables for mobile viewports without losing fidelity.",
        tags: ["Mobile First", "Data Viz", "Figma"],
        challenge: "Environmental Mismatch. The legacy mobile interface was not optimised for the physical constraints of the checkout line. Critical payment assets (Digital Card, Barcode) were buried below the fold, forcing users to \"thumb-scroll\" while under pressure at the register. This created measurable friction and delay at the point of revenue capture.",
        role: "Mobile Strategy & Heuristic Audit. Lead UX Designer responsible for auditing the \"In-Store\" user journey and restructuring the mobile Information Architecture (IA) to support \"On-the-Go\" utility.",
        process: {
            type: 'rich',
            sections: [
                {
                    type: 'text',
                    content: "Architecture Inversion.\n\nThe Pivot: Migrated from a list-based hierarchy to a \"Header-First\" utility model.\n\nThe Execution: Pulled the Digital Card out of the content stream and pinned it to the top viewport.\n\nThe Result: Transformed the user flow from a \"Hunt\" (Login > Scroll > Find > Tap) to a \"Reflex\" (Login > Tap).",
                    image: projectB2BProcessNew
                }
            ]
        },
        impact: {
            description: "Retention through Friction Reduction. Minor conveniences make a huge impact on how people feel in a stressful environment. The ability of a business to address these anxieties creates retention and puts the business in a growth position.",
            outcomes: [
                { title: "Retention Strategy", desc: "Loyal customers spread the word as well as bringing money in." },
                { title: "Growth Position", desc: "Removing 'Manual Tax' allows business owners to focus on trade, not admin." },
                { title: "Operational Efficiency", desc: "Faster processing at the Point of Sale reducs checkout congestion." }
            ]
        },
        keyTakeaway: {
            title: "Key Takeaway",
            description: "Presenting this project to the Customer Experience (CX) team served as a cross-functional validation of the methodology. Use frictionless design to solve business problems.",
            outcomes: [
                { title: "Validation", desc: "Recognised by the CX team for strategic alignment." },
                { title: "Benchmark", desc: "Serves as a model for user-led design in retail." },
                { title: "Performance", desc: "Proves micro-optimisations drive retention." }
            ]
        },
        wanderingContent: {
            challenge: "The 'Weekend Project' & The Anxiety of the Checkout.\n\nAs a business owner myself, coming to the store with family was a stressful experience. With separate shopping lists in both hands, I felt anxious—what if I forget something important? What if they ran out of ink?\n\nSo every time I approach the cashier, I split the items: 'House needs' vs 'Business needs'. Then the cashier asks: 'How would you like to pay?'\n\n- 'This goes first (business)... give me a second...'\n\nI run through my phone to find the site, find the business card... meanwhile kids are adding snacks... 'Sorry, I need to find the card... put it back darling... yes they are cute but we don't need erasers now.'\n\nIt’s a high-stress environment where digital friction becomes personal embarrassment.",
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
                description: "Presenting this project to the Customer Experience (CX) team served as a cross-functional validation of the methodology. The design was recognised not just for its execution, but for its strategic alignment with the broader CX vision.\n\nWhile implementation within the digital roadmap requires long-term scheduling, the project now serves as a benchmark for how user-led design can address systemic frictions. It demonstrates that micro-optimisations are not merely \"nice-to-haves\" but are critical drivers of commercial performance and user retention.",
                outcomesTitle: "Key Takeaway",
                outcomes: [
                    { title: "Cross-Functional Validation", desc: "Recognised by the CX team for strategic alignment with the broader vision." },
                    { title: "Strategic Benchmark", desc: "Serves as a model for how user-led design addresses systemic frictions." },
                    { title: "Commercial Driver", desc: "Proves micro-optimisations are critical drivers of performance and retention." }
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
                { title: "The Shift", desc: "We replaced a high-touch \"Phone Tag\" model with a \"Tentative Contract\" System, allowing users to book and agree to terms digitally without staff intervention." },
                { title: "Risk Reduction", desc: "The digital agreement model cut payment disputes by 90%." },
                { title: "Growth Signal", desc: "The frictionless flow drove a 36% revenue increase and reduced bounce rates by 28%." }
            ]
        },
        keyTakeaway: {
            title: "Key Takeaway",
            description: "Automating the 'Trust Contract' removed the manual bottleneck, allowing the business to scale without increasing headcount.",
            outcomes: [
                { title: "Scalability", desc: "Revenue decoupled from owner's time." },
                { title: "Efficiency", desc: "Eliminated 90% of admin hours." },
                { title: "Clarity", desc: "Digital terms eliminated payment disputes." }
            ]
        },
        wanderingContent: {
            challenge: "Diagnosing the \"Admin Loop.\" The issue wasn't just usability; it was an Operational Bottleneck.\n\nThe Friction Trap: Potential customers abandoned the site because the interaction cost (making a phone call) was too high compared to competitors.\n\nThe Dispute Cycle: The lack of a structured digital agreement meant terms were verbal and ambiguous, leading to hours spent resolving payment misunderstandings. The manual burden was consuming the client's actual teaching time.",
            challengeImage: serviceBlueprint,
            role: "Mapping the \"Zero-Touch\" Blueprint. My strategy focused on Service Blueprinting—identifying every point where a human had to intervene (emailing, calling, confirming) and designing a digital proxy to handle it. I didn't just design the interface; I engineered the business logic to automate the \"Trust and Transaction\" simultaneously.",
            process: {
                type: 'rich',
                sections: [
                    {
                        type: 'text',
                        content: 'Refining the Booking Logic (The Decision Node).\n\n1. The "Tentative" Protocol: I prototyped a flow where the contract isn\'t just a checkbox, but a confirmation step. This required users to agree to terms digitally before a booking is confirmed, creating a psychological commitment that reduced no-shows.\n\n2. The Integration of "Trials": Early iterations treated "Class Trials" as a separate product, which fragmented the user journey. I corrected this by integrating the choice as a Decision Node within the main class flow. This allows users to verify that a specific class fits their schedule before deciding on their level of commitment (Trial vs. Term), resulting in a more intuitive, flexible funnel.',
                        image: decisionNode
                    }
                ]
            },
            impact: {
                description: "We digitized trust via a \"Tentative Contract\" Model. By moving the \"Trial vs. Term\" decision node inside the main flow, we respected the user's need to verify schedules before committing.",
                outcomes: [
                    { title: "Risk Reduction", desc: "The digital agreement model cut payment disputes by 90%." },
                    { title: "Growth Signal", desc: "The frictionless flow drove a 36% revenue increase and reduced bounce rates by 28%." },
                    { title: "Unit Economics", desc: "Eliminated the \"Admin Tax,\" freeing the client to focus on teaching rather than chasing invoices." }
                ]
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
