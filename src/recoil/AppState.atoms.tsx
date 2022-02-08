import { atom } from "recoil";
import { ProfileInfoResponse } from "../chapters/Chapter1/API/GetSingleProfile";
import {
  DesoIdentityDecryptedHexesactionResponse,
  DesoIdentityEncryptedResponse,
  User,
} from "../interfaces/DesoIdentity.interface";
import { FollowerInfoResponse } from "../interfaces/FollowerInfo.interface";
import { UserInfoResponse } from "../interfaces/UserInfo.interface";

export enum AppStateEnum {
  MY_POST,
  MY_FOLLOWERS,
  MY_FOLLOWERS_POST,
}
export const SampleAppDecryptedHexes =
  atom<DesoIdentityDecryptedHexesactionResponse | null>({
    key: "decryptedHexes",
    default: null,
  });

export const SampleAppMyPublicKey = atom<string | null>({
  key: "myPublicKey",
  default: null,
});

export const SampleAppMyUserInfo = atom<MyUserInfoType>({
  key: "myUserInfo",
  default: null,
});

export const SampleAppMyFollowersInfo = atom<FollowerInfoResponse | null>({
  key: "myFollowersInfo",
  default: null,
});

export const SampleAppMyProfilePicture = atom<string | null>({
  key: "myProfilePicture",
  default: null,
});

export const SampleAppState = atom<AppStateEnum>({
  key: "appState",
  default: AppStateEnum.MY_POST,
});

export const SampleAppLoggedInUser = atom<User | null>({
  key: "loggedInUser",
  default: null,
});

export const SampleAppEncryptedMessage =
  atom<DesoIdentityEncryptedResponse | null>({
    key: "encryptMessage",
    default: null,
  });
export const SampleAppToggleDrawer = atom<boolean>({
  key: "toggleDrawer",
  default: false,
});

export type MyUserInfoType = {
  profileInfoResponse: ProfileInfoResponse | null;
  userInfoResponse: UserInfoResponse | null;
} | null;

export type FollowerInfoType = MyUserInfoType;
