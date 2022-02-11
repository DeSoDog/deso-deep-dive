import axios from "axios";
import {
  SendIframeMessageRequest,
  SendMessageRequest,
} from "../interfaces/MessageInfo.interface";
import { User } from "../interfaces/DesoIdentity.interface";
import { submitTransaction } from "./DesoApiSubmitTransaction";
import { BASE_URI } from "../chapters/Chapter.models";
import { getIdentityFrame } from "../chapters/Identity/identity-initialize/IdentityInitialize";

const DEFAULT_KEY = "default-key";
export const encryptMessage = async (
  request: SendIframeMessageRequest,
  messageToSend: string,
  user: User
) => {
  let req: {
    RecipientMessagingPublicKeyBase58Check: string;
    SenderMessagingKeyName: string;
  } = (await axios.post(`${BASE_URI}/check-party-messaging-keys`, request))
    .data;

  const { encryptedSeedHex, accessLevel, accessLevelHmac } = user;
  const iFrameRequest = {
    method: "encrypt",
    payload: {
      accessLevel,
      accessLevelHmac,
      encryptedSeedHex,
      senderGroupKeyName: req.SenderMessagingKeyName,
      recipientPublicKey: req.RecipientMessagingPublicKeyBase58Check,
      message: messageToSend,
    },
    service: "identity",
  };
  // const iFrame = getIdentityFrame();
  // iFrame?.contentWindow?.postMessage(iFrameRequest, "*");
};
export const sendMessage = async (request: SendMessageRequest) => {
  const response = (
    await axios.post(`${BASE_URI}/send-message-stateless`, request)
  ).data;
  console.log(response);
  if (response) {
    const TransactionHex = response.TransactionHex as string;
    submitTransaction(TransactionHex);
  }
};
