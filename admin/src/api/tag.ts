import { http } from "./http";
import { ITag } from "../store/modules/tag/tag.interface";

export const fetchTags = (): Promise<any> =>
  http({ method: "GET", url: "/tag" });

export const addTag = (tag: ITag): Promise<any> =>
  http({ method: "POST", url: `/tag`, data: tag });

export const updateTag = (tag: ITag, info: ITag): Promise<any> =>
  http({ method: "PATCH", url: `/tag/${tag.id}`, data: info });

export const deleteTag = (id: string): Promise<any> =>
  http({ method: "DELETE", url: `/tag/${id}` });
