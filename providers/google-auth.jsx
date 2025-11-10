"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GoogleAuthProvider = ({ children }) => {
  return (
    <GoogleOAuthProvider clientId="384991310027-5ihhoi83phhq558rv3nojgeq4uv8f3hd.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
