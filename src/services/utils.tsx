import { UserInfoResponse } from "../interfaces/UserInfo.interface";

export const getFollowerCount = (
  userInfoResponse: UserInfoResponse
): number => {
  const followers =
    userInfoResponse?.UserList[0]?.PublicKeysBase58CheckFollowedByUser?.length;
  return followers ? followers : 0;
};
