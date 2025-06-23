"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "../global/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { http } from "@/app/config/axiosClient";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/store/AuthProvider";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const {login} = useAuth()

  const router = useRouter();
  const { status, mutate } = useMutation({
    async mutationFn(data: any) {
      return (await http.post("/auth/login", data)).data;
    },
    onSuccess(response) {
      if (response.status) {
        toast.success("Login successfull");
        login(response.token,response.user)
        router.push("/");
      } else {
        toast.error(response.message);
      }
    },
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    mutate(credentials);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 flex flex-col gap-4 border shadow-sm rounded-lg min-w-[350px]"
    >
      <h2 className="text-indigo-600 font-semibold text-lg">
        Login to dashboard
      </h2>
      <Label className="flex flex-col items-start gap-2">
        <span>Email</span>
        <Input
          required
          type="email"
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="example@domain.com"
        />
      </Label>
      <Label className="flex flex-col items-start gap-2">
        <span>Password</span>
        <Input
          type="password"
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="********"
        />
      </Label>
      <Button loading={status === "pending"}>Login</Button>
    </form>
  );
}
