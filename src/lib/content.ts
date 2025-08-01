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
