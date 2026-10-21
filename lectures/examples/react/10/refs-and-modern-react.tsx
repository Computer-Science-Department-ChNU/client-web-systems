import { useRef, type Ref } from "react";

function TextInput({ ref }: { ref?: Ref<HTMLInputElement> }) {
  return <input ref={ref} />;
}

export function Form() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <TextInput ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}

export function Timer() {
  const timerId = useRef<number | undefined>(undefined);

  const start = () => {
    timerId.current = window.setTimeout(() => {
      console.log("Done");
    }, 1000);
  };

  const stop = () => {
    if (timerId.current !== undefined) {
      window.clearTimeout(timerId.current);
      timerId.current = undefined;
    }
  };

  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}
