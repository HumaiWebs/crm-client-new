import LoginForm from "@/components/auth/login";

export default function LoginPage() {
  return (
    <main className="flex-1 min-h-screen w-full flex flex-col items-center gap-8 justify-center">
      <h1 className="text-2xl font-bold text-gray-800">Humai CRM</h1>
      <LoginForm />
    </main>
  );
}
