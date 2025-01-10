export interface Organization {
    id: string;
    name: string;
    logo: string;
    description: string;
    focus: string[];
    website: string;
  }
  
  export interface Volunteer {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    skills: string[];
    location: string;
  }
  
  export const organizations: Organization[] = [
    {
      id: 'org1',
      name: 'Tech for Good',
      logo: '/placeholder.svg?height=80&width=80',
      description: 'We use technology to solve social and environmental issues.',
      focus: ['Education', 'Environment', 'Healthcare'],
      website: 'https://techforgood.org',
    },
    {
      id: 'org2',
      name: 'Code for Change',
      logo: '/placeholder.svg?height=80&width=80',
      description: 'Empowering communities through open-source development.',
      focus: ['Civic Tech', 'Open Data', 'Digital Literacy'],
      website: 'https://codeforchange.org',
    },
    {
      id: 'org3',
      name: 'Green Earth Initiative',
      logo: '/placeholder.svg?height=80&width=80',
      description: 'Promoting sustainable practices and environmental awareness.',
      focus: ['Climate Action', 'Sustainability', 'Conservation'],
      website: 'https://greenearthinitiative.org',
    },
  ];
  
  export const volunteers: Volunteer[] = [
    {
      id: 'vol1',
      name: 'Alice Johnson',
      avatar: '/placeholder.svg?height=80&width=80',
      bio: 'Passionate developer with a focus on creating accessible web applications.',
      skills: ['JavaScript', 'React', 'Accessibility'],
      location: 'San Francisco, CA',
    },
    {
      id: 'vol2',
      name: 'Bob Smith',
      avatar: '/placeholder.svg?height=80&width=80',
      bio: 'Data scientist interested in applying ML to solve environmental challenges.',
      skills: ['Python', 'Machine Learning', 'Data Analysis'],
      location: 'New York, NY',
    },
    {
      id: 'vol3',
      name: 'Carol Martinez',
      avatar: '/placeholder.svg?height=80&width=80',
      bio: 'UX designer committed to creating user-friendly interfaces for non-profit organizations.',
      skills: ['UI/UX Design', 'Figma', 'User Research'],
      location: 'Chicago, IL',
    },
  ];
  
  