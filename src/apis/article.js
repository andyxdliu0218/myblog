import { req } from "@/utils";
import { createArticleUrl, getArticleUrl } from "@/utils";

export function createArticleAPI(formData) {
  return req({
    method: "POST",
    url: createArticleUrl,
    data: formData,
  });
}

export function getArticleAPI(params) {
  return req({
    method: "GET",
    url: getArticleUrl,
    params,
  });
}

export function getArticleByDateAPI(params) {
  return req({
    method: "GET",
    url: "/blog/date",
    params,
  });
}

export function getListByDateWithStatusAPI(params, status) {
  return req({
    method: "GET",
    url: `/blog/date/${status}`,
    params,
  });
}

export function deleteArticleAPI(userId, blogId) {
  return req({
    method: "DELETE",
    url: `/blog/${userId}/${blogId}`,
  });
}
