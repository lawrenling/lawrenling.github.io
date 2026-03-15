export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  description: string[];
  logo?: string;
  website?: string;
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  logo?: string;
  website?: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface ResumeData {
  name: string;
  titles: string[];
  intro: string;
  about: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: SkillGroup[];
  contact: {
    email: string;
    linkedin: string;
    github?: string;
  };
}
