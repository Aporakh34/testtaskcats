
const API_URL = 'https://api.thecatapi.com/v1';

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export const fetchRandomCat = async (): Promise<CatImage> => {
  try {
    const response = await fetch(`${API_URL}/images/search`);
    if (!response.ok) {
      throw new Error('Failed to fetch cat image');
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error('Error fetching cat:', error);
    throw error;
  }
};
