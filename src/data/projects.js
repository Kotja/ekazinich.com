import projectBooking from '../assets/project-booking-hero.webp';
import projectBookingChallenge from '../assets/studio-booking-challenge.webp';

import projectBookingProcess from '../assets/booking-process-new.webp';
import projectBookingFlow from '../assets/studio-booking-flow.webp';
import brandCms from '../assets/brand-cms.webp';
import brandFlowChartBefore from '../assets/brand-flow-chart-before.webp';
import brandFlowChartAfter from '../assets/brand-flow-chart-after.webp';
import projectB2B from '../assets/project-b2b-hero.webp';
import projectB2BNew from '../assets/b2b-hero-v2.webp';
import brandChallengeV2 from '../assets/brand-challenge-v2.webp';
import projectB2BChallengeNew from '../assets/b2b-challenge-new.webp';
import projectB2BProcessNew from '../assets/b2b-flow-audit.svg';
import OWChallengeHeatmap from '../assets/OW-challenge-heatmap.webp';
import projectB2BChallenge from '../assets/b2b-challenge.webp';
import projectB2BProcess from '../assets/b2b-process.webp';
import projectCollector from '../assets/project-collector-hero.webp';
import projectCollectorChallenge from '../assets/platform-challenge.webp';
import projectCollectorProcess from '../assets/direct_to_collector_process_new.webp';
import projectPortfolio from '../assets/project-portfolio-hero.webp';
import projectPortfolioChallenge from '../assets/portfolio-challenge.webp';
import projectPortfolioProcess from '../assets/portfolio-process.webp';
import projectBrandScalingHero from '../assets/brand-scaling-hero.webp';
import projectServiceAutomationHero from '../assets/service-automation-hero-new.webp';
import automationHero from '../assets/automation-hero.webp';
import decisionNode from '../assets/decision-node.png';
import reviewAndSign from '../assets/review-and-sign.webp';
import serviceBlueprint from '../assets/service-blue-print.webp';
import brandTrustSignals from '../assets/brand-trust-signals.webp';

import projectB2BVideo from '../assets/HeroB2BOW.mp4';
import projectCandidateVideo from '../assets/hero-candidate-pipeline.mp4';
import candidateProcessIndepth from '../assets/Canidate-pipeline-process-indepth.webp';
import candidateChallenge from '../assets/candidate-challenge.webp';
import candidateOnTheGo from '../assets/candidate-on-the-go.webp';

export const PROJECTS = [
    {
        id: 3,
        title: "Brand Scaling & Client Acquisition Platform",
        desc: "A user-centric overhaul of a photographer's portfolio to recapture lost business through improved UX and mobile responsiveness.",
        tags: ["UX/UI Design", "Mobile First", "CMS Integration"],
        challenge: "The Problem: Categorical Ambiguity. The previous digital presence failed to distinguish between the photographer's disparate disciplines. \"Action\" sports work was diluted by \"Fashion\" editorials, creating a confused brand signal that hindered specialist bookings.",
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
        wanderingContent: {
            impact: {
                description: "From Static Repository to Scalable Sales Product. The primary objective was to operationalise the client's digital presence, replacing a passive archive with a commercial engine.",
                outcomes: [
                    { title: "Asset Discoverability", desc: "I engineered a new system focused on restructuring the taxonomy." },
                    { title: "Lean Sales Tool", desc: "By implementing a self-serve CMS, we turned the website from a cost-centre into a conversion engine that filters High-Value Clients directly to the right specialist category." },
                    { title: "Revenue Focus", desc: "Replaced the 'dumping ground' approach with commercial logic to actively convert traffic into revenue." }
                ]
            },
            challenge: "Information Architecture (IA) Failure. The core business risk was Audience Mismatch.\n\nAn Agency looking for high-speed Action photography viewed the site as \"too static.\"\n\nA Brand looking for Fashion editorials viewed the site as \"too rugged.\"\n\nBy housing these contradictions in a single stream, the portfolio was neutralising its own impact. The technical challenge was to engineer a system that supports high-fidelity imagery (Retina/4K) without compromising the \"instant\" load feel required for mobile retention.",
            role: "Strategic Segmentation. My role was to enforce the \"Commercial Split.\"\n\nThe Audit: I analysed the client's body of work and defined the four-pillar taxonomy: Portraits, Action, Fashion, Project.\n\nThe Logic: \"Project\" was isolated to house personal/experimental work, ensuring it didn't pollute the commercial conversion funnels of the other three categories.\n\nThe Ops: I designed the backend schema to mirror this structure, ensuring the client cannot accidentally break the design system when uploading new assets.",
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
                        bg: 'transparent',
                        items: [
                            {
                                title: 'Before: The Obstacle',
                                desc: 'The previous architecture was a passive "dumping ground" with disparate categories mixed, creating a confused brand signal.',
                                img: brandFlowChartBefore
                            },
                            {
                                title: 'After: The Strategy',
                                desc: 'The Navigation Strategy: We removed the traditional "Home" landing page in favour of immediate directory access. The navigation is persistent and minimal.',
                                img: brandFlowChartAfter
                            }
                        ]
                    }
                ]
            },
            refinement: "Trust Signals: We brought business details (ABN, Contact) to the forefront of the footer hierarchy, subtly reinforcing that this is a commercial entity, not a hobbyist blog."
        },
        images: [
            projectBrandScalingHero,
            brandChallengeV2,
            brandFlowChartAfter,
            brandTrustSignals
        ]
    },
    {
        id: 4,
        title: "Candidate Pipeline & Application Architecture",
        desc: "A streamlined platform for managing candidate applications and architectural workflows. (Placeholder)",
        tags: ["Architecture", "Pipeline", "Management"],
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
                description: "Defining the Unmet Need. The hypothesis was that candidates needed a better way to find roles, but data disproved this.\n\nThe real problem was \"Application Amnesia\"—users apply to so many roles across disparate platforms that they lose track of follow-ups.",
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
        desc: "Optimizing complex data tables for mobile viewports without losing fidelity.",
        tags: ["Mobile First", "Data Viz", "Figma"],
        challenge: "Environmental Mismatch. The legacy mobile interface was not optimised for the physical constraints of the checkout line. Critical payment assets (Digital Card, Barcode) were buried below the fold, forcing users to \"thumb-scroll\" while under pressure at the register. This created measurable friction and delay at the point of revenue capture.",
        role: "Mobile Strategy & Heuristic Audit. Lead UX Designer responsible for auditing the \"In-Store\" user journey and restructuring the mobile Information Architecture (IA) to support \"On-the-Go\" utility.",
        process: "Architecture Inversion.\n\nThe Pivot: Migrated from a list-based hierarchy to a \"Header-First\" utility model.\n\nThe Execution: Pulled the Digital Card out of the content stream and pinned it to the top viewport.\n\nThe Result: Transformed the user flow from a \"Hunt\" (Login > Scroll > Find > Tap) to a \"Reflex\" (Login > Tap).",
        impact: {
            description: "Eliminating POS Latency. Transformed the dashboard into a \"Zero-Scroll\" Utility Interface. By prioritizing high-frequency data and elevating the digital payment card, we reduced time-to-pay by ~8 seconds per transaction.",
            outcomes: [
                { title: "Transaction Velocity", desc: "Reduced queue friction for trade customers." },
                { title: "Staff Efficiency", desc: "Faster processing at the Point of Sale (POS), reducing checkout congestion during peak trade hours." }
            ]
        },
        wanderingContent: {
            process: "Execution Logic: The \"Digital Wallet\" Mental Model.\n\n1. Designing for Reflex: The goal was to eliminate cognitive load. In a high-pressure environment (the queue), users shouldn't have to think. I redesigned the header to function like a physical wallet—when you open it, the card is right there.\n\n2. The Two-Step Action: I streamlined the interaction cost down to the absolute minimum: Log In → Scan.\n\n3. Data Visibility: By placing the Account ID and Credit Limit immediately in the viewport, we provided \"Confidence Signals.\" The user knows instantly before they reach the counter if they have enough credit, preventing embarrassed declines and further speeding up the workflow.",
            role: "Auditing the Physical Environment. My role extended beyond the screen. I analysed the Situational Context of the transaction.\nThe Audit: I identified that the \"Information Hierarchy\" was inverted—low-value data (recent orders) was pushing high-value data (payment card) off the screen.\nThe Strategy: I championed a \"Zero-Scroll\" Philosophy. I established a design rule that no transactional asset (Barcode, Credit Limit, Account ID) should ever require a swipe gesture to access.",
            challenge: "Diagnosing the \"Checkout Gap\". B2B customers rely on 30-day credit accounts to separate business purchasing from personal expenses. This is a utility-driven behavior.\n\nHowever, the existing mobile architecture failed the \"One-Handed Heuristic.\" Traders on a job site or in a store often have only one hand free. The requirement to scroll and navigate through a dense list to find their Account ID or Barcode created a \"Friction Trap.\" The anxiety of holding up the queue caused users to fumble, damaging the perceived efficiency of the B2B service. The challenge was to respect the user's time by making the payment credential instantly accessible.",
            impact: {
                description: "Contextual Optimisation: From \"Browsing\" to \"Transacting\". The previous mobile layout treated the user as a \"Browser\" (someone sitting and reading), whereas the actual user was a \"Trader\" (someone standing in a queue, holding supplies, needing to pay instantly).",
                outcomes: [
                    { title: "The Digital Wallet", desc: "By inverting the hierarchy and treating the mobile view as a Digital Wallet rather than a website, I removed the cognitive load of \"searching\" for payment details." },
                    { title: "Operational Throughput", desc: "This seemingly small UI shift had a compound effect on operational throughput at the checkout counter." }
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
