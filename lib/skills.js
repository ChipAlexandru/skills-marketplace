// All skill data lives here. Add, edit, or remove skills — push to deploy.

export const SKILLS = [
  {
    id: 1,
    slug: "finance",
    name: "Finance",
    author: "Anthropic",
    description: "Automate month-end close, journal entries, reconciliations, variance analysis, and SOX testing so your finance team closes faster and audits cleaner.",
    long_description: "This plugin handles the core workflows of a corporate accounting team: preparing journal entries, reconciling accounts, generating financial statements with variance analysis, managing the month-end close process, and supporting SOX 404 compliance testing. It works standalone from uploaded spreadsheets or pasted data, and becomes more powerful when connected to your ERP, data warehouse, or BI tools via MCP integrations.",
    repo_url: null,
    installs: 0,
    stars: 0,
    badge: null,
    version: "1.2.0",
    category: "Finance & Accounting",
    industries: [
      "financial",
      "retail",
      "cpg",
      "industrials",
      "tmt",
      "healthcare",
      "privatecapital"
    ],
    functions: [
      "finance",
      "risk",
      "operations"
    ],
    use_cases: [
      {
        ask: "Book AP accruals for December 2025",
        returns: "Formatted journal entry with debits, credits, department codes, supporting calculations, reversal flag, and a review checklist"
      },
      {
        ask: "Reconcile our bank account for March",
        returns: "Two-sided reconciliation showing adjusted bank and GL balances, categorized reconciling items with aging analysis, and escalation flags for stale items"
      },
      {
        ask: "Run SOX testing for revenue recognition Q4",
        returns: "Control matrix, risk-based sample selections, testing workpaper templates with pre-built test steps, and a deficiency classification framework"
      }
    ],
    inputs: [
      {
        label: "Trial balance or GL account data",
        detail: "paste, upload spreadsheet, or connect ERP",
        required: true
      },
      {
        label: "Prior period data for comparison, budget/forecast figures, bank statements, fixed asset registers, depreciation schedules, contract details for revenue recognition, and organization-specific materiality thresholds",
        detail: "",
        required: false
      }
    ],
    outputs: [
      {
        label: "Formatted journal entries with debits, credits, and supporting detail",
        detail: "Account reconciliation workpapers with categorized reconciling items"
      },
      {
        label: "Multi-column income statements with variance flags and key metrics",
        detail: "Waterfall variance decompositions with narrative explanations"
      },
      {
        label: "SOX control matrices, sample selections, and testing workpaper templates",
        detail: "Month-end close checklists with task sequencing and status tracking"
      }
    ],
    how_it_works: [
      {
        title: "Structured entry templates",
        detail: "Generates journal entries in standard accounting format with balanced debits and credits, department coding, and auto-reversal flags, so entries are audit-ready before they reach the reviewer."
      },
      {
        title: "Two-sided reconciliation",
        detail: "Compares GL balances against bank statements or subledgers from both directions, categorizes every reconciling item by type (timing, adjustment, investigation), and ages outstanding items to surface stale balances that need attention."
      },
      {
        title: "Variance decomposition",
        detail: "Breaks down financial variances into specific business drivers (volume, price, mix, timing, one-time) using standard analytical techniques, so leadership sees the \"why\" behind the numbers rather than just the gap."
      },
      {
        title: "Materiality-driven flagging",
        detail: "Applies configurable dollar and percentage thresholds to automatically highlight variances that warrant investigation, preventing both over-analysis of immaterial items and under-investigation of significant ones."
      },
      {
        title: "Risk-based sample selection",
        detail: "Calculates SOX testing sample sizes based on control frequency, risk level, and prior-year results, then generates random or targeted sample selections with full documentation of the selection methodology."
      },
      {
        title: "Close sequencing engine",
        detail: "Maps task dependencies across the entire month-end close process, identifies the critical path, and provides day-by-day checklists with status tracking so nothing falls through the cracks."
      }
    ],
    tools: "Works standalone from uploaded files or pasted data. Optionally connects to ERP/accounting systems (NetSuite, SAP), data warehouses (Snowflake, BigQuery, Databricks), spreadsheet tools, BI platforms (Tableau, Looker), email (Microsoft 365), and team chat (Slack) for automated data pulls and status updates.",
    skills_list: [
      {
        name: "journal-entry",
        description: "Prepare journal entries with debits, credits, and supporting detail for any standard entry type",
        type: "Invocable"
      },
      {
        name: "journal-entry-prep",
        description: "Best practices, standard accrual types, documentation requirements, and review workflows",
        type: "Reference"
      },
      {
        name: "reconciliation",
        description: "Account reconciliation methodology for GL-to-subledger, bank, and intercompany",
        type: "Invocable"
      },
      {
        name: "financial-statements",
        description: "Income statement, balance sheet, and cash flow generation with GAAP presentation",
        type: "Invocable"
      },
      {
        name: "variance-analysis",
        description: "Variance decomposition, waterfall analysis, and narrative generation",
        type: "Invocable"
      },
      {
        name: "sox-testing",
        description: "SOX 404 sample selections, testing workpapers, and control assessments",
        type: "Invocable"
      },
      {
        name: "close-management",
        description: "Month-end close checklists, task sequencing, dependencies, and status tracking",
        type: "Reference"
      },
      {
        name: "audit-support",
        description: "SOX 404 testing methodology, documentation standards, and deficiency classification",
        type: "Reference"
      }
    ],
    install_steps: [
      "Open the Claude Desktop app and switch to the Cowork tab",
      "Click Customize in the left sidebar, then Browse plugins",
      "Search for “Finance” and click Install"
    ]
  },
  {
    id: 2,
    slug: "human-resources",
    name: "Human Resources",
    author: "Anthropic",
    description: "Turn people operations into structured, audit-ready deliverables — from offer letters and onboarding plans to compensation benchmarks and calibration packages.",
    long_description: "The Human Resources plugin handles the full people operations lifecycle. It drafts offer letters with complete compensation packages and negotiation guidance, generates onboarding checklists with day-by-day schedules, structures performance reviews with self-assessment templates and calibration documents, benchmarks compensation against market data, and produces workforce analytics reports covering headcount, attrition, and diversity. Every deliverable follows a consistent, professional format ready for leadership review.",
    repo_url: null,
    installs: 0,
    stars: 0,
    badge: null,
    version: "1.2.0",
    category: "Human Resources & People Operations",
    industries: [
      "financial",
      "retail",
      "cpg",
      "industrials",
      "tmt",
      "healthcare"
    ],
    functions: [
      "people",
      "operations"
    ],
    use_cases: [
      {
        ask: "What should we pay a Senior Product Manager in Austin?",
        returns: "Percentile-banded compensation table with base, equity, and total comp benchmarks, location adjustment, and retention risk flags"
      },
      {
        ask: "Prep calibration for my team's H1 performance reviews",
        returns: "Rating distribution table, promotion candidates with evidence, compensation action recommendations, and discussion points for borderline cases"
      },
      {
        ask: "Generate a headcount and attrition report from this employee data",
        returns: "Executive summary with key metrics, department-level breakdown, turnover trends, flight risk indicators, and data-driven retention recommendations"
      }
    ],
    inputs: [
      {
        label: "Role details",
        detail: "(required for offers and comp) — title, level, location, hiring manager",
        required: false
      },
      {
        label: "Compensation parameters",
        detail: "(required for offers, optional for comp) — base salary, equity, signing bonus, vesting schedule",
        required: false
      },
      {
        label: "Employee data file —",
        detail: "CSV or spreadsheet with names, departments, titles, levels, start dates, compensation, demographics",
        required: false
      },
      {
        label: "Review context —",
        detail: "review period, employee accomplishments, goals from prior cycle",
        required: false
      },
      {
        label: "Policy documents —",
        detail: "employee handbook text or connected knowledge base for policy lookup",
        required: false
      }
    ],
    outputs: [
      {
        label: "Offer letters",
        detail: "complete draft with compensation table, terms, benefits summary, and hiring manager negotiation notes"
      },
      {
        label: "Onboarding plans",
        detail: "pre-start checklist, Day 1 schedule, Week 1 tasks, 30/60/90-day goals, key contacts, and tool access matrix"
      },
      {
        label: "Performance reviews",
        detail: "self-assessment templates, manager review forms with behavioral examples, and calibration packages with rating distributions"
      },
      {
        label: "Compensation analysis",
        detail: "market benchmark tables at four percentile bands, band placement analysis, outlier flags, and equity modeling"
      },
      {
        label: "People reports",
        detail: "executive summaries with key metrics, departmental breakdowns, trend analysis, and action recommendations"
      }
    ],
    how_it_works: [
      {
        title: "Role-aware compensation framing",
        detail: "Structures every compensation discussion around total comp (base, equity, bonus, benefits) rather than just salary, ensuring candidates and managers see the full picture."
      },
      {
        title: "Competency-mapped interview design",
        detail: "Maps each interview question to a specific skill or behavior the role requires, then scores them on a consistent rubric so hiring decisions are based on evidence rather than gut feel."
      },
      {
        title: "Calibration-ready review packaging",
        detail: "Bundles individual performance assessments into a team-level view with rating distributions and promotion cases, so managers walk into calibration meetings prepared."
      },
      {
        title: "Structured onboarding sequencing",
        detail: "Breaks the new hire experience into timed phases (pre-start, Day 1, Week 1, 30/60/90 days) with owner assignments, ensuring nothing falls through the cracks."
      },
      {
        title: "Multi-dimension workforce analytics",
        detail: "Slices employee data across departments, levels, tenure, and demographics simultaneously, surfacing patterns (like attrition clustering in a specific team) that single-dimension reports miss."
      }
    ],
    tools: "Works entirely standalone — provide details manually or upload data files. Optionally connects to HRIS systems (Workday, BambooHR, Rippling) for live employee data, applicant tracking systems (Greenhouse, Lever, Ashby) for pipeline management, compensation platforms (Pave, Radford) for verified benchmarks, knowledge bases (Notion, Confluence) for policy documents, and communication tools (Slack, Gmail, Calendar) for candidate coordination and scheduling.",
    skills_list: [
      {
        name: "comp-analysis",
        description: "Benchmark compensation against market data with percentile bands, band placement, and equity modeling",
        type: "Invocable"
      },
      {
        name: "draft-offer",
        description: "Draft complete offer letters with compensation tables, terms, and negotiation guidance",
        type: "Invocable"
      },
      {
        name: "interview-prep",
        description: "Create structured interview plans with competency-mapped questions and scoring rubrics",
        type: "Reference"
      },
      {
        name: "onboarding",
        description: "Generate phased onboarding plans with checklists, schedules, and goal-setting",
        type: "Invocable"
      },
      {
        name: "org-planning",
        description: "Model headcount plans, org structure, and team design with cost analysis",
        type: "Reference"
      },
      {
        name: "people-report",
        description: "Produce workforce analytics reports on headcount, attrition, diversity, and org health",
        type: "Invocable"
      },
      {
        name: "performance-review",
        description: "Structure reviews with self-assessments, manager templates, and calibration packages",
        type: "Invocable"
      },
      {
        name: "policy-lookup",
        description: "Search and explain company policies in plain language from connected knowledge bases",
        type: "Invocable"
      },
      {
        name: "recruiting-pipeline",
        description: "Track candidates through pipeline stages with conversion metrics",
        type: "Reference"
      }
    ],
    install_steps: [
      "This plugin is available through the Anthropic open-source repository and can also be installed via direct upload."
    ]
  },
  {
    id: 3,
    slug: "procurement-spend-analyzer",
    name: "Procurement Spend Analyzer",
    author: "Unknown",
    description: "Turn raw spend data into a prioritized savings pipeline with actionable sourcing recommendations in minutes.",
    long_description: "Analyzes procurement spend data to identify savings opportunities across multiple sourcing levers — from price harmonization and supplier consolidation to contract compliance and design-to-value engineering. Produces a detailed 10-sheet Excel workbook and a polished interactive HTML report, both cross-referenced and audit-ready. Designed for procurement teams who need fast, evidence-based analysis without weeks of spreadsheet work.",
    repo_url: null,
    installs: 0,
    stars: 0,
    badge: null,
    version: "0.0.0",
    category: "Procurement & Sourcing",
    industries: [
      "cpg",
      "retail",
      "industrials",
      "logistics"
    ],
    functions: [
      "procurement",
      "operations",
      "finance"
    ],
    use_cases: [
      {
        ask: "Here's our annual spend data — show me where we're leaving money on the table.",
        returns: "A prioritized savings pipeline ranking every opportunity by dollar impact, difficulty, and timeline, with drill-down analysis across 10 Excel sheets."
      },
      {
        ask: "Which suppliers should we put out to bid first?",
        returns: "An eRFx/eAuction opportunity table showing categories ready for competitive sourcing events, with estimated savings and recommended actions."
      },
      {
        ask: "Are we paying different prices for the same item across sites?",
        returns: "A cross-site price harmonization analysis flagging every item with more than 10% price variance, the best available price, and row-level savings calculations."
      }
    ],
    inputs: [
      {
        label: "Spend data file",
        detail: "Excel or CSV with transaction-level fields: line item, category, PO number, date, item description, supplier, unit of measure, quantity, unit price, total spend, GL code, and cost center",
        required: true
      },
      {
        label: "Contract register",
        detail: "Excel file with supplier, item description, contracted price, contract dates, volume thresholds, and rebate rates",
        required: false
      }
    ],
    outputs: [
      {
        label: "10-sheet Excel workbook",
        detail: "Summary with savings pipeline, spend overview, price harmonization detail, supplier fragmentation analysis, contract leakage assessment, sole-source risk register, quick wins, master savings pipeline, design-to-value and should-cost models, and raw data"
      },
      {
        label: "Interactive HTML report",
        detail: "Executive dashboard with KPI cards, savings timeline, pipeline table, eRFx opportunity table with launch button, animated bar charts, contract and risk cards, should-cost models, colleague sharing, and Excel download link"
      }
    ],
    how_it_works: [
      {
        title: "Row-level price comparison",
        detail: "Compares every transaction against the lowest price paid for the same item across all sites, flagging overcharges above a materiality threshold so buyers can enforce the best available price immediately."
      },
      {
        title: "Category-level savings benchmarking",
        detail: "Applies industry-standard savings rates to each spend category based on consolidation potential, producing estimated savings for competitive bidding events."
      },
      {
        title: "Double-count prevention",
        detail: "Tracks which savings come from overlapping mechanisms so related actions within a larger consolidation are not counted twice in the total."
      },
      {
        title: "Contract compliance hypothesis framing",
        detail: "Identifies uncontracted and off-pattern spend, framing findings as testable hypotheses when no contract register is available, and upgrading to quantified leakage when contract data is provided."
      },
      {
        title: "Supply risk flagging",
        detail: "Detects items sourced from a single supplier and assigns risk tiers by spend level, separating risk identification from savings calculations to avoid conflating the two."
      },
      {
        title: "Should-cost modeling",
        detail: "Builds bottom-up cost models for high-volume items by decomposing price into material, labor, overhead, and margin components to identify negotiation leverage."
      }
    ],
    tools: "Works entirely standalone with no external APIs or accounts required. Reads uploaded spend files directly and produces both deliverables in a single run.",
    skills_summary: "Single invocable skill (procurement-spend-analyzer) that orchestrates the full analytical workflow — data ingestion, lever computation, workbook generation, and HTML report creation — in one run.",
    install_steps: [
      "Obtain the .skill file from the plugin author or colleague",
      "Open the Claude Desktop app and switch to the Cowork tab",
      "Click Customize in the left sidebar, then Upload plugin",
      "Select the .skill file and confirm installation"
    ]
  }
];
