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

  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse, "tokenresponse>>");

      // const data = await googleCall({
      //   code: tokenResponse?.code,
      // });
      // console.log(data, "data>>>>");

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
