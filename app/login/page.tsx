import { checkLoggedIn } from "../loaders/checkLoggedIn";
import Login from "./Login";

export default async function Page() {
  await checkLoggedIn();

  return <Login />;
}
