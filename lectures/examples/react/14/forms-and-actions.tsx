import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Controlled form
export function ControlledLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={submit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

// React Hook Form + Zod
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginData = z.infer<typeof schema>;

export function LoginWithRHF() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    await apiLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        {...register("password")}
      />
      {errors.password && (
        <p>{errors.password.message}</p>
      )}

      <button disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}

// React 19 Form Action
async function saveName(
  previous: string,
  formData: FormData,
): Promise<string> {
  const name = String(formData.get("name") ?? "");

  if (!name.trim()) {
    return "Name is required";
  }

  await Promise.resolve();
  return "";
}

export function ActionForm() {
  const [error, action] =
    useActionState(saveName, "");

  return (
    <form action={action}>
      <input name="name" />
      <SubmitButton />
      {error && <p>{error}</p>}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      {pending ? "Saving..." : "Save"}
    </button>
  );
}

async function apiLogin(_data: LoginData) {
  // Replace with the real API call.
}
