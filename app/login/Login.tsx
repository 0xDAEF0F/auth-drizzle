"use client";

import { useActionState } from "react";
import { login } from "../actions/auth";
import Link from "next/link";

export default function Login() {
  const [state, action, isSubmitting] = useActionState(login, undefined);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form
        action={action}
        className="rounded border-2 border-gray-500 px-14 pb-14"
      >
        <h1 className="mx-auto my-5 w-fit text-3xl font-medium text-gray-500">
          Login
        </h1>
        <div className="flex flex-col gap-4">
          <div className="*:block">
            <label htmlFor="email">Email</label>
            <input
              className="rounded border border-black p-2"
              defaultValue={state?.formState.email}
              type="email"
              name="email"
              id="email"
              required
            />
            <ul className="mt-1 list-inside list-disc *:text-sm *:text-red-500">
              {state?.errors?.email?.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
          <div className="*:block">
            <label htmlFor="password">Password</label>
            <input
              required
              className="rounded border border-black p-2"
              defaultValue={state?.formState.password}
              type="password"
              name="password"
              id="password"
            />
            <ul className="mt-1 list-inside list-disc *:text-sm *:text-red-500">
              {state?.errors?.password?.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </div>
          <div className="mt-2 flex gap-4 *:rounded *:px-5 *:py-2">
            <button
              disabled={isSubmitting}
              type="submit"
              className="border border-black disabled:border-white disabled:bg-gray-500 disabled:text-white"
            >
              Login
            </button>
            <Link className="bg-blue-600" href="/register">
              <button className="text-white">Register</button>
            </Link>
          </div>
          <p className="text-sm text-red-500">{state?.errors.root}</p>
        </div>
      </form>
    </div>
  );
}
