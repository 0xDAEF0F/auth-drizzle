"use client";

import { register } from "../actions/auth";
import { useActionState } from "react";

export default function Register() {
  const [state, action, isSubmitting] = useActionState(register, undefined);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form
        action={action}
        className="rounded border-2 border-gray-500 px-14 pb-14"
      >
        <h1 className="mx-auto my-5 w-fit text-3xl font-medium text-gray-500">
          Sign Up
        </h1>
        <div className="flex flex-col gap-4">
          <div className="*:block">
            <label htmlFor="email">Email</label>
            <input
              className="rounded border border-black p-2"
              required
              type="email"
              name="email"
              id="email"
            />
            {state?.errors?.email && (
              <p className="text-sm">{state.errors.email}</p>
            )}
          </div>
          <div className="*:block">
            <label htmlFor="password">Password</label>
            <input
              className="rounded border border-black p-2"
              required
              type="password"
              name="password"
              id="password"
            />
            {state?.errors?.password && (
              <div className="mt-1">
                <p className="text-sm">Password must:</p>
                <ul>
                  {state.errors.password.map((error) => (
                    <li className="text-sm" key={error}>
                      - {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-[60%] justify-center rounded bg-blue-600 px-5 py-2 text-white disabled:bg-gray-500"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
