export type MilestoneLink = {
  label: string;
  url: string;
};

export type Milestone = {
  id: string;
  order: number;
  title: string;
  shortDescription: string;
  guidance: string;
  links: MilestoneLink[];
};

export const milestones: Milestone[] = [
  {
    id: "get-finance-ready",
    order: 1,
    title: "Get finance ready",
    shortDescription:
      "Understand your borrowing power, budget limits, and likely upfront costs before you begin looking.",
    guidance:
      "Start by reviewing your income, expenses, existing debts, and savings so you have a realistic picture of what you can afford. A lender or broker can provide pre-approval guidance, but you should still keep a safety buffer for interest rate changes and one-off costs.\n\nIn NSW, first home buyers should map out stamp duty outcomes early, because exemptions or concessions can materially change the cash needed at purchase. Build a simple purchase budget that includes deposit, legal fees, inspections, insurance, and moving costs so you are not forced into rushed decisions later.",
    links: [
      {
        label: "NSW Government: Buying a property",
        url: "https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property/buying-a-property",
      },
      {
        label: "Revenue NSW: Transfer duty",
        url: "https://www.revenue.nsw.gov.au/taxes-duties-levies-royalties/transfer-duty",
      },
    ],
  },
  {
    id: "define-your-search",
    order: 2,
    title: "Define your search",
    shortDescription:
      "Set clear criteria for location, property type, and must-have features so you can compare options consistently.",
    guidance:
      "Write down your non-negotiables, nice-to-haves, and absolute budget ceiling before you inspect homes. Include practical factors like commute time, school zones, strata levies, flood or bushfire exposure, and likely renovation requirements.\n\nA structured shortlist helps you avoid emotional over-bidding and keeps your search efficient. Re-check suburb-level guidance and planning context as you go, especially if you are considering apartments, new developments, or areas with known natural hazard risks.",
    links: [
      {
        label: "NSW Government: Buying a property",
        url: "https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property/buying-a-property",
      },
      {
        label: "NSW Fair Trading: Buying and selling property",
        url: "https://www.fairtrading.nsw.gov.au/housing-and-property/buying-and-selling-property",
      },
    ],
  },
  {
    id: "inspect-properties",
    order: 3,
    title: "Inspect properties",
    shortDescription:
      "Inspect each property carefully and collect evidence so you can compare condition, value, and risk.",
    guidance:
      "Attend multiple inspections and document what you see, including signs of damp, cracking, drainage issues, or urgent repairs. Ask the selling agent for key documents and note what is included in the sale.\n\nFor strata properties, request records and pay attention to upcoming capital works, defects, and by-law restrictions. Taking notes and photos across several properties makes it easier to make objective decisions and prevents costly oversights.",
    links: [
      {
        label: "NSW Fair Trading: Buying property",
        url: "https://www.fairtrading.nsw.gov.au/housing-and-property/buying-and-selling-property/buying-a-property",
      },
      {
        label: "NSW Government: Buying a property",
        url: "https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property/buying-a-property",
      },
    ],
  },
  {
    id: "make-an-offer-or-bid-at-auction",
    order: 4,
    title: "Make an offer or bid at auction",
    shortDescription:
      "Choose a purchase strategy and set firm limits before negotiating or bidding.",
    guidance:
      "For private treaty sales, submit offers in writing with clear terms and expiration windows so negotiations stay controlled. Keep your solicitor or conveyancer informed before anything is signed.\n\nAt auction, understand that there is generally no cooling-off period and contracts are typically unconditional once the hammer falls. Set a hard walk-away price in advance and stick to it, even when competition is intense.",
    links: [
      {
        label: "NSW Fair Trading: Auctions",
        url: "https://www.fairtrading.nsw.gov.au/housing-and-property/buying-and-selling-property/property-auctions",
      },
      {
        label: "NSW Government: Buying at auction",
        url: "https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property/buying-property-at-auction",
      },
    ],
  },
  {
    id: "pre-purchase-due-diligence",
    order: 5,
    title: "Pre-purchase due diligence",
    shortDescription:
      "Confirm legal, structural, and planning details before you commit to the purchase.",
    guidance:
      "Ask your conveyancer or solicitor to review the contract for sale, title details, easements, exclusions, and special conditions. Arrange relevant inspections such as building, pest, and strata report checks where appropriate.\n\nDue diligence should also include reviewing council and planning matters, potential hazards, and any restrictions that affect renovations or future use. Doing these checks early reduces the risk of expensive surprises after exchange.",
    links: [
      {
        label: "NSW Fair Trading: Conveyancing and contracts",
        url: "https://www.fairtrading.nsw.gov.au/housing-and-property/buying-and-selling-property/conveyancing-and-contracts",
      },
      {
        label: "NSW Government: Buying a property",
        url: "https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property/buying-a-property",
      },
    ],
  },
  {
    id: "exchange-contracts",
    order: 6,
    title: "Exchange contracts",
    shortDescription:
      "Exchange signed contracts and pay the deposit so the transaction becomes legally binding.",
    guidance:
      "Exchange happens when both parties sign and swap contracts, usually with a deposit paid by the buyer. From this point, legal obligations apply and key dates such as settlement are fixed unless both sides agree otherwise.\n\nMake sure your finance, insurance timing, and legal review are aligned before exchange. If terms are unclear, confirm them in writing through your legal representative before proceeding.",
    links: [
      {
        label: "NSW Fair Trading: Contracts and deposits",
        url: "https://www.fairtrading.nsw.gov.au/housing-and-property/buying-and-selling-property/contracts-and-deposits",
      },
      {
        label: "NSW Government: Buying a property",
        url: "https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property/buying-a-property",
      },
    ],
  },
  {
    id: "cooling-off-period",
    order: 7,
    title: "Cooling-off period",
    shortDescription:
      "Use the cooling-off window (when available) to finalise checks and confirm commitment.",
    guidance:
      "In NSW private treaty purchases, a cooling-off period usually applies unless it has been waived or excluded. During this period, you can complete final inspections, secure finance confirmation, and resolve legal questions.\n\nIf you choose to withdraw, penalties can apply, so obtain legal advice before taking action. Remember that auction purchases and some other transaction types may not include cooling-off rights.",
    links: [
      {
        label: "NSW Fair Trading: Cooling-off periods",
        url: "https://www.fairtrading.nsw.gov.au/housing-and-property/buying-and-selling-property/cooling-off-periods",
      },
      {
        label: "NSW Government: Buying a property",
        url: "https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property/buying-a-property",
      },
    ],
  },
  {
    id: "apply-for-grants-and-concessions",
    order: 8,
    title: "Apply for grants and concessions (FHBAS, FHOG, First Home Guarantee, Help to Buy)",
    shortDescription:
      "Apply early for available schemes so your funding and duty outcomes are locked in before settlement.",
    guidance:
      "Check your eligibility for the First Home Buyer Assistance Scheme and First Home Owner Grant as early as possible, because your lender or conveyancer may need documents before settlement. Confirm property value thresholds and occupancy conditions to avoid losing benefits.\n\nIf you are considering the First Home Guarantee or Help to Buy pathway, plan timelines with your lender and adviser so approvals align with contract dates. Keep a checklist of evidence and submission deadlines to reduce last-minute risk.",
    links: [
      {
        label: "Revenue NSW: First Home Buyer Assistance Scheme",
        url: "https://www.revenue.nsw.gov.au/grants-schemes/first-home-buyer",
      },
      {
        label: "Revenue NSW: First Home Owner Grant (new homes)",
        url: "https://www.revenue.nsw.gov.au/grants-schemes/first-home-owner-grant-new-homes",
      },
      {
        label: "NSW Government: Help to Buy",
        url: "https://www.nsw.gov.au/housing-and-construction/help-to-buy",
      },
    ],
  },
  {
    id: "settlement-preparation",
    order: 9,
    title: "Settlement preparation",
    shortDescription:
      "Finalise finance, insurance, and paperwork so settlement can proceed without delays.",
    guidance:
      "Before settlement, complete lender requirements, sign mortgage documents, and ensure funds are available for all remaining amounts. Arrange building insurance from the required date in your contract.\n\nBook a final inspection shortly before settlement to confirm the property condition and inclusions match the contract. Coordinate closely with your conveyancer, lender, and agent so any issues are identified early and resolved in time.",
    links: [
      {
        label: "NSW Fair Trading: Settlement process",
        url: "https://www.fairtrading.nsw.gov.au/housing-and-property/buying-and-selling-property/settlement",
      },
      {
        label: "NSW Government: Buying a property",
        url: "https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property/buying-a-property",
      },
    ],
  },
  {
    id: "settlement-and-moving-in",
    order: 10,
    title: "Settlement and moving in",
    shortDescription:
      "Complete settlement, collect keys, and organise essential post-purchase setup tasks.",
    guidance:
      "On settlement day, legal and financial representatives complete the transfer process and ownership moves to you. Once confirmed, you can collect keys and take possession under the contract terms.\n\nAfter moving in, set up utilities, update your address, and keep all purchase records in one place for future reference. If issues arise after settlement, speak with your legal adviser promptly to understand next steps.",
    links: [
      {
        label: "NSW Fair Trading: Settlement",
        url: "https://www.fairtrading.nsw.gov.au/housing-and-property/buying-and-selling-property/settlement",
      },
      {
        label: "NSW Government: Buying and selling property hub",
        url: "https://www.nsw.gov.au/housing-and-construction/buying-and-selling-property",
      },
    ],
  },
];
