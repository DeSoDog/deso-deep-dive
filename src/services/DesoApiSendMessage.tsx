import axios from "axios";
import {
  GetMessageRequest,
  OrderedContactsWithMessages,
  SendIframeMessageRequest,
  SendMessageRequest,
} from "../interfaces/MessageInfo.interface";
import { BASE_URI } from "./DesoApiRead";
import { getIdentityIFrame, uuid } from "./utils";
import { User } from "../interfaces/DesoIdentity.interface";
import { submitTransaction } from "./DesoApiSubmitTransaction";

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
  const iFrame = getIdentityIFrame();
  iFrame?.contentWindow?.postMessage(iFrameRequest, "*");
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

export const getMessages = async (
  request: GetMessageRequest,
  user: User
): Promise<any> => {
  const response = (
    await axios.post(`${BASE_URI}/get-messages-stateless`, request)
  ).data;
  const orderedContactsWithMessages: OrderedContactsWithMessages[] =
    response.OrderedContactsWithMessages;
  const encryptedMessages = orderedContactsWithMessages
    .map((thread) => {
      return thread.Messages.map((message) => ({
        EncryptedHex: message.EncryptedText,
        PublicKey: message.IsSender
          ? message.RecipientPublicKeyBase58Check
          : message.SenderPublicKeyBase58Check,
        IsSender: message.IsSender,
        Legacy: !message.V2 && (!message.Version || message.Version < 2),
        Version: message.Version,
        SenderMessagingPublicKey: message.SenderMessagingPublicKey,
        SenderMessagingGroupKeyName: message.SenderMessagingGroupKeyName,
        RecipientMessagingPublicKey: message.RecipientMessagingPublicKey,
        RecipientMessagingGroupKeyName: message.RecipientMessagingGroupKeyName,
      }));
    })
    .flat();
  const { encryptedSeedHex, accessLevel, accessLevelHmac } = user;
  const iFrameRequest = {
    id: uuid(),
    method: "decrypt",
    payload: {
      accessLevel,
      accessLevelHmac,
      encryptedSeedHex,
      encryptedMessages,
    },
    service: "identity",
  };
  const iFrame = getIdentityIFrame();
  iFrame?.contentWindow?.postMessage(iFrameRequest, "*");

  return { ...response, encryptedMessages };
};
