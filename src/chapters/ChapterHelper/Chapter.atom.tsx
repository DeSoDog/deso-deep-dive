import { atom } from "recoil";
import { User } from "../Interfaces/User";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const PublicKey = atom<string>({
  key: "publicKey",
  // deso dog in the scenario they dont have an account
  default: "BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY",
  effects_UNSTABLE: [persistAtom],
});

export const LoggedInUser = atom<User | null>({
  key: "user",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
