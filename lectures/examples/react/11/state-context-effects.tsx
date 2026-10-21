import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type Action =
  | { type: "add"; title: string }
  | { type: "toggle"; id: number }
  | { type: "remove"; id: number };

function reducer(state: Task[], action: Action): Task[] {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: Date.now(),
          title: action.title,
          completed: false,
        },
      ];
    case "toggle":
      return state.map((task) =>
        task.id === action.id
          ? { ...task, completed: !task.completed }
          : task
      );
    case "remove":
      return state.filter((task) => task.id !== action.id);
  }
}

const TaskContext = createContext<{
  tasks: Task[];
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    // Effect: synchronize with something outside React.
    document.title = tasks.length + " tasks";
  }, [tasks.length]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used inside TaskProvider");
  }

  return context;
}
