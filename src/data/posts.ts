import { Skill, Post } from "../types";

export const skills: Skill[] = [
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

export const posts: Post[] = [
  {
    id: "1",
    author: {
      id: "u1",
      name: "John Doe",
      type: "user",
    },
    title: "Looking for a Coding Buddy",
    content:
      "I'm working on an open-source project and looking for a coding buddy. Anyone interested?",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0,
  },
  {
    id: "2",
    author: {
      id: "a1",
      name: "Tech for Good",
      type: "organization",
    },
    title: "Volunteers Needed for Hackathon",
    content:
      "We're organizing a hackathon to solve local community problems. Looking for developers and designers!",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0,
  },
  {
    id: "3",
    author: {
      id: "u2",
      name: "Jane Smith",
      type: "user",
    },
    title: "Offering Mentorship in Data Science",
    content:
      "I have 5 years of experience in Data Science and Machine Learning. Happy to mentor beginners!",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0,
  },
  {
    id: "4",
    author: {
      id: "u2",
      name: "Jaגדשגשדne Smith",
      type: "user",
    },
    title: "Offering Mentorship in Data Science",
    content:
      "I have 5 years of experience in Data Science and Machine Learning. Happy to mentor beginners!",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0,
  },
  {
    id: "5",
    author: {
      id: "u2",
      name: "Jane Smith",
      type: "user",
    },
    title: "Offering Mentorship in Data Science",
    content:
      "I have 5 years of experience in Data Science and Machine Learning. Happy to mentor beginners!",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0,
  },
  {
    id: "6",
    author: {
      id: "u2",
      name: "Jane Smith",
      type: "user",
    },
    title: "Offering Mentorship in Data Science",
    content:
      "I have 5 years of experience in Data Science and Machine Learning. Happy to mentor beginners!",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0,
  },
  {
    id: "7",
    author: {
      id: "u2",
      name: "Jane Smith",
      type: "user",
    },
    title: "Offering Mentorship in Data Science",
    content:
      "I have 5 years of experience in Data Science and Machine Learning. Happy to mentor beginners!",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0,
  },
];
