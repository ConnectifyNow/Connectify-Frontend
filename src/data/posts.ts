export interface Author {
    id: string;
    name: string;
    avatar: string;
    type: 'user' | 'association';
  }
  
  export interface Post {
    id: string;
    author: Author;
    title: string;
    content: string;
    skills: string[];
  }
  
  export const posts: Post[] = [
    {
      id: '1',
      author: {
        id: 'u1',
        name: 'John Doe',
        avatar: '/placeholder.svg?height=40&width=40',
        type: 'user',
      },
      title: 'Looking for a Coding Buddy',
      content: 'I\'m working on an open-source project and looking for a coding buddy. Anyone interested?',
      skills: ['JavaScript', 'React', 'Node.js'],
    },
    {
      id: '2',
      author: {
        id: 'a1',
        name: 'Tech for Good',
        avatar: '/placeholder.svg?height=40&width=40',
        type: 'association',
      },
      title: 'Volunteers Needed for Hackathon',
      content: 'We\'re organizing a hackathon to solve local community problems. Looking for developers and designers!',
      skills: ['Web Development', 'UI/UX', 'Problem Solving'],
    },
    {
      id: '3',
      author: {
        id: 'u2',
        name: 'Jane Smith',
        avatar: '/placeholder.svg?height=40&width=40',
        type: 'user',
      },
      title: 'Offering Mentorship in Data Science',
      content: 'I have 5 years of experience in Data Science and Machine Learning. Happy to mentor beginners!',
      skills: ['Python', 'Machine Learning', 'Data Analysis'],
    },
  ];
  
  export const allSkills = Array.from(new Set(posts.flatMap(post => post.skills))).sort();
  
  