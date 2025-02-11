import { req } from "@/utils";
import { createArticleUrl,getArticleUrl } from "@/utils";

export function createArticleAPI(formData) {
  return req({
    method: "post",
    url: createArticleUrl,
    data: formData,
  });
}

export function getArticleAPI(params) {
  return req({
    method: "get",
    url: getArticleUrl,
    params
  });
}
