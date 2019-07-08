import {
  fetchTags as fetchTagsAjax,
  addTag as addTagAjax,
  updateTag as updateTagAjax,
  deleteTag as deleteTagAjax
} from "../../../api/tag";
import { startLoading, stopLoading } from "../loading/loading.action";
import { ITag } from "./tag.interface";

export const FETCH_TAGS = "FETCH_TAGS";

export const fetchTags = () => async (dispatch: Function) => {
  startLoading();
  return fetchTagsAjax()
    .then(data => {
      dispatch({ type: FETCH_TAGS, payload: data });
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const addTag = (tag: ITag) => async (dispatch: Function) => {
  startLoading();
  return addTagAjax(tag)
    .then(data => {
      dispatch(fetchTags());
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const updateTag = (tag: ITag, info: ITag) => async (
  dispatch: Function
) => {
  startLoading();
  return updateTagAjax(tag, info)
    .then(data => {
      dispatch(fetchTags());
      return data;
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};

export const deleteTag = (id: string) => async (dispatch: Function) => {
  startLoading();
  return deleteTagAjax(id)
    .then(() => {
      dispatch(fetchTags());
    })
    .catch(e => {
      throw e;
    })
    .finally(() => stopLoading());
};
