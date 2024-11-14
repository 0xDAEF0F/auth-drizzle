import { checkLoggedIn } from "../loaders/checkLoggedIn";
import Register from "./Register";

export default async function Page() {
  await checkLoggedIn();

  return <Register />;
}
