import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type User = {
  id: string;
  name: string;
};

export function UserListContainer() {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Anna" },
    { id: "2", name: "Oleg" },
  ]);

  const handleDelete = (id: string) => {
    setUsers((current) =>
      current.filter((user) => user.id !== id)
    );
  };

  return (
    <UserListView
      users={users}
      onDelete={handleDelete}
    />
  );
}

function UserListView({
  users,
  onDelete,
}: {
  users: User[];
  onDelete: (id: string) => void;
}) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name}
          <button onClick={() => onDelete(user.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </section>
  );
}


type TabsContextValue = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("Tabs.* components must be used inside <Tabs>");
  }

  return context;
}

function TabsRoot({
  children,
  defaultIndex = 0,
}: {
  children: ReactNode;
  defaultIndex?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </TabsContext.Provider>
  );
}

function TabsList({ children }: { children: ReactNode }) {
  return (
    <div role="tablist" style={{ display: "flex", gap: 8 }}>
      {children}
    </div>
  );
}

function TabsTrigger({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const { activeIndex, setActiveIndex } = useTabsContext();

  return (
    <button
      type="button"
      role="tab"
      aria-selected={activeIndex === index}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </button>
  );
}

function TabsPanel({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const { activeIndex } = useTabsContext();

  if (activeIndex !== index) {
    return null;
  }

  return (
    <section role="tabpanel" style={{ marginTop: 16 }}>
      {children}
    </section>
  );
}

type TabsComponent = typeof TabsRoot & {
  List: typeof TabsList;
  Trigger: typeof TabsTrigger;
  Panel: typeof TabsPanel;
};

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
}) as TabsComponent;

// Usage:
// <Tabs>
//   <Tabs.List>
//     <Tabs.Trigger index={0}>Profile</Tabs.Trigger>
//     <Tabs.Trigger index={1}>Settings</Tabs.Trigger>
//   </Tabs.List>
//
//   <Tabs.Panel index={0}>
//     <p>Profile content</p>
//   </Tabs.Panel>
//   <Tabs.Panel index={1}>
//     <p>Settings content</p>
//   </Tabs.Panel>
// </Tabs>
