import { GitBranch, Mail, MapPin, Phone, ExternalLink, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SkillCategories = Record<string, string[]>;

export interface ExperienceItem {
    role: string;
    company: string;
    period: string;
    highlights: string[];
}

export interface EducationItem {
    school: string;
    level: string;
    period: string;
}

export interface ContactCard {
    icon: LucideIcon;
    label: string;
    value: string;
    href: string;
}

export interface SocialLink {
    icon: LucideIcon;
    label: string;
    href: string;
}

export const skills: SkillCategories = {
    Languages: ["Python", "SQL", "JavaScript", "TypeScript", "Dart", "HTML", "CSS", "Bash"],
    Frameworks: ["Next.js", "React", "Express.js", "Flutter", "Pandas", "NumPy", "LangChain", "Flask"],
    "AI & Data": ["LangChain", "Vanna AI", "ChromaDB", "Power BI", "Prisma ORM", "Nuitka"],
    Databases: ["PostgreSQL", "MS SQL Server", "Firebase Firestore", "Prisma ORM"],
    Tools: ["Git", "Ubuntu", "Vercel", "Firebase Hosting", "AWS EC2", "VS Code", "Jupyter Notebook", "Node.js"],
    "APIs & Integration": ["REST APIs", "OAuth 2.0", "Erply API", "FHIR/HL7", "Cin7", "Google APIs", "Xero"],
    Security: ["JWT Auth", "RBAC", "OAuth 2.0", "Secure API Design", "Secure ETL Design"],
};

export const experience: ExperienceItem[] = [
    {
        role: "Digital Operations & IT Coordinator",
        company: "Habibians Academy",
        period: "Jan 2024 – Present (part-time)",
        highlights: [
            "Developed and maintain the full-stack LMS and public website; SEO strategies achieved 2nd place Google ranking for 'Best Coaching in Karachi'",
            "Managed Google Maps listing, social media channels, and WhatsApp communication — coordinating class schedules, resource sharing, and student confirmations",
            "Reported analytics and attendance stats to leadership; conducted competitor research and liaised with the academic department to ensure smooth operations",
        ],
    },
    {
        role: "Software Developer",
        company: "Datazeb",
        period: "Dec 2022 – Jan 2026",
        highlights: [
            "Built Python SDK wrappers for Erply POS API across multiple clients; handled OAuth flows and synced 5M+ records into SQL Server/PostgreSQL with incremental loading",
            "Delivered automated Power BI dashboards with post-ETL refresh cycles; improved pipeline efficiency by 30% through query and scheduling optimisation",
            "Shipped cross-platform apps in Flutter and React; end-to-end delivery from spec through QA and client handover",
            "Compiled production Python scripts to standalone Windows .exe (Nuitka) for zero-dependency client deployments",
        ],
    },
    {
        role: "Independent Developer (Freelance)",
        company: "Fiverr & Upwork",
        period: "2022 – Present",
        highlights: [
            "Completed 80+ projects on Fiverr with a 5.0★ rating (Level 2 seller) across Python automation, AI agents, Next.js development, Flutter apps, ETL pipelines, and web scraping",
            "Active on Upwork delivering automation, data engineering, and API integration projects for international clients",
        ],
    },
];

export const education: EducationItem[] = [
    { school: "Heuser College", level: "A-Level", period: "2025 – 2027" },
    { school: "BVS Parsi High School", level: "O-Level", period: "2014 – 2025" },
];

export const certifications = [
    "Cisco: Introduction to Cybersecurity – Cyber threats and defense principles",
    "Cisco: IT Essentials – Hardware, OS, and troubleshooting fundamentals",
    "Cisco: Introduction to IoT – Basics of IoT and data analytics",
    "Dhroraji: Computer Hardware, IoT (Big Data, Connecting Things), RPA basics",
];

export const contactCards: ContactCard[] = [
    { icon: Mail, label: "Email", value: "hadimillwala@gmail.com", href: "mailto:hadimillwala@gmail.com" },
    { icon: Phone, label: "Phone", value: "+92 331 2288129", href: "tel:+923312288129" },
    { icon: MapPin, label: "Location", value: "Garden East, Karachi, Pakistan", href: "#" },
];

export const socialLinks: SocialLink[] = [
    { icon: GitBranch, label: "GitHub", href: "https://github.com/hadi-14" },
    { icon: ExternalLink, label: "LinkedIn", href: "https://www.linkedin.com/in/abdul-hadi-millwala/" },
    { icon: Code2, label: "Fiverr", href: "https://www.fiverr.com/abdulhadi599" },
];