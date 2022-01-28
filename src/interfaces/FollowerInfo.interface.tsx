import { CoinEntry, DAOCoinEntry } from "./Coin.interface";
export interface FollowerInfo {
  PublicKeyBase58Check: string;
  Username: string;
  Description: string;
  IsHidden: boolean;
  IsReserved: boolean;
  IsVerified: boolean;
  Comments?: any;
  Posts?: any;
  CoinEntry: CoinEntry;
  DAOCoinEntry: DAOCoinEntry;
  CoinPriceDeSoNanos: number;
  CoinPriceBitCloutNanos: number;
  UsersThatHODL?: any;
  IsFeaturedTutorialWellKnownCreator: boolean;
  IsFeaturedTutorialUpAndComingCreator: boolean;
}

export interface PublicKeyToProfileEntry {
  [SomeStringHash: string]: FollowerInfo;
  data: FollowerInfo;
}

export interface FollowerInfoResponse {
  PublicKeyToProfileEntry: PublicKeyToProfileEntry;
  NumFollowers: number;
}
export interface FollowerInfoRequest {
  PublicKeyBase58Check?: string;
  Username?: string;
  GetEntriesFollowingUsername: boolean;
  LastPublicKeyBase58Check?: string;
  NumToFetch?: number;
}
