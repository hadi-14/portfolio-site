import prisma from "@/lib/prisma";

async function main() {
  console.log("Seeding database with projects from CV...");

  const projects = [
    {
      title: "Habibians' Academy LMS",
      slug: "habibians-academy-lms",
      description:
        "A responsive full-stack education website with a custom Learning Management System (LMS), admin panel for reporting, and SEO strategies that helped the site rank 2nd for 'Best Coaching in Karachi'.",
      longDesc: `Developed a responsive full-stack education website using Next.js, TypeScript, Tailwind CSS, and MS SQL.
Built a custom Learning Management System (LMS) with an intuitive admin panel for reporting and analytics.
Optimized performance through static generation, code-splitting, and lazy loading — resulting in significantly faster load times.
Implemented SEO strategies that helped the site rank 2nd for the competitive keyword "Best Coaching in Karachi".`,
      techStack: "Next.js, TypeScript, Tailwind CSS, MS SQL, Vercel",
      liveUrl: "https://www.habibiansacademy.org",
      featured: true,
    },
    {
      title: "JWMJ Member Management System",
      slug: "jwmj-member-management",
      description:
        "A full-stack member management system for Jamnagar Wehvaria Memon Jamat handling family accounts, event registration, dues tracking, and role-based access with member and admin panels.",
      longDesc: `Built a full-stack member management system using Next.js, TypeScript, and Tailwind CSS, handling family accounts, event registration, and dues tracking.
Engineered role-based access control with member and admin panels, automating membership renewals and financial operations.
Integrated payment tracking and data analytics for community insights and membership management optimization.`,
      techStack: "Next.js, TypeScript, Tailwind CSS, PostgreSQL, Prisma",
      liveUrl: "https://jwmj.org",
      featured: true,
    },
    {
      title: "Franchise Management App",
      slug: "franchise-management-app",
      description:
        "A full-stack franchise management system with Flutter mobile app and RESTful APIs for real-time inventory, store performance, and data synchronization across multiple units.",
      longDesc: `Built a full-stack franchise management system with Flutter mobile app and RESTful APIs for real-time inventory, store performance, and data synchronization.
Implemented Firebase backend with role-based access control for admins and franchise managers, centralizing operations and reporting across multiple units.
Enabled mobile-first management of store data, inventory tracking, and performance metrics — streamlining daily franchise operations.`,
      techStack: "Flutter, Firebase, REST APIs, Dart",
      featured: true,
    },
    {
      title: "Ailestra Education Platform",
      slug: "ailestra-education-platform",
      description:
        "A full-stack education platform with course browsing, user registration, and content management features. Deployed on Vercel with CI/CD for automated builds.",
      longDesc: `Developed a responsive full-stack education website using Next.js, TypeScript, and Tailwind CSS.
Built course browsing, user registration, and content management features with client-side form validation and routing.
Integrated RESTful APIs for dynamic course data, authentication, and submissions.
Optimized performance using static generation, code-splitting, and lazy loading — improving load times noticeably.
Deployed the app via Vercel, establishing CI/CD for automated builds and updates.`,
      techStack: "Next.js, TypeScript, Tailwind CSS, REST APIs, Vercel",
      featured: false,
    },
    {
      title: "CaClinics Data Integration & Reporting System",
      slug: "caclinics-data-integration",
      description:
        "An automated ETL pipeline in Python processing 10,000+ daily records from three sources, with PostgreSQL on AWS EC2 and Power BI dashboards with automated refreshes.",
      longDesc: `Automated a daily ETL pipeline in Python to process 10,000+ records from three sources (MediRecords API, Dear API, manual Zapi CSVs).
Deployed PostgreSQL on AWS EC2, organizing separate tables and optimized views for efficient analytics.
Created Power BI dashboards with automated refreshes triggered post-ETL via Python, delivering timely data insights.
Implemented comprehensive error-handling and email alerts; built a master scheduler.
Scalable architecture handled high-volume data; prepared system for full automation to eliminate manual CSV uploads.`,
      techStack: "Python, PostgreSQL, AWS EC2, Power BI, Pandas",
      featured: false,
    },
  ];

  for (const project of projects) {
    const existing = await prisma.project.findUnique({ where: { slug: project.slug } });
    if (!existing) {
      await prisma.project.create({ data: project });
      console.log(`  ✓ Created: ${project.title}`);
    } else {
      console.log(`  ⏭ Skipped (exists): ${project.title}`);
    }
  }

  console.log("\nSeeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
