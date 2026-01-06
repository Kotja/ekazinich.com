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
import brandTrustSignals from '../assets/brand-trust-signals.webp';

import projectB2BVideo from '../assets/HeroB2BOW.mp4';

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
            description: "Taxonomy Migration & Funnel Optimisation. Transformed a generalist photography archive into a targeted B2B sales tool. By implementing a strict Category-First Architecture (Portraits, Action, Fashion), we reduced the user journey from \"Landing\" to \"Contact\" by roughly 60%.",
            outcomes: [
                { title: "Zero-Friction Inquiry", desc: "Users are never more than 2 clicks from booking." },
                { title: "Operational Autonomy", desc: "Client manages all assets via a custom CMS, removing developer dependency." }
            ]
        },
        wanderingContent: {
            impact: {
                description: "From Static Repository to Scalable Sales Product. The primary objective was to operationalise the client's digital presence. The previous site was a passive \"dumping ground\" that failed to convert traffic into revenue because it lacked commercial logic.",
                outcomes: [
                    { title: "Asset Discoverability", desc: "I engineered a new system focused on restructuring the taxonomy." },
                    { title: "Lean Sales Tool", desc: "By implementing a self-serve CMS, we turned the website from a cost-centre into a conversion engine that filters High-Value Clients directly to the right specialist category." }
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
        id: 0,
        title: "Service Automation: Zero-Touch Model",
        desc: "A streamlined SaaS solution reducing admin time by 40% for creative studios.",
        tags: ["Service Design", "Product Strategy", "UX/UI"],
        challenge: "Before the redesign, the client was trapped in an administrative loop. The website functioned like a blog, burying class details and forcing every single booking into a manual phone call.\n\nThis wasn't just a usability issue; it was an operational bottleneck. The lack of a structured digital agreement meant the client spent hours chasing payments and resolving misunderstandings. The manual burden was so high that it was consuming time meant for teaching, while the high-friction process caused potential customers to abandon the site before they even picked up the phone.",
        role: "As the Lead Product Designer, I drove the end-to-end transformation from a manual service to an automated product. My strategy focused on identifying and eliminating every administrative touchpoint.",
        process: "During discovery, I identified that the \"phone-tag\" booking method was the root cause of both user drop-off and the client's payment disputes. I used Figma to prototype a new flow centred on a 'tentative contract' model. This feature required users to agree to terms and availability digitally before the booking was confirmed.\n\nI restructured the site’s architecture to make information instantly accessible, removing the need for \"inquiry\" emails. By mapping the user journey specifically to remove manual intervention, I delivered a solution that automated the trust and transaction process simultaneously.",
        impact: "Achieving a \"zero-admin\" state, we slashed workload by 40% in month one. The 'tentative contract' model cut disputes by 90%, while the frictionless flow drove a 36% revenue increase and 28% lower bounce rate. The system finally works for the client.",
        images: [
            projectServiceAutomationHero,
            projectBookingChallenge,
            projectBookingProcess,
            projectBookingFlow
        ],
        refinement: "Refining the Booking Logic: Early iterations of this flow treated 'Class Trials' as a separate product, creating a disjointed experience. In this final architecture, I integrated the 'Trial vs. Term' choice as a decision node within the main class flow. This allows users to verify that a specific class fits their schedule before deciding on their level of commitment, resulting in a more intuitive and flexible path to purchase."
    },
    {
        id: 1,
        title: "Optimising B2B Workflow & Retention",
        desc: "Optimizing complex data tables for mobile viewports without losing fidelity.",
        tags: ["Mobile First", "Data Viz", "Figma"],
        challenge: "The problem wasn't technical; it was situational. B2B customers rely on their 30-day credit accounts to streamline expense tracking and keep business purchasing separate from personal shopping. However, the mobile interface wasn't optimised for the checkout line. Customers were forced to thumb-scroll through the page just to locate their digital card, creating awkward, time-consuming delays at the point of sale when they just needed to pay and get back to the job site.",
        role: "I led the UX redesign with a specific focus on \"on-the-go\" utility. My role involved auditing the existing information hierarchy and realigning it with the physical reality of the user's environment. I championed a \"Zero-Scroll\" philosophy, ensuring that no B2B customer would ever need to swipe to find the data required to complete a transaction.",
        process: "The goal was to turn a search into a reflex. The old layout asked users to dig, but I decided they shouldn't even have to scroll. I completely inverted the architecture, pulling the Digital Card out of the list and placing it permanently in the top header. This shift transformed the in-store experience from a clumsy hunt to a simple two-step action: Log in and tap. Now, the Account ID and credit limit are immediately visible, and the barcode is just one tap away, treating the interface like a digital wallet rather than a browsing menu.",
        impact: "The redesign eliminated checkout lag by providing immediate, aboveS-the-fold access to account data. This significantly reduced transaction times, creating a smoother, faster interaction for both clients and staff.",
        images: [projectB2BNew, projectB2BChallengeNew, projectB2BProcessNew],
        video: projectB2BVideo,
    },
    {
        id: 2,
        title: "DTC Transformation & Immersive Commerce",
        desc: "Created the brand identity and designed the full digital platform for the artist to exhibit and sell her work independently. The site enabled her to reach collectors directly and retain earnings that would otherwise be lost to nearly 50% gallery commission fees.",
        tags: ["Web Design", "E-commerce", "Strategy"],
        challenge: "The primary challenge was twofold: solving both a critical business problem and a core user problem. For the artist, the challenge was overcoming the traditional gallery model that claimed 40-50% of her revenue and severed her connection to collectors. For the user, the challenge was the \"context barrier\"; art collectors were highly hesitant to purchase expensive pieces online because they couldn't accurately judge a work's scale, texture, or how it would look in their own home, a problem a physical gallery naturally solves.",
        role: "As the Lead UX/UI Designer and Brand Strategist, I was responsible for the entire end-to-end process. My work extended beyond just visual design to include conducting the initial stakeholder and user research, defining the brand identity, and architecting the complete user experience. A key part of my role was designing the complex, multi-step user flow for successful purchases, adding the AR \"View in Room\" feature, taking it from an initial concept to a fully-realised, high-fidelity interactive prototype.",
        process: "I followed a structured design thinking framework to ensure the solution was user-centric and effective. The Discover phase involved deep interviews with the artist and qualitative research with collectors, which identified the \"context barrier\" as the primary purchasing blocker. After Defining this challenge with user personas, I moved to Design, where I developed the full brand identity and high-fidelity UI. A critical part of this phase was the strategic integration of an existing AR tool into the customer journey. I focused on mapping a frictionless user flow that bridged the gap between the bespoke shop interface and the external visualisation technology. Finally, after Delivering a comprehensive design system, the result is a cohesive e-commerce platform. The seamlessly embedded \"View in Room\" feature directly solves the collector's context problem by allowing them to render true-to-scale artwork in their space, while the immersive bio page and secure checkout solidify the trust needed to complete the purchase.",
        impact: "The platform transformed the artist's business model, doubling her profit margins by retaining 100% of sales. The AR 'View in Room' feature directly increased conversion rates, driving $21k in revenue and four major sales in the first three months, proving the D2C model's success.",
        images: [
            projectCollector,
            projectCollectorChallenge,
            projectCollectorProcess
        ]
    }
];
