export interface IPresence {
  in: null | string;
  out: null | string;
  statusPresence: StatusPresence;
  isReturn: boolean;
}

export enum StatusPresence {
  Alpha = "Alpha",
  Hadir = "Hadir",
}

export interface IResponseGetPresence {
  [key: string]: IPresence[]
}

export interface IPresenceIn {
  status: StatusPresence;
  latitude: number;
  longitude: number;
  desc: string;
}