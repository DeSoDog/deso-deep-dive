import { ProfileEntryResponse } from "./UserInfo.interface";

export interface GetMessageRequest {
  PublicKeyBase58Check: string;
  FetchAfterPublicKeyBase58Check: string;
  NumToFetch: number;
  HoldersOnly: boolean;
  HoldingsOnly: boolean;
  FollowersOnly: boolean;
  FollowingOnly: boolean;
  SortAlgorithm: string;
}

export interface Message {
  SenderPublicKeyBase58Check: string;
  RecipientPublicKeyBase58Check: string;
  EncryptedText: string;
  TstampNanos: number;
  IsSender: boolean;
  V2: boolean;
  Version: number;
  SenderMessagingPublicKey: string;
  SenderMessagingGroupKeyName: string;
  RecipientMessagingPublicKey: string;
  RecipientMessagingGroupKeyName: string;
}

export interface OrderedContactsWithMessages {
  PublicKeyBase58Check: string;
  Messages: Message[];
  ProfileEntryResponse: ProfileEntryResponse;
  NumMessagesRead: number;
}
export interface DecryptMessagesResponse {
  EncryptedHex: string;
  PublicKey: string;
  IsSender: boolean;
  Legacy: boolean;
  Version: number;
  SenderMessagingPublicKey: string;
  SenderMessagingGroupKeyName: string;
  RecipientMessagingPublicKey: string;
  RecipientMessagingGroupKeyName: string;
}
