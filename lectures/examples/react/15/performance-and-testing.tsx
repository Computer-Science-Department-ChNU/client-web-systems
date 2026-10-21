import {
  memo,
  useCallback,
  useMemo,
  useState,
  useTransition,
  useDeferredValue,
} from "react";
import {
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type Item = {
  id: string;
  name: string;
};

const ListItem = memo(function ListItem({
  item,
  onDelete,
}: {
  item: Item;
  onDelete: (id: string) => void;
}) {
  return (
    <li>
      {item.name}
      <button onClick={() => onDelete(item.id)}>
        Delete
      </button>
    </li>
  );
});

export function ProductList({ items }: { items: Item[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      items
        .filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name)),
    [items, query],
  );

  const handleDelete = useCallback((id: string) => {
    console.log("delete", id);
  }, []);

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {filtered.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </>
  );
}

export function SearchResults() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const deferredQuery = useDeferredValue(query);

  return (
    <>
      <input
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);

          startTransition(() => {
            console.log("transition:", value);
          });
        }}
      />

      {isPending && <p>Updating...</p>}
      <p>Deferred: {deferredQuery}</p>
    </>
  );
}

export function Greeting() {
  const [name, setName] = useState("");

  return (
    <>
      <label htmlFor="name">Name</label>
      <input id="name" />
      <button onClick={() => setName("Anna")}>
        Say hello
      </button>
      <p>Hello, {name}</p>
    </>
  );
}

test("user can change UI by interacting with it", async () => {
  const user = userEvent.setup();

  render(<Greeting />);
  await user.click(
    screen.getByRole("button", { name: "Say hello" }),
  );

  expect(
    screen.getByText("Hello, Anna")
  ).toBeInTheDocument();
});
