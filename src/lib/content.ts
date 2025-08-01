export interface Content {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  price: number;
  author: string;
  category: string;
}

export const contentData: Content[] = [
  {
    id: 'deep-learning-fundamentals',
    title: 'Deep Learning Fundamentals',
    description: 'An introductory course to the world of neural networks and deep learning.',
    longDescription: 'Dive deep into the core concepts of deep learning. This course covers everything from basic neural networks to advanced architectures like CNNs and RNNs. Perfect for beginners and those looking to solidify their foundational knowledge. You will work on real-world projects and build a strong portfolio.',
    image: 'https://placehold.co/600x400.png',
    price: 49.99,
    author: 'Dr. Evelyn Reed',
    category: 'AI & ML',
  },
  {
    id: 'creative-writing-masterclass',
    title: 'Creative Writing Masterclass',
    description: 'Unleash your inner storyteller and write compelling narratives.',
    longDescription: 'This masterclass will guide you through the art of creative writing. Learn about character development, plot construction, world-building, and finding your unique voice. Through a series of workshops and writing exercises, you will craft your own short stories and receive peer feedback.',
    image: 'https://placehold.co/600x400.png',
    price: 29.99,
    author: 'Leo Tolstoy',
    category: 'Writing',
  },
  {
    id: 'quantum-computing-explained',
    title: 'Quantum Computing Explained',
    description: 'A simplified look into the complex world of quantum computers.',
    longDescription: 'Demystify the principles of quantum mechanics and how they apply to computing. This course breaks down complex topics like superposition, entanglement, and quantum algorithms into digestible modules. No advanced physics degree required!',
    image: 'https://placehold.co/600x400.png',
    price: 79.99,
    author: 'Dr. Aris Thorne',
    category: 'Science',
  },
  {
    id: 'the-art-of-minimalism',
    title: 'The Art of Minimalism',
    description: 'Learn how to live a more meaningful life with less.',
    longDescription: 'Explore the philosophy of minimalism and its practical applications in daily life. This course covers decluttering your physical space, managing digital noise, mindful consumption, and focusing on what truly matters. Start your journey towards a simpler, more intentional life.',
    image: 'https://placehold.co/600x400.png',
    price: 19.99,
    author: 'Fumio Sasaki',
    category: 'Lifestyle',
  },
  {
    id: 'advanced-javascript-techniques',
    title: 'Advanced JavaScript Techniques',
    description: 'Master modern JavaScript and write more efficient, powerful code.',
    longDescription: 'Go beyond the basics and explore advanced JavaScript concepts like closures, promises, async/await, modules, and functional programming. This course is for developers who want to deepen their understanding of the language and write professional-grade code.',
    image: 'https://placehold.co/600x400.png',
    price: 59.99,
    author: 'Jane Doe',
    category: 'Programming',
  },
  {
    id: 'introduction-to-neuroscience',
    title: 'Introduction to Neuroscience',
    description: 'Discover the secrets of the brain and nervous system.',
    longDescription: 'Embark on a journey into the human brain. This introductory course explores the structure and function of the nervous system, from individual neurons to complex brain networks responsible for thought, emotion, and behavior. A perfect starting point for aspiring neuroscientists.',
    image: 'https://placehold.co/600x400.png',
    price: 49.99,
    author: 'Dr. Sam Crick',
    category: 'Science',
  },
];

export function getAllContent(): Content[] {
  return contentData;
}

export function getContentById(id: string): Content | undefined {
  return contentData.find((content) => content.id === id);
}

export function getContentByIds(ids: string[]): Content[] {
    return contentData.filter(content => ids.includes(content.id));
}
