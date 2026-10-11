const API_URL = 'https://jsonplaceholder.typicode.com/photos';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

async function request<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  return (await response.json()) as T;
}

export const fetchPhotos = (
  page: number,
  limit: number,
  signal?: AbortSignal,
): Promise<Photo[]> => {
  const params = new URLSearchParams({
    _page: String(page),
    _limit: String(limit),
  });

  return request<Photo[]>(`${API_URL}?${params}`, signal);
};

export const fetchAllPhotos = (signal?: AbortSignal): Promise<Photo[]> =>
  request<Photo[]>(API_URL, signal);
