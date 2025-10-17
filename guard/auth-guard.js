"use client";
import { getCookie } from "cookies-next";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const guardedRoutes = ["/dashboard/home", "/dashboard/pricing/confirm-payment"];
const publicRoutes = [];

const AuthGuard = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("token");
    const isGuarded = guardedRoutes.includes(pathname);
    const isPublic = publicRoutes.includes(pathname);

    if (!token && isGuarded) {
      router.replace("/login");
      return;
    }

    if (token && isPublic) {
      router.replace("/dashboard/home");
      return;
    }

    setIsLoading(false);
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
