import React, { useState } from "react";
import Modal from "../global/modal";
import { MdDelete } from "react-icons/md";
import Button from "../global/button";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/app/config/axiosClient";
import toast from "react-hot-toast";
import { queryClient } from "@/app/store/QueryClientProvider";
import { RQKeys } from "@/app_data_store/react-query-keys";
import { AxiosError } from "axios";

type Props = {
  client_id: string;
  client_name: string;
};

export default function DeleteClient({ client_id, client_name }: Props) {
  const [open, setOpen] = useState<boolean | undefined>(undefined);

  const { mutate: delete_client, status } = useMutation({
    async mutationFn() {
      return (await http.delete("user?id=" + client_id)).data;
    },
    onSuccess(response) {
      if (response.status) {
        toast.success(response.message);
        setOpen(false);
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
      open={open}
      setOpen={setOpen}
      title={`Delete ${client_name}`}
      trigger={
        <MdDelete className="text-2xl cursor-pointer hover:text-secondary" />
      }
    >
      <div className="flex flex-col gap-2">
        <p className="text-red-600 text-lg">
          Do you really want to delete {client_name}
        </p>
        <div className="flex justify-end items-center gap-4">
          <Button
            onClick={() => setOpen(false)}
            className="bg-red-600 hover:bg-red-500"
          >
            Cancel
          </Button>
          <Button
            loading={status === "pending"}
            className="bg-primary hover:bg-secondary"
            onClick={() => delete_client()}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
