import { Shield, Heart, Wallet, Activity, Umbrella, Gift, Stethoscope } from 'lucide-react';

export const INSURANCE_POLICIES = [
  {
    id: 1,
    name: "LIC's Aadhaar Shila",
    tagline: "Secure savings + life cover for women with Aadhaar",
    description: "Exclusive plan designed for female policyholders with Aadhaar",
    category: "Life Insurance",
    icon: Shield,
    color: "violet",
    details: {
      policyTerm: "15 to 30 years",
      minPremium: "₹500/month",
      forWhom: "Women with Aadhaar card",
      sumAssured: "Up to 50 times of annual premium",
      benefits: [
        "Exclusive plan for women with Aadhaar",
        "Low premium starting at ₹500/month",
        "Guaranteed returns + bonus",
        "Financial support for family",
        "Tax benefits under Section 80C"
      ],
      keyPoints: [
        "Must have valid Aadhaar card",
        "Entry age: 18-50 years",
        "Loan facility available after 3 years",
        "Premium paying term options: 10, 15, 20 years"
      ]
    }
  },
  {
    id: 2,
    name: "LIC's Jeevan Labh",
    tagline: "Save now, get big returns later!",
    description: "Limited premium paying, non-linked, with-profits endowment plan",
    category: "Savings",
    icon: Wallet,
    color: "emerald",
    details: {
      policyTerm: "16 to 25 years",
      minPremium: "₹1,000/month",
      forWhom: "Women aged 8 to 59 years",
      sumAssured: "Minimum ₹2 lakhs with no upper limit",
      benefits: [
        "Guaranteed maturity benefits",
        "Additional bonus accumulation",
        "Flexible premium payment terms",
        "Tax benefits on premium and returns",
        "Loan facility available"
      ],
      keyPoints: [
        "Premium paying term: Limited period",
        "Death benefit: Sum assured + bonus",
        "Maturity benefit: Sum assured + bonus",
        "Premium payment modes: Monthly, Quarterly, Half-yearly, Yearly"
      ]
    }
  },
  {
    id: 3,
    name: "LIC's Jeevan Utsav",
    tagline: "Yearly income benefits + life cover",
    description: "Non-linked, non-participating, individual savings life insurance plan",
    category: "Income",
    icon: Gift,
    color: "amber",
    details: {
      policyTerm: "Whole life",
      minPremium: "₹1,500/month",
      forWhom: "Women seeking regular income",
      sumAssured: "Based on premium and term selected",
      benefits: [
        "Regular income benefit option",
        "Flexi income benefit option",
        "Whole life coverage",
        "Guaranteed additions",
        "Return of premiums option"
      ],
      keyPoints: [
        "Choice of income benefit options",
        "Premium paying term: 10, 15, 20 years",
        "Income starts after premium paying term",
        "Additional protection through riders"
      ]
    }
  },
  {
    id: 4,
    name: "LIC's Jeevan Arogya",
    tagline: "Complete health coverage for your family",
    description: "Non-participating health insurance plan",
    category: "Health",
    icon: Stethoscope,
    color: "blue",
    details: {
      policyTerm: "Annual renewable",
      minPremium: "₹800/month",
      forWhom: "Women seeking health coverage",
      sumAssured: "Varies by benefit and plan option",
      benefits: [
        "Daily hospital cash benefit",
        "Major surgical benefit",
        "Day care procedure benefit",
        "Recovery benefit",
        "Ambulance charges covered"
      ],
      keyPoints: [
        "No medical examination up to age 45",
        "Coverage for pre-existing diseases after 4 years",
        "Tax benefits under Section 80D",
        "Renewable till age 80"
      ]
    }
  },
  {
    id: 5,
    name: "LIC's New Endowment Plan",
    tagline: "Save money & get full life protection",
    description: "Traditional endowment assurance plan",
    category: "Endowment",
    icon: Heart,
    color: "pink",
    details: {
      policyTerm: "12 to 35 years",
      minPremium: "₹2,000/month",
      forWhom: "Women planning for future security",
      sumAssured: "Minimum ₹1 lakh",
      benefits: [
        "Guaranteed maturity amount",
        "Bonus additions",
        "Financial protection",
        "Loan facility",
        "Tax benefits"
      ],
      keyPoints: [
        "Entry age: 8 to 55 years",
        "Premium paying term equals policy term",
        "Multiple premium payment modes",
        "Optional riders available"
      ]
    }
  },
  {
    id: 6,
    name: "LIC's New Jeevan Anand",
    tagline: "Lifetime protection + savings for big dreams",
    description: "Endowment plan with whole life coverage",
    category: "Life Insurance",
    icon: Umbrella,
    color: "indigo",
    details: {
      policyTerm: "15 to 35 years",
      minPremium: "₹2,500/month",
      forWhom: "Women seeking lifetime protection",
      sumAssured: "Minimum ₹1 lakh",
      benefits: [
        "Whole life coverage",
        "Maturity benefit",
        "Death benefit throughout life",
        "Participation in profits",
        "Optional riders"
      ],
      keyPoints: [
        "Basic sum assured payable on maturity",
        "Death benefit continues after maturity",
        "Additional bonus accumulation",
        "Loan facility available"
      ]
    }
  },
  {
    id: 7,
    name: "LIC's Jeevan Umang",
    tagline: "Get yearly payouts & lifelong security",
    description: "Whole life participating plan with periodic payments",
    category: "Income",
    icon: Activity,
    color: "rose",
    details: {
      policyTerm: "Until age 100",
      minPremium: "₹5,000/month",
      forWhom: "Women seeking regular income",
      sumAssured: "Minimum ₹2 lakhs",
      benefits: [
        "Annual survival benefits",
        "Whole life coverage",
        "Loyalty additions",
        "Premium waiver in specific cases",
        "Multiple premium payment options"
      ],
      keyPoints: [
        "Premium paying terms: 15, 20, 25, 30 years",
        "Survival benefits from end of premium term",
        "Death benefit: Sum assured + bonuses",
        "Additional rider benefits available"
      ]
    }
  }
];