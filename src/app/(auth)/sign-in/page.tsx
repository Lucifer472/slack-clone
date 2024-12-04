import { AuthScreen } from "@/features/auth/auth-screen";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await session();

  if (user) {
    return redirect("/");
  }

  return <AuthScreen />;
}
