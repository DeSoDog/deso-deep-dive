import axios from "axios";
import {
  FollowerInfoRequest,
  FollowerInfoResponse,
} from "../interfaces/FollowerInfo.interface";
import {
  PostInfoRequest,
  PostInfoResponse,
} from "../interfaces/PostInfo.interface";
import { ProfileInfoResponse } from "../interfaces/ProfileInfo.interface";
import {
  UserInfoRequest,
  UserInfoResponse,
} from "../interfaces/UserInfo.interface";

const BASE_URI: Readonly<string> = "https://node.deso.org/api/v0";

export const getProfileInfo = async (
  PublicKeyBase58Check: string
): Promise<ProfileInfoResponse> => {
  const userInfoRequest = {
    PublicKeyBase58Check,
  };
  return (await axios.post(`${BASE_URI}/get-single-profile`, userInfoRequest))
    .data;
};

export const getUserInfoStateless = async (
  PublicKeysBase58Check: string[]
): Promise<UserInfoResponse> => {
  const userInfoRequest: UserInfoRequest = {
    PublicKeysBase58Check,
    SkipForLeaderboard: false,
  };
  return (await axios.post(`${BASE_URI}/get-users-stateless`, userInfoRequest))
    .data;
};

export const getUserPicture = (PublicKeyBase58Check: string): string => {
  return `${BASE_URI}/get-single-profile-picture/${PublicKeyBase58Check}`;
};

export const getFollowers = async (
  PublicKeyBase58Check: string
): Promise<FollowerInfoResponse> => {
  const request: FollowerInfoRequest = {
    PublicKeyBase58Check,
    GetEntriesFollowingUsername: true,
    NumToFetch: 50,
  };
  let followerResponse: FollowerInfoResponse = (
    await axios.post(`${BASE_URI}/get-follows-stateless`, request)
  ).data;
  // wasn't a huge fan of the attribute coming back as a dynamic key
  // makes it hard to work with in the components and it messes with
  // typescript.
  // to fix this i added a data attribute to the response interface
  //  and then applied the same object to it as the dynamic hash
  const keys = Object.keys(followerResponse.PublicKeyToProfileEntry);
  if (keys.length > 0) {
    const data = followerResponse.PublicKeyToProfileEntry[keys[0]];
    followerResponse.PublicKeyToProfileEntry = {
      ...followerResponse.PublicKeyToProfileEntry,
      data,
    };
  }
  return followerResponse;
};

export const getPostsForPublicKey = async (
  ReaderPublicKeyBase58Check: string
): Promise<PostInfoResponse> => {
  const request: PostInfoRequest = {
    PublicKeyBase58Check: "",
    Username: "TyFischer",
    ReaderPublicKeyBase58Check,
    NumToFetch: 10,
  };
  return (await axios.post(`${BASE_URI}/get-posts-for-public-key`, request))
    .data;
};
