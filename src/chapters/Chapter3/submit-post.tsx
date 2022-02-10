import axios from "axios";
import { User } from "../../interfaces/DesoIdentity.interface";
import { TransactionPost } from "../../interfaces/Transaction.interface";
import { getSignerInfo, uuid } from "../../services/utils";
import { BASE_URI } from "../Chapter.models";
import { identitySubmitTransaction } from "../Chapter2/IdentitySubmitTransaction.service";

export const submitPost = async (
  publicKey: string,
  user: User,
  body: string,
  postExtraData?: any,
  ParentStakeID?: string,
  imageURL?: string[]
): Promise<any> => {
  if (!publicKey) {
    console.log("publicKey is required");
    return;
  }

  if (!body) {
    console.log("body is required");
    return;
  }

  // 0. create the identity frame
  // 1. verify they have a key and body everything else is optional
  const data = {
    UpdaterPublicKeyBase58Check: publicKey,
    PostHashHexToModify: "",
    ParentStakeID: ParentStakeID,
    Title: "",
    BodyObj: { Body: body, ImageURLs: imageURL },
    RecloutedPostHashHex: "",
    PostExtraData: postExtraData,
    Sub: "",
    IsHidden: false,
    MinFeeRateNanosPerKB: 2000,
  };
  // 2. Inform the blockchain that a post is on its way
  const response: TransactionPost = (
    await axios.post(`${BASE_URI}/submit-post`, data)
  ).data;
  // 3. get some info for signing a transaction
  const payload = getSignerInfo(user, response);

  const request = {
    id: uuid(),
    method: "sign",
    payload,
    service: "identity",
  };
  return identitySubmitTransaction(request);
};
