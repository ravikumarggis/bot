"use client";
import { getCookie } from "cookies-next";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const guradedRoutes = ["/dashboard/home"];

const AuthGuard = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("token");
    const isCurrentRountGuarded = !!guradedRoutes?.find(
      (path) => path == pathname
    );
    if (!token && isCurrentRountGuarded) {
      return redirect("/login");
    }
    if (token && !isCurrentRountGuarded) {
      return redirect("/dashboard/home");
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AuthGuard;
