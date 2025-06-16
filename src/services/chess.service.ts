const API_URL = 'https://api.chess.com/pub/';

export const fetchGMList = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_URL}leaders/grandmasters`);

    if (!response.ok) {
      throw new Error('Failed to fetch grandmasters');
    }

    return await response.json();
  } catch (error) {
    console.log('Error fetching grandmasters:', error);
    throw new Error('Failed to fetch grandmasters');
  }
};

export const fetchGMProfile = async (username: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}player/${username}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch profile for ${username}`);
    }

    return await response.json();
  } catch (error) {
    console.log('Error fetching grandmaster profile:', error);
    throw new Error('Failed to fetch grandmaster profile');
  }
};
