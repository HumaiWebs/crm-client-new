import React from "react";
import Modal from "../global/modal";
import { BsEye } from "react-icons/bs";
import ClientDetails from "./client-details";

type Props = {
  clientId: string;
};

export default function ClientDetailsModal({ clientId }: Props) {
  
  return (
    <Modal
      title="Client Details"
      trigger={
        <BsEye
          className="text-2xl cursor-pointer hover:text-secondary"
          title="View Details"
        />
      }
    >
      <ClientDetails clientId={clientId} />
      
    </Modal>
  );
}
