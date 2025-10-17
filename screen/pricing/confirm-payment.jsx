import React from "react";

const ConfirmPayment = () => {
  return (
    <div className="container mx-auto flex items-center justify-center mt-20">
      <div className="flex flex-col ">
        <h3 className="font-bold text-3xl">Review & Pay via PayPal</h3>
        <div className="flex flex-col lg:flex-row  mt-6 gap-4">
          <div className="flex flex-col bg-primary/10 lg:min-w-sm rounded-2xl p-4 gap-4 py-6 border border-primary/20">
            <p className="font-semibold text-xl">Your Plan</p>
            <div className="p-4 flex gap-2 flex-col border border-primary/30 rounded-2xl bg-primary/10 ">
              <p className="font-semibold text-xl">Monthly Plan</p>
              <div className="flex gap-6 font-medium text-lg">
                <div className="flex gap-1 flex-col">
                  <p>Duration:</p>
                  <p>Profit Cap:</p>
                  <p>Exchange:</p>
                  <p>Price:</p>
                </div>
                <div className="flex gap-1 flex-col">
                  <p>1 Month</p>

                  <p>$200</p>

                  <p>Binance</p>

                  <p>$1200</p>
                </div>
              </div>
              <p className="text-primary pt-6"> Change Plan</p>
            </div>
          </div>
          <div className="flex border-primary/10 border flex-col lg:max-w-sm rounded-2xl  p-4 gap-4 py-6 h-fit">
            <p className="font-semibold text-xl">Pay via PayPal</p>
            <button className="bg-blue-600 h-10 font-normal text-lg rounded">
              Pay with PayPal
            </button>
            <button className="bg-[#1a2747] h-10 font-normal text-lg rounded">
              Pay with Debit or Credit Card
            </button>
            <p>
              You'll be securely redirected to PayPal to complete your payment
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col-reverse lg:flex-row items-center gap-4 lg:gap-0 lg:items-end justify-between mt-10">
          <p className="text-primary cursor-pointer">Back to payment options</p>
          <button className=" w-[90%] lg:w-auto lg:min-w-sm bg-primary h-10 rounded cursor-pointer">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
