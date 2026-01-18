// This file exports the context about Eka for use in both local server and Vercel serverless function
// Edit this content to update what the AI knows about Eka

// Projects context is pre-generated to avoid importing image assets in Node.js
// To update: Run the generateProjectsMarkdown function and paste the output here
const PROJECTS_CONTEXT = `# Portfolio Projects

## Brand Scaling & Client Acquisition Platform

**Overview:** A user-centric overhaul of a photographer's portfolio to recapture lost business through improved UX and mobile responsiveness.

**Skills:** UX/UI Design, Mobile First, CMS Integration

### The Challenge
The Problem: Categorical Ambiguity. The previous digital presence failed to distinguish between the photographer's disparate disciplines. "Action" sports work was diluted by "Fashion" editorials, creating a confused brand signal that hindered specialist bookings.

### Eka's Role
End-to-End Product Architecture. Responsible for the strategic taxonomy audit, UI system design, and CMS integration.

### Process & Approach
Systemisation & "Invisible" UI.

IA Strategy: Flattened the hierarchy. Users land directly on the category selector, eliminating the "Mystery Meat" navigation of the previous site.

Visuals: Adopted a brutalist, utility-first aesthetic. White space is used as an active element to frame the work.

Tech: Implemented a high-performance lazy-loading stack to ensure the "Action" portfolio loads as fast as the "Portraits," despite the heavy data payload.

### Impact & Results
Taxonomy Migration & Funnel Optimisation. Transformed a generalist photography archive into a targeted B2B sales tool.

**Key Outcomes:**
- **Zero-Friction Inquiry:** Users are never more than 2 clicks from booking.
- **Operational Autonomy:** Client manages all assets via a custom CMS, removing developer dependency.
- **Funnel Optimisation:** Reduced the user journey from "Landing" to "Contact" by roughly 60% via Category-First Architecture.

---

## The 'Spreadsheet of Doom' & Personal CRM

**Overview:** Pivoting to a 'Personal CRM' to solve candidate anxiety. A research-led strategy that uncovered the 'Spreadsheet of Doom'.

**Skills:** Product Discovery, UX Research, Product Strategy

### The Challenge
The Problem: Data Fragmentation. The modern job search is multi-channel and inherently mobile. Candidates using desktop-only tools (Excel) lose data while 'on the go.' The solution necessitated a Mobile-First architecture to eliminate this friction and capture progress in real-time.

### Eka's Role
Lead UX Researcher & Product Strategist. Responsible for the End-to-End Research Ops: Screener design, 1:1 qualitative interviews, affinity mapping, and Defining the MVP feature set.

### Process & Approach
Evidence-Based Product Definition.

Methodology: Conducted 6 qualitative face-to-face interviews and dug into different industries by conducting a quantitative questionnaire around different countries.

Synthesis: Used Affinity Mapping to cluster pain points into themes: "Ghosting," "Repetitive Entry," and "Status Anxiety."

Outcome: Defined the "Job Wallet" concept as a central repository for all application data.

### Impact & Results
De-risking the 'Job Hunt' Vertical. Conducted foundational research to validate the market need for a candidate-centric Application Tracking System (ATS).

**Key Outcomes:**
- **The Insight:** Research revealed that the core friction isn't "finding" jobs, but "managing the emotional data" of the process.
- **The Strategy:** Shifted product focus from "Aggregation" (finding jobs) to "Management" (tracking status).
- **The Validation:** Identified 3 critical "Drop-off Points" where users abandon the process due to anxiety.

---

## Optimising B2B Workflow & Retention

**Overview:** Optimizing complex data tables for mobile viewports without losing fidelity.

**Skills:** Mobile First, Data Viz, Figma

### The Challenge
Environmental Mismatch. The legacy mobile interface was not optimised for the physical constraints of the checkout line. Critical payment assets (Digital Card, Barcode) were buried below the fold, forcing users to "thumb-scroll" while under pressure at the register. This created measurable friction and delay at the point of revenue capture.

### Eka's Role
Mobile Strategy & Heuristic Audit. Lead UX Designer responsible for auditing the "In-Store" user journey and restructuring the mobile Information Architecture (IA) to support "On-the-Go" utility.

### Process & Approach
Architecture Inversion.

The Pivot: Migrated from a list-based hierarchy to a "Header-First" utility model.

The Execution: Pulled the Digital Card out of the content stream and pinned it to the top viewport.

The Result: Transformed the user flow from a "Hunt" (Login > Scroll > Find > Tap) to a "Reflex" (Login > Tap).

### Impact & Results
Eliminating POS Latency. Transformed the dashboard into a "Zero-Scroll" Utility Interface. By prioritizing high-frequency data and elevating the digital payment card, we reduced time-to-pay by ~8 seconds per transaction.

**Key Outcomes:**
- **Transaction Velocity:** Reduced queue friction for trade customers.
- **Staff Efficiency:** Faster processing at the Point of Sale (POS), reducing checkout congestion during peak trade hours.

---

## Service Automation: Zero-Touch Model

**Overview:** A streamlined SaaS solution reducing admin time by 40% for creative studios.

**Skills:** Service Design, Product Strategy, UX/UI

### The Challenge
The Problem: Operational Paralysis. The legacy site functioned as a static blog, burying critical class details and forcing 100% of bookings into manual phone calls. This bottleneck capped the business's growth potential.

### Eka's Role
Service Design & Product Strategy. Lead Product Designer responsible for the end-to-end transformation from a manual service to an automated product ecosystem.

### Process & Approach
Logic Architecture & Flow Unification.

Discovery: Identified "Phone Tag" as the root cause of churn and disputes.

Architecture: Integrated "Class Trials" and "Full Terms" into a single decision tree, removing the disjointed experience of separate products.

Result: A unified path to purchase that allows flexible commitment levels.

### Impact & Results
Achieving the "Zero-Admin" State. Redesigned the service model to eliminate manual booking friction, resulting in a 40% reduction in administrative workload within month one.

**Key Outcomes:**
- **The Shift:** We replaced a high-touch "Phone Tag" model with a "Tentative Contract" System, allowing users to book and agree to terms digitally without staff intervention.
- **Risk Reduction:** The digital agreement model cut payment disputes by 90%.
- **Growth Signal:** The frictionless flow drove a 36% revenue increase and reduced bounce rates by 28%.

---

`;

export const EKA_CONTEXT = `
# About Eka Zinich
Eka is a Product and UX/UI Designer with over five years of experience. She focuses on consumer-facing projects where her primary goal is to solve the "small things" that reduce cognitive load and make everyday tasks easier. She believes that great design prevents important context—like job application details or business contacts—from falling out of a user's attention scope.

#The Design Process: Validation and Strategy

Eka's process is rooted in validation. Before moving to Figma, she asks: "Does this problem truly exist?"

#Discovery: 

She researches existing solutions, conducts thorough qualitative and quantitative research, and uses affinity boards to uncover hidden pain points.

#The MVP Approach: 

She maps user flows and ruthlessly prioritises features. She categorises work into "must-haves" for the MVP versus "nice-to-haves" that might not offer a high enough impact to justify the cost.

# My toolbox
Figma, Adobe. AI assistans - Gemini, Nano Banana, Claude, Cursor and Antigravity

#Technical Alignment: 
She involves the technical and digital teams early to understand constraints, ensuring the "start to finish" flow is achievable before defining success metrics.

#Collaboration and Conflict Resolution

Eka treats technical constraints as a creative challenge. If a crucial feature is blocked by high costs or technical "unclimbable" hurdles, she researches alternative implementations. She uses data-backed decisions and A/B testing to represent the best path forward to stakeholders, ensuring that design decisions are never based on guesswork, but on what will truly provide a "win-win" for the business and the user.

#Learning from Experience: The "Business-Design" Balance

Eka understands that a feature that helps the user can sometimes hinder the business if not implemented correctly. She learned this through a project where she insisted on an AR feature for an e-commerce art site. While the feature solved a user need (visualising art on a wall), the third-party implementation created a massive maintenance bottleneck. This taught her to always consider the long-term operational impact of a design choice, not just the immediate user benefit.

#Measuring Success and Growth

Success is measured through a blend of heatmaps, session recordings, and task completion rates. If a feature fails to meet its goals, Eka treats it as data. She hypothesises new iterations and conducts A/B/C testing to lead users in the desired direction. She has a growth mindset, viewing every "failure" as a pivot point to a more refined and effective solution.

${PROJECTS_CONTEXT}

## Contact
- Email: ekazinich@gmail.com
- LinkedIn: https://www.linkedin.com/in/katerina-eka-zinich
`;

export const SYSTEM_PROMPT = `You are a helpful and professional AI assistant representing Eka Zinich's portfolio website. Your role is to answer questions about Eka's professional background, skills, experience, and projects.

IMPORTANT: Use Markdown for styling, lists, links, tables etc.

After each response try to add australian slang joke.

Guidelines:
- Be professional, friendly, and concise in your responses.
- Use Australian style English.
- Only share information that is provided in the context about Eka
- If asked about something not covered in the context, politely acknowledge that you don't have that specific information and suggest they reach out to Eka directly via email or LinkedIn. Avoid repeating "reach out directly via email or LinkedIn." too often.
- Keep responses focused and relevant to professional/career topics
- Do not make up or fabricate information about Eka
- If the question is completely unrelated to Eka or professional topics, gently redirect the conversation

Remember: You represent Eka's professional image, so maintain a warm but professional tone throughout.`;

export function generateProjectsMarkdown(projects) {
  let markdown = '# Portfolio Projects\n\n';
  
  for (const project of projects) {
    markdown += `## ${project.title}\n\n`;
    markdown += `**Overview:** ${project.desc}\n\n`;
    markdown += `**Skills:** ${project.tags.join(', ')}\n\n`;
    
    if (project.challenge) {
      markdown += `### The Challenge\n${project.challenge}\n\n`;
    }
    
    if (project.role) {
      markdown += `### Eka's Role\n${project.role}\n\n`;
    }
    
    if (project.process) {
      markdown += `### Process & Approach\n`;
      if (typeof project.process === 'string') {
        markdown += `${project.process}\n\n`;
      } else if (project.process.type === 'rich' && project.process.sections) {
        for (const section of project.process.sections) {
          if (section.type === 'text' && section.content) {
            markdown += `${section.content}\n\n`;
          }
          if (section.type === 'comparison' && section.items) {
            for (const item of section.items) {
              markdown += `**${item.title}:** ${item.desc}\n\n`;
            }
          }
        }
      }
    }
    
    if (project.impact) {
      markdown += `### Impact & Results\n`;
      if (project.impact.description) {
        markdown += `${project.impact.description}\n\n`;
      }
      if (project.impact.outcomes && project.impact.outcomes.length > 0) {
        markdown += `**Key Outcomes:**\n`;
        for (const outcome of project.impact.outcomes) {
          markdown += `- **${outcome.title}:** ${outcome.desc}\n`;
        }
        markdown += '\n';
      }
    }
    
    markdown += '---\n\n';
  }
  
  return markdown;
}
