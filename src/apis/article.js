import { req } from "@/utils";
import { createArticleUrl } from "@/utils";

export function createArticleAPI(formData) {
  return req({
    method: "post",
    url: createArticleUrl,
    data: formData,
  });
}
