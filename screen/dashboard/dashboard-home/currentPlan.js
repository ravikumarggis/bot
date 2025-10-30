"use client";
import { useUserProfile } from "@/queries/profile";
import { useRouter } from "next/navigation";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
const Percentage = 100;

export default function CurrentPlan() {
  const router = useRouter();
  const { data: profileData, isPending: profileDataPending } = useUserProfile();

  return (
    <div className="bg-[#12121a] border border-gray-800/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-white text-lg font-normal">Current Plan</h3>
        <button
          className="text-gray-400 hover:text-white hover:bg-gray-800/50"
          onClick={() => {
            router.push("/dashboard/pricing");
          }}
        >
          Update Plan
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-8">
        <div className="relative w-64 h-64 mb-8">
          <CircularProgressbar
            value={Percentage}
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: "butt",
              textSize: "16px",
              pathTransitionDuration: 0.5,
              pathColor: `oklch(0.68 0.23 341.45)`,
              textColor: "#f88",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-semibold text-white">Unlimited</div>
            <div className="text-sm text-gray-400 mt-1">Available Cap</div>
          </div>
        </div>

        <div className="w-full space-y-3">
          <button
            variant="outline"
            className="w-full bg-transparent border-gray-700/50 text-white hover:bg-gray-800/50 rounded-full py-6 text-base"
          >
            Profit Cap: Unlimited
          </button>
          <button
            className="w-full bg-primary text-[white] rounded-[10px] py-3 text-base font-semibold"
            onClick={() => {
              router.push("/dashboard/pricing");
            }}
          >
            Buy Plan
          </button>
        </div>
      </div>
    </div>
  );
}
