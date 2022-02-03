import axios from "axios";
import { User } from "../interfaces/DesoIdentity.interface";
import { TransactionPost } from "../interfaces/Transaction.interface";
import { BASE_URI } from "./DesoApiRead";
import { getIdentityIFrame, getSignerInfo, uuid } from "./utils";

export const sendMessage = () => {};
export const submitPost = async (
  publicKey: string,
  user: User,
  body: string,
  postExtraData?: any,
  ParentStakeID?: string,

  imageURL?: string[]
): Promise<void> => {
  if (!publicKey) {
    console.log("publicKey is required");
    return;
  }

  if (!body) {
    console.log("body is required");
    return;
  }

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

  const response: TransactionPost = (
    await axios.post(`${BASE_URI}/submit-post`, data)
  ).data;

  const payload = getSignerInfo(user, response);
  const request = {
    id: uuid(),
    method: "sign",
    payload,
    service: "identity",
  };
  const iFrame = getIdentityIFrame();
  iFrame?.contentWindow?.postMessage(request, "*");
};
