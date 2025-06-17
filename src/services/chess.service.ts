const API_URL = import.meta.env.VITE_API_URL;

export const fetchGMList = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/titled/GM`);

    if (!response.ok) {
      throw new Error('Failed to fetch grandmasters');
    }

    const data = await response.json();

    return data?.players;
  } catch (error) {
    console.log('Error fetching grandmasters:', error);
    throw new Error('Failed to fetch grandmasters');
  }
};

export const fetchGMProfile = async (username: string): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/player/${username}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch profile for ${username}`);
    }

    return await response.json();
  } catch (error) {
    console.log('Error fetching grandmaster profile:', error);
    throw new Error('Failed to fetch grandmaster profile');
  }
};
