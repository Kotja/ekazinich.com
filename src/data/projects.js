import projectBooking from '../assets/project-booking-hero.png';
import projectBookingChallenge from '../assets/studio-booking-challenge.png';
import projectBookingProcess from '../assets/studio-booking-process.png';
import projectB2B from '../assets/project-b2b-hero.png';
import projectB2BNew from '../assets/b2b-hero-new.png';
import projectB2BChallengeNew from '../assets/b2b-challenge-new.png';
import projectB2BProcessNew from '../assets/b2b-process-new.png';
import projectB2BChallenge from '../assets/b2b-challenge.png';
import projectB2BProcess from '../assets/b2b-process.png';
import projectCollector from '../assets/project-collector-hero.png';
import projectCollectorChallenge from '../assets/platform-challenge.png';
import projectCollectorProcess from '../assets/platform-process.png';
import projectPortfolio from '../assets/project-portfolio-hero.png';
import projectPortfolioChallenge from '../assets/portfolio-challenge.png';
import projectPortfolioProcess from '../assets/portfolio-process.png';

export const PROJECTS = [
    {
        id: 3,
        title: "Mobile-First Photography Portfolio",
        desc: "A user-centric overhaul of a photographer's portfolio to recapture lost business through improved UX and mobile responsiveness.",
        tags: ["UX/UI Design", "Mobile First", "CMS Integration"],
        challenge: "The client’s existing portfolio was actively hindering their business. A cluttered, disorganised structure made it nearly impossible for potential leads to find relevant work, while a dated, non-responsive design created a lack of trust. This friction meant the photographer was losing opportunities simply because their digital presence couldn't keep up with the quality of their photography.",
        role: "I led the complete UX/UI overhaul, transforming the product from a source of frustration into a primary business tool. I began by auditing and restructuring the information architecture into a logical, category-based hierarchy. Then, I designed a minimalist, \"frame-less\" aesthetic that prioritises the artwork. Finally, I worked closely with developers to implement a custom CMS, empowering the client to manage their own content independently.",
        process: "My goal was invisibility - creating a design that steps back so the photography can step forward. I started by abandoning the ambiguous layout in favour of a strict category-based navigation, ensuring Art Directors could find relevant examples in under three clicks. Adopting a mobile-first strategy, I designed the grid system for vertical screens to guarantee that the high-resolution imagery remained immersive on any device. Ultimately, by stripping away decorative elements and utilising generous white space, I crafted an interface that acts as a quiet gallery wall, focusing all attention purely on the work.",
        impact: "The redesign transformed the portfolio into a high-converting asset. The intuitive structure and seamless mobile experience capture previously lost traffic, while the custom CMS empowers the client to independently manage their content.",
        images: [
            projectPortfolio,
            projectPortfolioChallenge,
            projectPortfolioProcess
        ]
    },
    {
        id: 0,
        title: "Zero-Admin Studio Booking",
        desc: "A streamlined SaaS solution reducing admin time by 40% for creative studios.",
        tags: ["Service Design", "Product Strategy", "UX/UI"],
        challenge: "Before the redesign, the client was trapped in an administrative loop. The website functioned like a blog, burying class details and forcing every single booking into a manual phone call.\n\nThis wasn't just a usability issue; it was an operational bottleneck. The lack of a structured digital agreement meant the client spent hours chasing payments and resolving misunderstandings. The manual burden was so high that it was consuming time meant for teaching, while the high-friction process caused potential customers to abandon the site before they even picked up the phone.",
        role: "As the Lead Product Designer, I drove the end-to-end transformation from a manual service to an automated product. My strategy focused on identifying and eliminating every administrative touchpoint.",
        process: "During discovery, I identified that the \"phone-tag\" booking method was the root cause of both user drop-off and the client's payment disputes. I used Figma to prototype a new flow centred on a 'tentative contract' model. This feature required users to agree to terms and availability digitally before the booking was confirmed.\n\nI restructured the site’s architecture to make information instantly accessible, removing the need for \"inquiry\" emails. By mapping the user journey specifically to remove manual intervention, I delivered a solution that automated the trust and transaction process simultaneously.",
        impact: "Achieving a \"zero-admin\" state, we slashed admin workload by 40% in the first month. The new 'tentative contract' model reduced payment disputes by 90%, while the frictionless flow drove a 36% revenue increase and a 28% drop in bounce rate. The system now works for the client, not the other way around.",
        images: [
            projectBooking,
            projectBookingChallenge,
            projectBookingProcess
        ]
    },
    {
        id: 1,
        title: "B2B Mobile Layout Change",
        desc: "Optimizing complex data tables for mobile viewports without losing fidelity.",
        tags: ["Mobile First", "Data Viz", "Figma"],
        challenge: "The problem wasn't technical; it was situational. B2B customers were getting stuck at the checkout counter, thumb-scrolling through a mobile interface designed for a desktop mindset. The screen was cluttered with marketing banners and \"Welcome\" messages, while the only thing the user actually needed - their barcode and account ID - was buried below the fold. This created awkward, stressful delays at the point of sale, frustrating both the trade customer trying to get back to the job site and the staff trying to clear the queue.",
        role: "I led the UX redesign with a specific focus on \"on-the-go\" utility. My role involved auditing the existing information hierarchy and realigning it with the physical reality of the user's environment. I championed a \"Zero-Scroll\" philosophy, ensuring that no B2B customer would ever need to swipe to find the data required to complete a transaction.",
        process: "I realised we were forcing \"shopper\" logic onto a \"payer\" situation. A trade customer standing at a counter doesn't need a search bar or a hamburger menu taking up prime real estate. They aren't there to explore the catalogue; they are there to identify themselves and settle the bill. The old layout asked them to dig, but I decided they shouldn't even have to tap. I inverted the architecture completely and treated the Account Page less like a website and more like a digital ID card. I stripped away the navigational clutter and pulled the \"Transaction Keys,\" specifically the Account ID, Credit Limit, and Barcode, out from the shadows. By placing them firmly at the top, the goal became simple: if the user opens the app in-store, the job is already done.",
        impact: "The redesign eliminated checkout lag by providing immediate, above-the-fold access to account data. This significantly reduced transaction times, creating a smoother, faster interaction for both clients and staff.",
        images: [projectB2BNew, projectB2BChallengeNew, projectB2BProcessNew]
    },
    {
        id: 2,
        title: "Direct-to-Collector Platform",
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
