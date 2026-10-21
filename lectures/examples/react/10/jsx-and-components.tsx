import { useState } from "react";

type ProfileProps = {
  name: string;
  age: number;
};

function Profile({ name, age }: ProfileProps) {
  return (
    <div className="profile">
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}

export function App() {
  const [name, setName] = useState("Anna");

  const items = [
    { id: 1, name: "React" },
    { id: 2, name: "TypeScript" },
  ];

  return (
    <main>
      <Profile name={name} age={25} />

      <button onClick={() => setName("Olena")}>
        Change name
      </button>

      <h3>Topics</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </main>
  );
}

// JSX describes UI directly.
// The same idea can be expressed with React.createElement.
// JSX is preferred in modern React code.
