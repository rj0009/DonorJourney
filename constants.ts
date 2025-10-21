
import { Campaign, CauseArea } from './types';

export const CAUSE_AREAS: CauseArea[] = [
  CauseArea.Children,
  CauseArea.Seniors,
  CauseArea.Disability,
  CauseArea.Families,
  CauseArea.Health,
  CauseArea.Community,
  CauseArea.Arts,
  CauseArea.Environment,
];

export const ALL_CAMPAIGNS: Omit<Campaign, 'id'>[] = [
  {
    name: "Bright Start for Every Child",
    ngo: "Children's Society",
    causeArea: CauseArea.Children,
    location: "Islandwide",
    description: "Providing educational resources and safe spaces for underprivileged children across Singapore.",
    fundingStatus: { current: 35000, goal: 100000 },
    targetAudience: "Children from low-income families",
    imageUrl: "https://picsum.photos/seed/child1/600/400"
  },
  {
    name: "Golden Years, Active Minds",
    ngo: "TOUCH Community Services",
    causeArea: CauseArea.Seniors,
    location: "Toa Payoh",
    description: "Engaging seniors with activities that promote mental and physical well-being to combat loneliness.",
    fundingStatus: { current: 15000, goal: 50000 },
    targetAudience: "Seniors living alone",
    imageUrl: "https://picsum.photos/seed/seniors2/600/400"
  },
  {
    name: "Enable & Empower",
    ngo: "AWWA",
    causeArea: CauseArea.Disability,
    location: "Redhill",
    description: "Supporting persons with disabilities through therapy, skill development, and integration programs.",
    fundingStatus: { current: 80000, goal: 150000 },
    targetAudience: "Persons with physical or intellectual disabilities",
    imageUrl: "https://picsum.photos/seed/disability3/600/400"
  },
  {
    name: "Strengthening Family Ties",
    ngo: "Fei Yue Community Services",
    causeArea: CauseArea.Families,
    location: "Bukit Batok",
    description: "Offering counselling and support services to help families navigate challenges and build resilience.",
    fundingStatus: { current: 22000, goal: 60000 },
    targetAudience: "Families in distress",
    imageUrl: "https://picsum.photos/seed/family4/600/400"
  },
  {
    name: "Health for All",
    ngo: "Singapore General Hospital",
    causeArea: CauseArea.Health,
    location: "Outram",
    description: "Funding medical research and providing financial assistance to patients in need of critical care.",
    fundingStatus: { current: 250000, goal: 1000000 },
    targetAudience: "Patients with critical illnesses",
    imageUrl: "https://picsum.photos/seed/health5/600/400"
  },
  {
    name: "Our Community Garden",
    ngo: "Ground-Up Initiative (GUI)",
    causeArea: CauseArea.Community,
    location: "Yishun",
    description: "Building community bonds by creating shared green spaces for residents to connect with nature and each other.",
    fundingStatus: { current: 5000, goal: 20000 },
    targetAudience: "Residents of all ages",
    imageUrl: "https://picsum.photos/seed/community6/600/400"
  },
  {
    name: "Heritage Keepers",
    ngo: "National Heritage Board",
    causeArea: CauseArea.Arts,
    location: "Islandwide",
    description: "Preserving and promoting Singapore's rich cultural heritage through exhibitions and educational programs.",
    fundingStatus: { current: 18000, goal: 75000 },
    targetAudience: "General public, students",
    imageUrl: "https://picsum.photos/seed/arts7/600/400"
  },
  {
    name: "Green Singapore",
    ngo: "Nature Society (Singapore)",
    causeArea: CauseArea.Environment,
    location: "Islandwide",
    description: "Protecting Singapore's natural habitats and biodiversity through conservation efforts and public advocacy.",
    fundingStatus: { current: 40000, goal: 120000 },
    targetAudience: "Nature lovers, environmental advocates",
    imageUrl: "https://picsum.photos/seed/enviro8/600/400"
  }
].map((c, i) => ({ ...c, id: `campaign-${i + 1}` }));
