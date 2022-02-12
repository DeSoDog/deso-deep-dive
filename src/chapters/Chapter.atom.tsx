import { atom } from "recoil";
import { User } from "../interfaces/DesoIdentity.interface";
export const PublicKey = atom<string>({
  key: "publicKey",
  default: "BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY",
});

export const LoggedInUser = atom<User | null>({
  key: "user",
  default: null,
});
