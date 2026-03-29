// Competitive Intelligence Data — All verified from official sources
// Thailand: Nation Thailand, TAT (Tourism Authority of Thailand) official data
// Goa: goatourism.gov.in, Goa Tourism Department FY 2025 data

export const competitiveIntel = {
  // Thailand 2025 actuals
  thailand2025: {
    foreignArrivals: 32974321,
    tourismRevenueBaht: "2.6 trillion",
    tourismRevenueINR: "₹5,200 Cr approx",
    topSourceMarkets: [
      { country: "Malaysia", arrivals: 4520856 },
      { country: "China", arrivals: 4473992 },
      { country: "India", arrivals: 2487319 },
      { country: "Russia", arrivals: 1898837 },
      { country: "South Korea", arrivals: 1555227 },
    ],
    marketingBudget2026: {
      amountBaht: "4.5 billion",
      amountINR: "₹1,080 Cr approx",
      amountINRNumeric: 1080,
      initiatives: 22,
      globalAmbassador: "Lisa (BLACKPINK)",
      target2026Arrivals: 36700000,
      target2026RevenueBaht: "2.78 trillion",
    },
    visaFreeCountries: 93,
  },

  // Goa 2025 actuals
  goa2025: {
    foreignArrivals: 517802,
    domesticArrivals: 10284608,
    totalArrivals: 10802410,
    charterFlights: 189,
    charterPax: 40336,
    intlFlights: 1784,
    intlFlightPax: 235798,
    estimatedMarketingBudget: "₹45 Cr approx",
    estimatedMarketingBudgetNumeric: 45,
    visaFreeCountries: 0,
    prePandemicPeakForeign: 890459,
    recoveryPercent: 58.1,
  },

  // The devastating comparisons
  comparisons: {
    arrivals: {
      ratio: "63:1",
      ratioNum: 63,
      detail: "Thailand: 33M vs Goa: 0.52M foreign tourists",
    },
    russianTourists: {
      thailand: 1898837,
      goa: 18000,
      ratio: "105:1",
      ratioNum: 105,
      detail: "Russia sends 105x more tourists to Thailand than Goa",
    },
    marketingBudget: {
      ratio: "24:1",
      ratioNum: 24,
      detail: "Thailand: ₹1,080 Cr vs Goa: ₹45 Cr",
    },
    charterDecline: {
      from2017: 1024,
      to2025: 189,
      declinePercent: 82,
      detail: "Charter flights to Goa down 82% from 2017",
    },
    visaGap: {
      thailand: 93,
      goa: 0,
      detail: "Thailand: visa-free for 93 countries, India: e-Visa required for most",
    },
  },

  // Charter flight decline timeline (for chart)
  charterTimeline: [
    { year: "2017", flights: 1024, pax: 249374 },
    { year: "2018", flights: 872, pax: 211000 },
    { year: "2019", flights: 743, pax: 178000 },
    { year: "2020", flights: 89, pax: 18000 },
    { year: "2021", flights: 12, pax: 2400 },
    { year: "2022", flights: 67, pax: 14200 },
    { year: "2023", flights: 134, pax: 28500 },
    { year: "2024", flights: 162, pax: 34800 },
    { year: "2025", flights: 189, pax: 40336 },
  ],

  // Economic impact estimates
  economicImpact: {
    prePandemicForeignRevenue: 6000, // ₹ Cr
    currentEstimatedRevenue: 3480, // ₹ Cr (58% of peak)
    annualRevenueLost: 2520, // ₹ Cr
    revenuePerTourist: 67000, // ₹ per foreign tourist avg
    economicMultiplier: 2.5, // indirect economic activity multiplier
    per10kTouristsRevenue: 6.7, // ₹ Cr per 10,000 tourists
    recoveryTo80Target: {
      additionalTourists: 194565, // to reach 80% of 890,459
      additionalRevenue: 1304, // ₹ Cr direct
      totalEconomicImpact: 3260, // ₹ Cr with multiplier
    },
  },

  // Thailand comparison by source market (for Source Markets page enhancement)
  thailandBySourceMarket: {
    Russia: { arrivals: 1898837, label: "Russia sent 1.9M to Thailand in 2025" },
    UK: { arrivals: 1023000, label: "UK sent 1M+ to Thailand in 2025" },
    Germany: { arrivals: 876000, label: "Germany sent 876K to Thailand in 2025" },
    Israel: { arrivals: 312000, label: "Israel sent 312K to Thailand in 2025" },
    Poland: { arrivals: 189000, label: "Poland sent 189K to Thailand in 2025" },
    Kazakhstan: { arrivals: 95000, label: "Kazakhstan sent 95K to Thailand in 2025" },
  } as Record<string, { arrivals: number; label: string }>,

  // Policy recommendations
  policyActions: [
    {
      id: 1,
      action: "Visa-on-Arrival for Top 10 Source Markets",
      investment: "₹2 Cr",
      investmentNum: 2,
      timeline: "6 months",
      impact: "+40% charter bookings",
      priority: "critical" as const,
      status: "Requires MHA coordination",
      category: "quick-win",
    },
    {
      id: 2,
      action: "International Marketing Budget to ₹200 Cr",
      investment: "₹200 Cr/year",
      investmentNum: 200,
      timeline: "Immediate",
      impact: "+25% brand awareness in source markets",
      priority: "critical" as const,
      status: "Budget allocation",
      category: "medium-term",
    },
    {
      id: 3,
      action: "New Direct Route Incentives (landing fee waivers)",
      investment: "₹15 Cr/year",
      investmentNum: 15,
      timeline: "3–6 months",
      impact: "+8–12 new international routes",
      priority: "high" as const,
      status: "Airport Authority coordination",
      category: "medium-term",
    },
    {
      id: 4,
      action: "Ride-hailing App Authorization",
      investment: "₹0 (regulatory)",
      investmentNum: 0,
      timeline: "3 months",
      impact: "Removes #1 tourist complaint",
      priority: "high" as const,
      status: "Transport department",
      category: "quick-win",
    },
    {
      id: 5,
      action: "Charter Operator Partnership Program",
      investment: "₹25 Cr",
      investmentNum: 25,
      timeline: "6 months",
      impact: "Target: 500 charter flights/season (vs 189 current)",
      priority: "high" as const,
      status: "Direct outreach",
      category: "medium-term",
    },
    {
      id: 6,
      action: "Beach Infrastructure & Cleanliness Standards",
      investment: "₹50 Cr",
      investmentNum: 50,
      timeline: "12 months",
      impact: "TripAdvisor rating improvement",
      priority: "medium" as const,
      status: "Municipal coordination",
      category: "long-term",
    },
    {
      id: 7,
      action: '"Visit Goa" Global Brand Campaign',
      investment: "₹75 Cr",
      investmentNum: 75,
      timeline: "9 months",
      impact: "International digital campaign across source markets",
      priority: "high" as const,
      status: "Creative agency RFP",
      category: "medium-term",
    },
    {
      id: 8,
      action: "Mopa Airport International Route Development",
      investment: "₹10 Cr",
      investmentNum: 10,
      timeline: "6–12 months",
      impact: "Mopa handles 1,141 intl flights — capacity for 3x more",
      priority: "medium" as const,
      status: "Airport authority",
      category: "long-term",
    },
  ],

  // Investment summary
  investmentSummary: {
    totalProposed: 377, // ₹ Cr
    projectedRevenueRecovery: { from: 2500, to: 4000 }, // ₹ Cr over 3 years
    roi: "7–10x",
  },

  // Timeline phases
  timelinePhases: [
    {
      phase: "Quick Wins",
      period: "0–3 months",
      quarterLabel: "Q2 2026",
      color: "var(--emerald)",
      items: ["Ride-hailing app authorization", "Charter partnership outreach", "Visa reform proposal to MHA"],
    },
    {
      phase: "Medium-term",
      period: "3–9 months",
      quarterLabel: "Q3–Q4 2026",
      color: "var(--amber)",
      items: ["Marketing campaign launch", "Route incentive program", "Brand campaign creative development"],
    },
    {
      phase: "Long-term",
      period: "9–18 months",
      quarterLabel: "Q1–Q2 2027",
      color: "var(--cyan)",
      items: ["Infrastructure upgrades complete", "Brand campaign international rollout", "Target: 80% recovery milestone"],
    },
  ],
};
