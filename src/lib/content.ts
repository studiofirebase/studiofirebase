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
    id: 'classic-cheeseburger',
    title: 'Classic Cheeseburger',
    description: 'O sabor inconfundível de um clássico americano. Simples e perfeito.',
    longDescription: 'Nosso Classic Cheeseburger é feito com um suculento hambúrguer de carne 100% bovina, queijo cheddar derretido, picles, cebola, ketchup e mostarda, tudo em um pão de brioche macio e tostado. Uma homenagem aos sabores que nunca saem de moda.',
    image: 'https://placehold.co/600x400.png',
    price: 29.99,
    author: 'Chef Hamburgueiro',
    category: 'Clássicos',
  },
  {
    id: 'bacon-supreme',
    title: 'Bacon Supreme',
    description: 'Para os amantes de bacon, uma explosão de sabor defumado.',
    longDescription: 'O Bacon Supreme leva o bacon a sério. São fatias crocantes de bacon defumado sobre um hambúrguer de picanha, com queijo suíço, maionese de alho e cebola caramelizada. Uma experiência intensa e inesquecível.',
    image: 'https://placehold.co/600x400.png',
    price: 34.99,
    author: 'Chef Hamburgueiro',
    category: 'Especiais',
  },
  {
    id: 'veggie-paradise',
    title: 'Veggie Paradise',
    description: 'Um hambúrguer vegetariano que vai surpreender seu paladar.',
    longDescription: 'Quem disse que hambúrguer vegetariano não tem graça? O Veggie Paradise é feito com um hambúrguer à base de grão de bico e cogumelos, coberto com queijo de cabra, rúcula, tomate seco e um delicioso molho pesto. É o paraíso dos vegetarianos.',
    image: 'https://placehold.co/600x400.png',
    price: 32.99,
    author: 'Chef Hamburgueiro',
    category: 'Vegetarianos',
  },
  {
    id: 'spicy-jalapeno',
    title: 'Spicy Jalapeño',
    description: 'Para quem gosta de um toque picante e ousado.',
    longDescription: 'Aqueça as coisas com o nosso Spicy Jalapeño. Um hambúrguer de costela, queijo pepper jack, rodelas de pimenta jalapeño, nachos crocantes e um molho chipotle picante. Uma combinação de texturas e sabores que desafia os mais corajosos.',
    image: 'https://placehold.co/600x400.png',
    price: 33.99,
    author: 'Chef Hamburgueiro',
    category: 'Especiais',
  },
  {
    id: 'chicken-crispy',
    title: 'Chicken Crispy',
    description: 'A crocância do frango empanado em um sanduíche incrível.',
    longDescription: 'Uma alternativa deliciosa à carne bovina. Nosso Chicken Crispy é feito com um filé de frango super crocante, alface americana, tomate fresco e maionese caseira, servido em um pão macio. Leve, crocante e muito saboroso.',
    image: 'https://placehold.co/600x400.png',
    price: 28.99,
    author: 'Chef Hamburgueiro',
    category: 'Frango',
  },
  {
    id: 'double-trouble-burger',
    title: 'Double Trouble Burger',
    description: 'Dois hambúrgueres, o dobro de sabor. Para quem tem fome de verdade.',
    longDescription: 'Encare o nosso Double Trouble: dois hambúrgueres de 180g cada, duplo queijo cheddar, bacon em dobro, anéis de cebola e molho barbecue. É um desafio de sabor e tamanho para os verdadeiros apaixonados por hambúrguer.',
    image: 'https://placehold.co/600x400.png',
    price: 45.99,
    author: 'Chef Hamburgueiro',
    category: 'Gigantes',
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
