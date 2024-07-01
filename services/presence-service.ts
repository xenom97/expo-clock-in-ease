import { IPresenceIn, IResponseGetPresence } from "@/interfaces/presence.interface";
import { $axios } from "@/utils/axios";

export const getPresence = async () => {
  const { data } = await $axios.get("/get-data-user-in-year");
  return data as IResponseGetPresence;
};

export const postPresenceIn = async (payload: IPresenceIn) => {
  const { data } = await $axios.post("/presence-in", payload);
  return data;
};

export const postPresenceOut = async () => {
  const { data } = await $axios.post("/presence-out");
  return data;
}