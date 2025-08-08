import { useState } from "react";
import Modal from "../global/modal";
import Button from "../global/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { EmployeeSchema, TEmployeeSchema } from "@/zod/employee";
import { TAddClientSchema } from "@/zod/client/add-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { watch } from "fs";
import { register } from "module";
import ErrorMessage from "../global/error-message";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/app/config/axiosClient";
import toast from "react-hot-toast";
import { set } from "zod";
import { BiEdit } from "react-icons/bi";

export default function CreateEmployeeModal({
  employeeId,
}: {
  employeeId?: string;
}) {
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TEmployeeSchema>({
    resolver: zodResolver(EmployeeSchema),
  });

  const { mutate, status } = useMutation({
    mutationKey: ["create-employee"],
    mutationFn: async (data: TEmployeeSchema) => {
      return (
        await http[employeeId ? "put" : "post"](
          `employee${employeeId ? `?id=${employeeId}` : ""}`,
          data
        )
      ).data;
    },
    onSuccess: (response) => {
      if (response.status) {
        toast.success(response.message);
        setIsOpen(false);
      } else {
        toast.error(response.message);
      }
    },
  });

  const [isOpen, setIsOpen] = useState<boolean | undefined>();

  return (
    <Modal
      trigger={employeeId ? <BiEdit className="text-2xl text-primary" /> : <Button>Create new employee</Button>}
      open={isOpen}
      setOpen={setIsOpen}
      title="Create Employee"
    >
      <form
        onSubmit={handleSubmit((data: TEmployeeSchema) => {
          mutate(data);
        })}
        className="flex flex-col gap-2"
      >
        <Label>Name</Label>
        <Input {...register("name")} placeholder="client name...." />
        {errors.name && errors.name.message && (
          <ErrorMessage message={errors.name.message} showIcon />
        )}
        <Label>Personal Email</Label>
        <Input {...register("email")} placeholder="example@domain.com" />
        {errors.email && errors.email.message && (
          <ErrorMessage message={errors.email.message} showIcon />
        )}
        <Label>Password</Label>
        <Input {...register("password")} placeholder="password......" />
        {errors.password && errors.password.message && (
          <ErrorMessage message={errors.password.message} showIcon />
        )}
        <Label>Salary</Label>
        <Input {...register("salary")} placeholder="employee salary" />
        {errors.salary && errors.salary.message && (
          <ErrorMessage message={errors.salary.message} showIcon />
        )}
        <Label>Join Date</Label>
        <Input {...register("joiningDate")} type="date" />
        {errors.joiningDate && errors.joiningDate.message && (
          <ErrorMessage message={errors.joiningDate.message} showIcon />
        )}
        <Label>Designation</Label>
        <Input
          {...register("designation")}
          placeholder="employee designation"
        />
        {errors.designation && errors.designation.message && (
          <ErrorMessage message={errors.designation.message} showIcon />
        )}
        <Button loading={status === "pending"}>
          {employeeId ? "Edit" : "Add"} Employee
        </Button>
      </form>
    </Modal>
  );
}
