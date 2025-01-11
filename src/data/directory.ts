import { FocusArea, Organization, Skill, Volunteer } from "@/types";

const focusAreas: FocusArea[] = [
  { id: 1, name: "Education" },
  { id: 2, name: "Health" },
  { id: 3, name: "Environment" },
  { id: 4, name: "Community Development" },
  { id: 5, name: "Arts & Culture" },
  { id: 6, name: "Technology" },
  { id: 7, name: "Human Rights" },
  { id: 8, name: "Animal Welfare" },
  { id: 9, name: "Disaster Relief" },
  { id: 10, name: "Sports & Recreation" },
];

const skills: Skill[] = [
  { id: 1, name: "React" },
  { id: 2, name: "Node.js" },
  { id: 3, name: "TypeScript" },
  { id: 4, name: "Python" },
  { id: 5, name: "Project Management" },
  { id: 6, name: "Graphic Design" },
  { id: 7, name: "Data Analysis" },
  { id: 8, name: "Public Speaking" },
  { id: 9, name: "Content Writing" },
  { id: 10, name: "SEO" },
  { id: 11, name: "Marketing" },
  { id: 12, name: "Fundraising" },
  { id: 13, name: "Event Planning" },
  { id: 14, name: "Web Development" },
  { id: 15, name: "Cybersecurity" },
];

function getRandomItems<T>(items: T[], count: number): T[] {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const organizations: Organization[] = [
  {
    id: "org1",
    name: "Tech for Good",
    description: "We use technology to solve social and environmental issues.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://techforgood.org",
    city: "San Francisco, CA",
  },
  {
    id: "org2",
    name: "Code for Change",
    description: "Empowering communities through open-source development.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://codeforchange.org",
    city: "San Francisco, CA",
  },
  {
    id: "org2",
    name: "Code for Change",
    description: "Empowering communities through open-source development.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://codeforchange.org",
    city: "San Francisco, CA",
  },
  {
    id: "org2",
    name: "Code for Change",
    description: "Empowering communities through open-source development.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://codeforchange.org",
    city: "San Francisco, CA",
  },
  {
    id: "org2",
    name: "Code for Change",
    description: "Empowering communities through open-source development.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://codeforchange.org",
    city: "San Francisco, CA",
  },
  {
    id: "org2",
    name: "Code for Change",
    description: "Empowering communities through open-source development.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://codeforchange.org",
    city: "San Francisco, CA",
  },
  {
    id: "org3",
    name: "Green Earth Initiative",
    description: "Promoting sustainable practices and environmental awareness.",
    focusAreas: getRandomItems(focusAreas, 3),
    websiteLink: "https://greenearthinitiative.org",
    city: "San Francisco, CA",
  },
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
    age: 25,
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
    age: 25,
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
    age: 25,
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
    age: 25,
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
    age: 25,
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
    age: 25,
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
    age: 25,
  },
  {
    userId: "3",
    firstName: "Carol",
    lastName: "Martinez",
    about:
      "UX designer committed to creating user-friendly interfaces for non-profit organizations.",
    skills: getRandomItems(skills, 3),
    city: "Chicago, IL",
    phone: "555-555-5555",
    age: 25,
  },
];
