import { UserInfoResponse } from "../chapters/Read/get-users-stateless/GetUserStateless.service";
import { User } from "../interfaces/DesoIdentity.interface";
import { TransactionPost } from "../interfaces/Transaction.interface";

export const getFollowerCount = (
  userInfoResponse: UserInfoResponse
): number => {
  const followers =
    userInfoResponse?.UserList[0]?.PublicKeysBase58CheckFollowedByUser?.length;
  return followers ? followers : 0;
};

type UserTransactionInfo = Pick<
  User,
  "accessLevelHmac" | "encryptedSeedHex" | "accessLevel"
> &
  any;

export const getSignerInfo = (
  user: User,
  transaction: TransactionPost
): UserTransactionInfo => {
  const { accessLevelHmac, encryptedSeedHex, accessLevel } = user;
  const { TransactionHex } = transaction;
  return {
    accessLevelHmac,
    encryptedSeedHex,
    accessLevel,
    transactionHex: TransactionHex,
  };
};

export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getIdentityIFrame = (): HTMLIFrameElement => {
  const iFrame: HTMLIFrameElement | null = document.getElementById(
    "identity"
  ) as HTMLIFrameElement;
  return iFrame;
};

export const identityWrapper = () => {};
