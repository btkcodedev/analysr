export interface BusinessCategory {
  id: string;
  label: string;
  substacks: SubStack[];
}

export interface SubStack {
  id: string;
  label: string;
}

export const businessCategories: BusinessCategory[] = [
  {
    id: "technology",
    label: "Technology & Digital",
    substacks: [
      { id: "software", label: "Software Development" },
      { id: "it-services", label: "IT Services" },
      { id: "cloud", label: "Cloud Solutions" },
      { id: "cybersecurity", label: "Cybersecurity" },
      { id: "ai-ml", label: "AI & Machine Learning" },
      { id: "blockchain", label: "Blockchain & Web3" },
      { id: "iot", label: "IoT & Hardware" },
      { id: "mobile", label: "Mobile Development" },
    ],
  },
  {
    id: "restaurants",
    label: "Restaurants & Food Service",
    substacks: [
      { id: "fine-dining", label: "Fine Dining" },
      { id: "casual-dining", label: "Casual Dining" },
      { id: "fast-food", label: "Fast Food" },
      { id: "cafe", label: "Café & Coffee Shops" },
      { id: "bakery", label: "Bakery" },
      { id: "food-truck", label: "Food Trucks" },
      { id: "catering", label: "Catering Services" },
      { id: "desserts", label: "Dessert Specialists" },
    ],
  },
  {
    id: "retail",
    label: "Retail & Commerce",
    substacks: [
      { id: "fashion", label: "Fashion & Apparel" },
      { id: "electronics", label: "Electronics" },
      { id: "home-goods", label: "Home & Living" },
      { id: "sports", label: "Sports & Outdoors" },
      { id: "books", label: "Books & Media" },
      { id: "beauty", label: "Beauty & Cosmetics" },
      { id: "jewelry", label: "Jewelry & Accessories" },
      { id: "toys", label: "Toys & Games" },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare & Wellness",
    substacks: [
      { id: "medical-practice", label: "Medical Practice" },
      { id: "dental", label: "Dental Services" },
      { id: "mental-health", label: "Mental Health" },
      { id: "physical-therapy", label: "Physical Therapy" },
      { id: "pharmacy", label: "Pharmacy" },
      { id: "wellness", label: "Wellness & Spa" },
      { id: "nutrition", label: "Nutrition & Diet" },
      { id: "fitness", label: "Fitness & Training" },
    ],
  },
  {
    id: "professional",
    label: "Professional Services",
    substacks: [
      { id: "consulting", label: "Business Consulting" },
      { id: "legal", label: "Legal Services" },
      { id: "accounting", label: "Accounting & Finance" },
      { id: "marketing", label: "Marketing & PR" },
      { id: "real-estate", label: "Real Estate" },
      { id: "hr", label: "HR & Recruitment" },
      { id: "design", label: "Design & Creative" },
      { id: "education", label: "Education & Training" },
    ],
  },
  {
    id: "entertainment",
    label: "Entertainment & Media",
    substacks: [
      { id: "gaming", label: "Gaming & eSports" },
      { id: "streaming", label: "Streaming Services" },
      { id: "music", label: "Music & Audio" },
      { id: "film", label: "Film & Video" },
      { id: "events", label: "Events & Live Shows" },
      { id: "publishing", label: "Digital Publishing" },
      { id: "art", label: "Art & Culture" },
      { id: "podcasting", label: "Podcasting" },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing & Industry",
    substacks: [
      { id: "automotive", label: "Automotive" },
      { id: "electronics-mfg", label: "Electronics Manufacturing" },
      { id: "textiles", label: "Textiles & Apparel" },
      { id: "food-bev", label: "Food & Beverage" },
      { id: "machinery", label: "Machinery & Tools" },
      { id: "chemicals", label: "Chemicals & Materials" },
      { id: "packaging", label: "Packaging Solutions" },
      { id: "green-tech", label: "Green Technology" },
    ],
  },
];
