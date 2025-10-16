import { useGoogleLogin } from "@react-oauth/google";
import { api, baseUrl } from "../service/api-service";
import axios from "axios";

export const signupMutation = async ({ email, password }) => {
  try {
    const response = await api({
      method: "POST",
      url: "/user/signup",
      data: {
        email: email || undefined,
        password: password || undefined,
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const VerifySignupOtp = async ({ email, otp }) => {
  try {
    const response = await api({
      method: "POST",
      url: "/user/VerifySignupOtp",
      data: {
        email: email || undefined,
        otp: otp || undefined,
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const resendOTPSignup = async ({ email }) => {
  try {
    const response = await api({
      method: "POST",
      url: "/user/resendOTP",
      data: {
        email: email || undefined,
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const loginMutation = async ({ email, password }) => {
  try {
    const response = await api({
      method: "POST",
      url: "/user/login",
      data: {
        email: email || undefined,
        password: password || undefined,
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const verifyLoginOtp = async ({ email, otp }) => {
  try {
    const response = await api({
      method: "POST",
      url: "/user/verifyLoginOtp",
      data: {
        email: email || undefined,
        otp: otp || undefined,
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};

export const useHandleGoogleSignup = () => {
  const handleApiLogin = async ({ idToken }) => {
    try {
      const response = await api({
        method: "POST",
        url: "/user/googleLogin",
        data: {
          idToken: idToken || undefined,
        },
      });
      return response;
    } catch (error) {
      return error?.response;
    }
  };

  const googleCall = async ({ code }) => {
    try {
      if (!code) throw new Error("Authorization code is missing");

      const params = new URLSearchParams();
      params.append("code", code);
      params.append("client_id", process.env.client_id);
      params.append("grant_type", "authorization_code");
      params.append("client_secret", process.env.client_secret);
      params.append(
        "redirect_uri",
        `http://localhost:3000/auth/google/callback`
      );

      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error_description || "Google token exchange failed"
        );
      }

      console.log("Token response:", data);
      return data;
    } catch (error) {
      console.error("Google login error:", error);
      return { error: error.message };
    }
  };

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse, "tokenresponse>>");

      const data = await googleCall({
        code: tokenResponse?.code,
      });
      console.log(data, "data>>>>");

      // const data = await handleApiLogin({
      //   idToken: tokenResponse?.code,
      // });
    },
  });

  return login;
};

export const forgotPassword = async ({ email }) => {
  try {
    const response = await api({
      method: "POST",
      url: "/user/forgotPassword",
      data: {
        email: email || undefined,
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};
export const resetPassword = async ({ email, password }) => {
  try {
    const response = await api({
      method: "POST",
      url: "/user/resetPassword",
      data: {
        email: email || undefined,
        password: password || undefined,
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};
