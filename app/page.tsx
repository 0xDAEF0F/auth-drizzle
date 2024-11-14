import { logout } from "./actions/auth";
import { getUser } from "./loaders/getUser";

export default async function page() {
  const user = await getUser();

  return (
    <>
      <div>{JSON.stringify(user)}</div>
      <form action={logout}>
        <button
          type="submit"
          className="rounded border border-gray-600 bg-gray-200 px-2 py-1 text-sm"
        >
          Logout
        </button>
      </form>
    </>
  );
}
