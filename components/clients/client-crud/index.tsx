import Button from "@/components/global/button";
import Modal from "@/components/global/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdAdd, MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddClientSchema, TAddClientSchema } from "@/zod/client/add-client";
import ErrorMessage from "@/components/global/error-message";
import {
  dataTagErrorSymbol,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { http } from "@/app/config/axiosClient";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { RQKeys } from "@/app_data_store/react-query-keys";
import { TUser } from "@/type";
import Loader from "@/components/global/loader";
import { queryClient } from "@/app/store/QueryClientProvider";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  edit?: boolean;
  client_id?: string;
  create?: boolean;
};

export default function ClientCrud({ create, edit, client_id }: Props) {
  const searchParams = useSearchParams();
  const createTrigger = searchParams.get("createTrigger") === "true";
  const [modalOpen, setModalOpen] = useState<boolean | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    console.log(create, " ", createTrigger);
    if (create && createTrigger) {
      setModalOpen(true);
      router.push("/clients");
    }
  }, [createTrigger, create]);

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<TAddClientSchema>({
    resolver: zodResolver(AddClientSchema),
  });

  // edit logic:
  const { data: client_to_edit, isFetching: loading_client_to_edit } =
    useQuery<TUser>({
      queryKey: [RQKeys.CLIENTS["RQ_GET-CLIENT-BY-ID_ADMIN"], client_id],
      async queryFn() {
        return (await http.get(`user/client/${client_id}`)).data;
      },
      enabled: edit === true,
    });

  useEffect(() => {
    if (client_to_edit && !loading_client_to_edit) {
      console.log(client_to_edit, " ", loading_client_to_edit);
      setValue("name", client_to_edit.name);
      setValue("email", client_to_edit.email);
      setValue("phone", client_to_edit.phone);
      setValue("password", client_to_edit.password as string);
      setValue("sendMail", false);
    }
  }, [client_to_edit, loading_client_to_edit, client_id]);

  const { status, mutate } = useMutation({
    async mutationFn(data: TAddClientSchema) {
      return edit
        ? (await http.put(`user?id=${client_id}`, data)).data
        : (await http.post("user", data)).data;
    },
    onSuccess(response) {
      if (response.status) {
        toast.success(response.message);
        setModalOpen(false);
        queryClient.invalidateQueries({
          queryKey: [RQKeys.CLIENTS["RQ_GET-ALL-CLIENTS_ADMIN"]],
        });
      } else {
        toast.error(response.message);
      }
    },
    onError(error: AxiosError) {
      console.log("error --- ", error);
    },
  });

  return (
    <Modal
      title="Add new client"
      trigger={
        edit ? (
          <MdEdit className="text-2xl cursor-pointer hover:text-secondary" />
        ) : (
          <Button>
            <MdAdd /> Add new client
          </Button>
        )
      }
      open={modalOpen}
      setOpen={setModalOpen}
    >
      {edit && loading_client_to_edit ? (
        <Loader message="Loading client details" />
      ) : (
        <form
          onSubmit={handleSubmit((data: TAddClientSchema) => {
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
          <Label>Phone</Label>
          <Input {...register("phone")} placeholder="phone......" />
          {errors.phone && errors.phone.message && (
            <ErrorMessage message={errors.phone.message} showIcon />
          )}
          {!edit && (
            <>
              {" "}
              <Label>Password</Label>
              <Input
                {...register("password")}
                placeholder="********"
                type="password"
              />
              {errors.password && errors.password.message && (
                <ErrorMessage message={errors.password.message} showIcon />
              )}
            </>
          )}
          <Label
            htmlFor="send-email-checkbox"
            className={`flex cursor-pointer gap-2 items-center ${
              watch("sendMail") && "border border-secondary"
            } shadow-sm p-2 bg-white rounded-sm`}
          >
            <Input
              {...register("sendMail")}
              id="send-email-checkbox"
              type="checkbox"
              className="w-5 h-5"
            />
            <span>Send Onboarding Email</span>
          </Label>
          <Button loading={status === "pending"}>
            {edit ? "Edit" : "Add"} Client
          </Button>
        </form>
      )}
    </Modal>
  );
}
