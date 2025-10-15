"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleAuthProvider = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId="926091222160-f604f50ferkp1f0vl9i5r6e08aq9s0ou.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
