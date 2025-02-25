import { loginUrl, req, signUpUrl, userInfoUrl, verifyTokenUrl } from "@/utils";

export function loginAPI(formData) {
  return req({
    method: "POST",
    url: loginUrl,
    data: formData,
  });
}

export function getProfileAPI() {
  return req({
    method: "GET",
    url: userInfoUrl,
  });
}

export function verifyTokenAPI() {
  return req({
    method: "GET",
    url: verifyTokenUrl,
  });
}

export function signUpAPI(formData) {
  return req({
    method: "POST",
    url: signUpUrl,
    data: formData,
  });
}
