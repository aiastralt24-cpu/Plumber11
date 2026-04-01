"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false
    });

    if (result?.error) {
      setError("Invalid admin credentials.");
      return;
    }

    router.push("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-primary px-4 py-20">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">Internal access</p>
        <h1 className="mt-3 font-display text-4xl text-primary">Admin Sign In</h1>
        <p className="mt-2 text-sm text-muted">
          Default local credentials are documented in `.env.example` assumptions.
        </p>
        <p className="mt-2 text-sm text-muted">
          Local preview shortcut: open <span className="font-semibold text-primary">/admin</span> directly when using the file-based dev database.
        </p>
        <div className="mt-6 space-y-4">
          <Input name="email" placeholder="admin@plumbri.ght" type="email" />
          <Input name="password" placeholder="Password" type="password" />
          <Button fullWidth type="submit">
            Sign In
          </Button>
          {error ? <p className="text-sm text-error">{error}</p> : null}
        </div>
      </form>
    </main>
  );
}
