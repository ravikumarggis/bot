"use client";

import Image from "next/image";
import Herosection from "../../screen/home/herosection";
import Section1 from "../../screen/home/Section1";
import ReferralSection from "../../screen/home/referalSection";
import HomeTab from "../../screen/home/homeTab";


export default function Home() {


  return (
    <div className=" px-[-1%] ">
      <Herosection />
     <Section1/>
     <ReferralSection/>
     <div className="bg-[#05060f] w-full">
     <HomeTab/></div>
    </div>
  );
}
