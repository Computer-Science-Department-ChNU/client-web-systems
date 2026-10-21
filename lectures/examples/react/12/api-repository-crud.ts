export type ApiTodo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const API_URL = import.meta.env.VITE_API_URL ?? "https://dummyjson.com";

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(API_URL + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  return response.json() as Promise<T>;
}

export const taskRepository = {
  async list(): Promise<Task[]> {
    const result = await request<{ todos: ApiTodo[] }>(
      "/todos?limit=10&skip=0",
    );

    return result.todos.map((todo) => ({
      id: String(todo.id),
      title: todo.todo,
      completed: todo.completed,
    }));
  },

  async get(id: string): Promise<Task> {
    const todo = await request<ApiTodo>("/todos/" + id);

    return {
      id: String(todo.id),
      title: todo.todo,
      completed: todo.completed,
    };
  },

  async create(title: string): Promise<Task> {
    const todo = await request<ApiTodo>("/todos/add", {
      method: "POST",
      body: JSON.stringify({
        todo: title,
        completed: false,
        userId: 1,
      }),
    });

    return {
      id: String(todo.id),
      title: todo.todo,
      completed: todo.completed,
    };
  },

  async update(id: string, patch: Partial<Task>): Promise<Task> {
    const todo = await request<ApiTodo>("/todos/" + id, {
      method: "PATCH",
      body: JSON.stringify({
        todo: patch.title,
        completed: patch.completed,
      }),
    });

    return {
      id: String(todo.id),
      title: todo.todo,
      completed: todo.completed,
    };
  },

  async remove(id: string): Promise<void> {
    await request("/todos/" + id, { method: "DELETE" });
  },
};
