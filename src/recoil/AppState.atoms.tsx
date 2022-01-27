import { atom } from "recoil";
import { UserInfoResponse } from "../interfaces/UserInfo.interface";

export const MyPublicKey = atom({
  key: "myPublicKey",
  default: "BC1YLjMYu2ahUtWgSX34cNLeM9BM9y37cqXzxAjbvPfbxppDh16Jwog",
});
export const MyUserInfo = atom<UserInfoResponse | null>({
  key: "myUserInfo",
  default: null,
});
export const MyFollowersInfo = atom<UserInfoResponse[]>({
  key: "myFollowersInfo",
  default: [],
});
export const MyProfilePicture = atom<string | null>({
  key: "myProfilePicture",
  default: null,
});
