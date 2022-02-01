import { atom } from "recoil";
import { User } from "../interfaces/DesoIdentity.interface";
import { FollowerInfoResponse } from "../interfaces/FollowerInfo.interface";
import { ProfileInfoResponse } from "../interfaces/ProfileInfo.interface";
import { UserInfoResponse } from "../interfaces/UserInfo.interface";

export enum AppStateEnum {
  MY_POST,
  MY_FOLLOWERS,
  MY_FOLLOWERS_POST,
}
export const MyPublicKey = atom<string | null>({
  key: "myPublicKey",
  default: null,
});

export const MyUserInfo = atom<MyUserInfoType>({
  key: "myUserInfo",
  default: null,
});

export const MyFollowersInfo = atom<FollowerInfoResponse | null>({
  key: "myFollowersInfo",
  default: null,
});

export const MyProfilePicture = atom<string | null>({
  key: "myProfilePicture",
  default: null,
});

export const AppState = atom<AppStateEnum>({
  key: "appState",
  default: AppStateEnum.MY_POST,
});

export const LoggedInUser = atom<User | null>({
  key: "loggedInUser",
  default: null,
});

export type MyUserInfoType = {
  profileInfoResponse: ProfileInfoResponse | null;
  userInfoResponse: UserInfoResponse | null;
} | null;

export type FollowerInfoType = MyUserInfoType;
