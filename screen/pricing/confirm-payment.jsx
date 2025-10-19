"use client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { createPayPalOrder } from "../../queries/payment";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetSubscription } from "@/queries/pricing";
import { formatCurrency } from "@/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ConfirmPayment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subId = searchParams.get("subId");
  const { data: subscriptionData, isPending: subscriptionDataPending } =
    useGetSubscription({ id: subId });
  console.log(subscriptionData, "subscriptionData>>");

  if (subscriptionDataPending) {
    return <p>Loading</p>;
  }

  return (
    <div className="container mx-auto flex items-center justify-center mt-20">
      <div className="flex flex-col ">
        <h3 className="font-bold text-3xl">Review & Pay via PayPal</h3>
        <div className="flex flex-col lg:flex-row  mt-6 gap-4">
          <div className="flex flex-col bg-primary/10 lg:min-w-sm rounded-2xl p-4 gap-4 py-6 border border-primary/20">
            <p className="font-semibold text-xl">Your Plan</p>
            <div className="p-4 flex gap-2 flex-col border border-primary/30 rounded-2xl bg-primary/10 ">
              <p className="font-semibold text-xl">
                {subscriptionData?.name || "--"} Plan
              </p>
              <div className="flex gap-6 font-medium text-lg">
                <div className="flex gap-1 flex-col">
                  <p>Duration:</p>
                  <p>Profit Cap:</p>
                  <p>Exchange:</p>
                  <p>Price:</p>
                </div>
                <div className="flex gap-1 flex-col">
                  <p>
                    {subscriptionData?.duration || 0}{" "}
                    {/* {subscriptionData?.name == "Monthly" ? "Month" : "Year"} */}
                    {"Month"}
                  </p>

                  <p>
                    {formatCurrency({
                      amount: subscriptionData?.profitCap,
                      currency: subscriptionData?.currency,
                    })}
                  </p>

                  <p>{subscriptionData?.exchange || ""}</p>

                  <p>
                    {formatCurrency({
                      amount: subscriptionData?.amount,
                      currency: subscriptionData?.currency,
                    })}
                  </p>
                </div>
              </div>
              <p
                className="text-primary pt-6 hover:underline cursor-pointer"
                onClick={() => {
                  router.replace("/dashboard/pricing");
                }}
              >
                {" "}
                Change Plan
              </p>
            </div>
          </div>
          <div className="flex border-primary/10 border flex-col lg:max-w-sm rounded-2xl  p-4 gap-4 py-6 h-fit">
            <p className="font-semibold text-xl">Pay via PayPal</p>
            {/* <button
              className="bg-blue-600 h-10 font-normal text-lg rounded"
              onClick={() => {
                createPayPalOrder();
              }}
            >
              Pay with PayPal
            </button> */}
            <PayPalButtons
              style={{ layout: "horizontal" }}
              createOrder={() => {}}
              onApprove={() => {}}
            />
            <button className="bg-[#1a2747] h-10 font-normal text-lg rounded">
              Pay with Debit or Credit Card
            </button>
            <p>
              You'll be securely redirected to PayPal to complete your payment
            </p>
            <div className="w-full h-1 bg-primary">

            </div>
            <p className="font-semibold text-xl">Pay via QIE</p>
            <div className="flex items-center w-full justify-center ">

            <ConnectButton />
            </div>
           
          </div>
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-row items-center gap-4 lg:gap-0 lg:items-end justify-between mt-10">
          <p className="text-primary cursor-pointer">Back to payment options</p>
          {/* <button className=" w-[90%] lg:w-auto lg:min-w-sm bg-primary h-10 rounded cursor-pointer">
            Continue
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
