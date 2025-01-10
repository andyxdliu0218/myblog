import { loginUrl, req, signUpUrl, userInfoUrl, verifyTokenUrl } from "@/utils";

export function loginAPI(formData) {
  return req({
    method: "post",
    url: loginUrl,
    data: formData,
  });
}

export function getProfileAPI() {
  return req({
    method: "get",
    url: userInfoUrl,
  });
}

export function verifyTokenAPI() {
  return req({
    method: "get",
    url: verifyTokenUrl,
  });
}

export function signUpAPI(formData) {
  return req({
    method: "post",
    url: signUpUrl,
    data: formData,
  });
}
