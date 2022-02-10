import axios from "axios";
import { User } from "../../interfaces/DesoIdentity.interface";
import {
  GetMessageRequest,
  OrderedContactsWithMessages,
} from "../../interfaces/MessageInfo.interface";
import { uuid } from "../../services/utils";
import { BASE_URI } from "../Chapter.models";
import { identityDecrypt } from "../Chapter2/IdentityHelper.service";

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
  return identityDecrypt(iFrameRequest);
};
