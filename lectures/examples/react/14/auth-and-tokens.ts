import axios from "axios";

type User = {
  id: string;
  name: string;
  role: string;
};

const TOKEN_KEY = "token";

// Educational example: localStorage is used to expose
// the mechanics of a JavaScript-readable bearer token.
// Production browser auth may instead use HttpOnly cookies.
export function readToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = readToken();

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});

let refreshing = false;

type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let queue: QueueItem[] = [];

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (
      error.response?.status !== 401 ||
      original?._retry
    ) {
      return Promise.reject(error);
    }

    original._retry = true;

    if (refreshing) {
      return new Promise<string>((resolve, reject) => {
        queue.push({ resolve, reject });
      }).then((token) => {
        original.headers.Authorization = "Bearer " + token;
        return apiClient(original);
      });
    }

    refreshing = true;

    try {
      const { token } = await refreshToken();
      localStorage.setItem(TOKEN_KEY, token);

      queue.forEach((item) => item.resolve(token));
      queue = [];

      original.headers.Authorization = "Bearer " + token;
      return apiClient(original);
    } catch (refreshError) {
      queue.forEach((item) => item.reject(refreshError));
      queue = [];
      logout();
      return Promise.reject(refreshError);
    } finally {
      refreshing = false;
    }
  },
);

async function refreshToken(): Promise<{ token: string }> {
  return { token: "new-access-token" };
}

export type AuthState = {
  user: User | null;
  loading: boolean;
};
