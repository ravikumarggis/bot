import Modal from "@/components/ui/modal";
import { DialogPanel } from "@headlessui/react";
import React from "react";

const PaymentProcessing = ({ open, setOpen, invoiceData }) => {
  return (
    <Modal setOpen={setOpen} open={open}>
      <DialogPanel>
        <h1>Hello Checking...</h1>
      </DialogPanel>
    </Modal>
  );
};

export default PaymentProcessing;
