import axios from "axios";
import {
  UserInfoRequest,
  UserInfoResponse,
} from "../interfaces/UserInfo.interface";

// const BASE_URI: Readonly<string> = "https://diamondapp.com/api/v0";
const BASE_URI: Readonly<string> = "https://node.deso.org/api/v0";
const SAMPLE_USER_INFO = {
  Username: "TyFischer",
  PublicKeyBase58Check: "",
  GetEntriesFollowingUsername: false,
  LastPublicKeyBase58Check: "",
  NumToFetch: 0,
};
// Request URL: https://node.deso.org/api/v0/get-referral-info-for-user

export const getUserInfo = async (
  requestedUser: UserInfoRequest = SAMPLE_USER_INFO
): Promise<UserInfoResponse> => {
  return (await axios.post(`${BASE_URI}/get-single-profile`, requestedUser))
    .data;
};

export const getUserPicture = (
  publicKey: string = "BC1YLjMYu2ahUtWgSX34cNLeM9BM9y37cqXzxAjbvPfbxppDh16Jwog"
): string => {
  return `${BASE_URI}/get-single-profile-picture/${publicKey}`;
};

export const getUsersStateless = async (
  requestedUser: UserInfoRequest = SAMPLE_USER_INFO
) => {
  return (await axios.post(`${BASE_URI}/get-follows-stateless/`, requestedUser))
    .data;
};
