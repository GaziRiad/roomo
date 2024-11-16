import { LoginForm } from "@/components/LoginForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  console.log(session);
  if (session?.user) return redirect("/");

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}
