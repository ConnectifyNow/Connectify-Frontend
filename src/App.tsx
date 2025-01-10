import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

export default function Home() {
  return <RouterProvider router={router} />;
}
