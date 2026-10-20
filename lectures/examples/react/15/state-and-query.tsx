import { create } from "zustand";
import {
  keepPreviousData,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

type User = {
  id: string;
  name: string;
};

// Zustand: client/UI state
type UIStore = {
  theme: "light" | "dark";
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setTheme: (theme: UIStore["theme"]) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  theme: "light",
  sidebarOpen: true,
  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen: !state.sidebarOpen,
    })),
  setTheme: (theme) => set({ theme }),
}));

export function ThemeButton() {
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);

  return (
    <button
      onClick={() =>
        setTheme(theme === "light" ? "dark" : "light")
      }
    >
      Theme: {theme}
    </button>
  );
}

// TanStack Query: server state
async function getUsers(): Promise<User[]> {
  const response = await fetch("/api/users");
  if (!response.ok) {
    throw new Error("Failed to load users");
  }
  return response.json();
}

export function UserList() {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 60_000,
  });

  if (query.isPending) return <p>Loading...</p>;
  if (query.isError) return <p>{query.error.message}</p>;

  return (
    <ul>
      {query.data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export function DeleteUser({ id }: { id: string }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/users/" + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return (
    <button
      disabled={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      {mutation.isPending ? "Deleting..." : "Delete"}
    </button>
  );
}

export function PaginatedList({ page }: { page: number }) {
  const query = useQuery({
    queryKey: ["users", { page }],
    queryFn: () => getPage(page),
    placeholderData: keepPreviousData,
  });

  return query.isPending
    ? <p>Loading...</p>
    : <pre>{JSON.stringify(query.data, null, 2)}</pre>;
}

async function getPage(page: number) {
  const response = await fetch("/api/users?page=" + page);
  if (!response.ok) {
    throw new Error("Failed");
  }
  return response.json() as Promise<{
    items: User[];
    total: number;
  }>;
}
