import axios from "axios";
import { FollowerInfoRequest } from "../interfaces/FollowerInfo.interface";
import {
  PostInfoRequest,
  PostInfoResponse,
} from "../interfaces/PostInfo.interface";
import { UserInfoResponse } from "../interfaces/UserInfo.interface";

const BASE_URI: Readonly<string> = "https://node.deso.org/api/v0";

export const getUserInfo = async (
  PublicKeyBase58Check: string
): Promise<UserInfoResponse> => {
  const userInfoRequest = {
    PublicKeyBase58Check,
  };
  return (await axios.post(`${BASE_URI}/get-single-profile`, userInfoRequest))
    .data;
};

export const getUserPicture = (PublicKeyBase58Check: string): string => {
  return `${BASE_URI}/get-single-profile-picture/${PublicKeyBase58Check}`;
};

export const getFollowers = async (
  PublicKeyBase58Check: string
): Promise<any> => {
  const request: FollowerInfoRequest = {
    PublicKeyBase58Check,
    GetEntriesFollowingUsername: true,
  };
  return (await axios.post(`${BASE_URI}/get-follows-stateless`, request)).data;
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
