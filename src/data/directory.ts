import { FocusArea, Organization, Skill, Volunteer } from "@/types";

const focusAreas: FocusArea[] = [
  { _id: "1", name: "Education" },
  { _id: "2", name: "Health" },
  { _id: "3", name: "Environment" },
  { _id: "4", name: "Community Development" },
  { _id: "5", name: "Arts & Culture" },
  { _id: "6", name: "Technology" },
  { _id: "7", name: "Human Rights" },
  { _id: "8", name: "Animal Welfare" },
  { _id: "9", name: "Disaster Relief" },
  { _id: "10", name: "Sports & Recreation" }
];

const skills: Skill[] = [
  { _id: "1", name: "React" },
  { _id: "2", name: "Node.js" },
  { _id: "3", name: "TypeScript" },
  { _id: "4", name: "Python" },
  { _id: "5", name: "Project Management" },
  { _id: "6", name: "Graphic Design" },
  { _id: "7", name: "Data Analysis" },
  { _id: "8", name: "Public Speaking" },
  { _id: "9", name: "Content Writing" },
  { _id: "10", name: "SEO" },
  { _id: "11", name: "Marketing" },
  { _id: "12", name: "Fundraising" },
  { _id: "13", name: "Event Planning" },
  { _id: "14", name: "Web Development" },
  { _id: "15", name: "Cybersecurity" }
];

function getRandomItems<T>(items: T[], count: number): T[] {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const organizations: Organization[] = [
  {
    userId: "org1",
    name: "Tech for Good",
    description: "We use technology to solve social and environmental issues.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://techforgood.org",
    city: "San Francisco, CA"
  },
  {
    userId: "org2",
    name: "Code for Change",
    description: "Empowering communities through open-source development.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://codeforchange.org",
    city: "San Francisco, CA"
  },
  {
    userId: "org3",
    name: "Code for Change",
    description: "Empowering communities through open-source development.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://codeforchange.org",
    city: "San Francisco, CA"
  },
  {
    userId: "org4",
    name: "Code for Change",
    description: "Empowering communities through open-source development.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://codeforchange.org",
    city: "San Francisco, CA"
  },
  {
    userId: "org5",
    name: "Code for Change",
    description: "Empowering communities through open-source development.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://codeforchange.org",
    city: "San Francisco, CA"
  },
  {
    userId: "org6",
    name: "Code for Change",
    description: "Empowering communities through open-source development.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://codeforchange.org",
    city: "San Francisco, CA"
  },
  {
    userId: "org7",
    name: "Green Earth Initiative",
    description: "Promoting sustainable practices and environmental awareness.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://greenearthinitiative.org",
    city: "San Francisco, CA"
  }
];

export const volunteers: Volunteer[] = [
  {
    userId: "1",
    firstName: "Alice",
    lastName: "Johnson",
    about:
      "Passionate developer with a focus on creating accessible web applications.",
    skills: getRandomItems(skills, 3),
    city: "San Francisco, CA",
    phone: "555-555-5555",
    age: 25
  },
  {
    userId: "2",
    firstName: "Bob",
    lastName: "Smith",
    about:
      "Data scientist interested in applying ML to solve environmental challenges.",
    skills: getRandomItems(skills, 3),
    city: "New York, NY",
    phone: "555-555-5555",
    age: 25
  },
  {
    userId: "3",
    firstName: "Bob",
    lastName: "Smith",
    about:
      "Data scientist interested in applying ML to solve environmental challenges.",
    skills: getRandomItems(skills, 3),
    city: "New York, NY",
    phone: "555-555-5555",
    age: 25
  },
  {
    userId: "4",
    firstName: "Bob",
    lastName: "Smith",
    about:
      "Data scientist interested in applying ML to solve environmental challenges.",
    skills: getRandomItems(skills, 3),
    city: "New York, NY",
    phone: "555-555-5555",
    age: 25
  },
  {
    userId: "5",
    firstName: "Bob",
    lastName: "Smith",
    about:
      "Data scientist interested in applying ML to solve environmental challenges.",
    skills: getRandomItems(skills, 3),
    city: "New York, NY",
    phone: "555-555-5555",
    age: 25
  },
  {
    userId: "6",
    firstName: "Bob",
    lastName: "Smith",
    about:
      "Data scientist interested in applying ML to solve environmental challenges.",
    skills: getRandomItems(skills, 3),
    city: "New York, NY",
    phone: "555-555-5555",
    age: 25
  },
  {
    userId: "7",
    firstName: "Bob",
    lastName: "Smith",
    about:
      "Data scientist interested in applying ML to solve environmental challenges.",
    skills: getRandomItems(skills, 3),
    city: "New York, NY",
    phone: "555-555-5555",
    age: 25
  },
  {
    userId: "8",
    firstName: "Carol",
    lastName: "Martinez",
    about:
      "UX designer committed to creating user-friendly interfaces for non-profit organizations.",
    skills: getRandomItems(skills, 3),
    city: "Chicago, IL",
    phone: "555-555-5555",
    age: 25
  }
];
