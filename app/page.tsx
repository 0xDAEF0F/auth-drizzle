import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form
        action={async () => {
          "use server";
          console.log("logging in...");
          redirect("/");
        }}
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
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="*:block">
            <label htmlFor="password">Password</label>
            <input
              className="rounded border border-black p-2"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="mt-2 flex gap-4 *:rounded *:px-5 *:py-2">
            <button type="submit" className="border border-black">
              Login
            </button>
            <Link className="bg-blue-600" href="/signup">
              <button className="text-white">Register</button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
