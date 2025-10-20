"use client";
import Modal from "@/components/ui/modal";
import { DialogPanel } from "@headlessui/react";
import React, { useEffect } from "react";
import ActivityIndicator from "@/components/activity-indicator";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getInvoiceStatus } from "@/queries/payment";
import { toast } from "sonner";
const PaymentProcessing = ({
  open,
  setOpen,
  invoiceData,
  enableApiCalling = false,
}) => {
  const { address } = useAccount();
  const { data: statusData, isPending: statusDataPending } = useQuery({
    queryKey: ["getInvoiceStatus", invoiceData],
    queryFn: () => {
      return getInvoiceStatus({
        invoiceId: invoiceData?.invoiceId,
        walletAddress: address,
      });
    },
    enabled: enableApiCalling,
    retry: true,
    refetchInterval: (data, query) => {
      return data?.status === "paid" ? false : 10000;
    },
  });
  console.log(statusData, "statusData>>>");

  useEffect(() => {
    if (statusData?.status == "paid") {
      toast.success("Paid successfully");
      setOpen(false);
    }
  }, [statusData]);

  return (
    <Modal setOpen={setOpen} open={open}>
      <DialogPanel
        className={"flex justify-center items-center flex-col gap-4 "}
      >
        <h1 className="font-semibold text-2xl">Processing Your Payment...</h1>
        <ActivityIndicator isLoading className={"h-12 w-12 mt-6"} />
        <div className="mt-6 text-center">
          <p>Please wait while we confirm your payment with PayPal.</p>
          <p>This may take a few seconds.</p>
        </div>
      </DialogPanel>
    </Modal>
  );
};

export default PaymentProcessing;
