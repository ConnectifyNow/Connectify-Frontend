import { Skill, Post } from "../types";

export const skills: Skill[] = [
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

export const posts: Post[] = [
  {
    _id: "1",
    author: {
      _id: "u1",
      name: "John Doe",
      type: "user"
    },
    title: "Looking for a Coding Buddy",
    content:
      "I'm working on an open-source project and looking for a coding buddy. Anyone interested?",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0
  },
  {
    _id: "2",
    author: {
      _id: "a1",
      name: "Tech for Good",
      type: "organization"
    },
    title: "Volunteers Needed for Hackathon",
    content:
      "We're organizing a hackathon to solve local community problems. Looking for developers and designers!",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0
  },
  {
    _id: "3",
    author: {
      _id: "u2",
      name: "Jane Smith",
      type: "user"
    },
    title: "Offering Mentorship in Data Science",
    content:
      "I have 5 years of experience in Data Science and Machine Learning. Happy to mentor beginners!",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0
  },
  {
    _id: "4",
    author: {
      _id: "u2",
      name: "Jaגדשגשדne Smith",
      type: "user"
    },
    title: "Offering Mentorship in Data Science",
    content:
      "I have 5 years of experience in Data Science and Machine Learning. Happy to mentor beginners!",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0
  },
  {
    _id: "5",
    author: {
      _id: "u2",
      name: "Jane Smith",
      type: "user"
    },
    title: "Offering Mentorship in Data Science",
    content:
      "I have 5 years of experience in Data Science and Machine Learning. Happy to mentor beginners!",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0
  },
  {
    _id: "6",
    author: {
      _id: "u2",
      name: "Jane Smith",
      type: "user"
    },
    title: "Offering Mentorship in Data Science",
    content:
      "I have 5 years of experience in Data Science and Machine Learning. Happy to mentor beginners!",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0
  },
  {
    _id: "7",
    author: {
      _id: "u2",
      name: "Jane Smith",
      type: "user"
    },
    title: "Offering Mentorship in Data Science",
    content:
      "I have 5 years of experience in Data Science and Machine Learning. Happy to mentor beginners!",
    skills: getRandomItems(skills, 3),
    comments: [],
    likes: 0
  }
];
