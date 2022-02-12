import axios from "axios";
import { ReactElement } from "react";
import { CopyBlock, nord } from "react-code-blocks";
import { User } from "../chapters/Interfaces/User";
import { UserInfoResponse } from "../chapters/Read/get-users-stateless/GetUserStateless.service";
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

export const getSourceFromGithub = async (
  urls: string[]
): Promise<ReactElement[]> => {
  const blocks = Promise.all(
    urls.map(async (url, index) => {
      const blockName = url.split("/").pop();
      const response = await axios.get(url);
      return (
        <div key={index}>
          <div className=" font-semibold">{blockName}:</div>
          <CopyBlock
            codeBlock
            text={response.data}
            language="tsx"
            wrapLines={true}
            theme={nord}
          />
        </div>
      );
    })
  );
  return blocks;
};
export const jsonBlock = (json: string | Object): ReactElement => {
  if (json instanceof String) {
    return (
      <CopyBlock
        codeBlock
        text={json}
        language="json"
        wrapLines={true}
        theme={nord}
      />
    );
  } else {
    return (
      <CopyBlock
        codeBlock
        text={JSON.stringify(json, null, 2)}
        language="json"
        wrapLines={true}
        theme={nord}
      />
    );
  }
};
