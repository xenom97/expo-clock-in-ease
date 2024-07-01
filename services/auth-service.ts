import { IPayloadLogin, IPayloadRegister } from "@/interfaces/auth.interface";
import { $axios } from "@/utils/axios";

export const login = async (payload: IPayloadLogin) => {
  const { data } = await $axios.post("/login", payload);
  return data;
};


export const register = async (payload: IPayloadRegister) => {
  const { data } = await $axios.post("/register", payload);
  return data
}

export const getDivisions = async () => {
  const { data } = await $axios.get("/getAllDivision");
  return data;
}

export const getDepartmentsByDivisionId = async (id: string) => {
  const { data } = await $axios.get(`/getDepartment/${id}`);
  return data;
}

export const getBranches = async () => {
  const { data } = await $axios.get(`/branches`);
  return data;
}

export const getUserData = async () => {
  const { data } = await $axios.get("/user");
  return data;
}
