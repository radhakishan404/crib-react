import { axios } from "../../helpers/axios";
import {
  CRIBS_ENDPOINT,
} from "./commonConstants";

export const api_cribs_get_list = async (params) => {
  return axios.get(`${CRIBS_ENDPOINT}`, { params });
};

export const api_cribs_add = async (data) => {
  return axios.post(CRIBS_ENDPOINT, data);
};

export const api_cribs_update = async (data) => {
  return axios.put(`${CRIBS_ENDPOINT}/${data.cribs_id}`, data);
};

export const api_cribs_delete = async (id) => {
  return axios.delete(`${CRIBS_ENDPOINT}/${id}`);
};

export const api_cribs_get = async (id) => {
  return axios.get(`${CRIBS_ENDPOINT}/${id}`);
};
