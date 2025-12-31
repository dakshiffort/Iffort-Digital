export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  description: string;
  category: string;
  stats: { label: string; value: string }[];
  content: {
    challenge: string;
    approach: string;
    result: string;
    quote?: string;
  };
  image: string;
  tags: string[];
}

export interface Testimonial {
  text: string;
  author: string;
  role: string;
  company: string;
}

export interface Client {
  name: string;
  logo: string;
}