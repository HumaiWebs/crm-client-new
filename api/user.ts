import { http } from "@/app/config/axiosClient";
import { TUser } from "@/type";

export async function getAllClients(): Promise<TUser[]> {
  return (await http.get("/user")).data;
}
