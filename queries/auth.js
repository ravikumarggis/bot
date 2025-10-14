import { api } from "../service/api-service";

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

export const resendOTPSignup = async ({ emailMobile, socialType }) => {
  try {
    const response = await api({
      method: "POST",
      url: "/user/resendOTP",
      data: {
        emailMobile: emailMobile || undefined,
        socialType: socialType || undefined,
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};
