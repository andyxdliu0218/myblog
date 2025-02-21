import { req } from "@/utils";
import { createArticleUrl, getArticleUrl } from "@/utils";

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
    params,
  });
}


export function getArticleByDateAPI(params) {
  return req({
    method: "get",
    url: "/blog/date",
    params,
  });
}

export function getListByDateWithStatusAPI(params, status) {
  return req({
    method: "get",
    url: `/blog/date/${status}`,
    params,
  });
}
