import {
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
