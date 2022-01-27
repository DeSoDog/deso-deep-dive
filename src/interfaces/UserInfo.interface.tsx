import { CoinEntry, DAOCoinEntry } from "./Coin.interface";

export interface UserInfoRequest {
  Username?: string;
  PublicKeyBase58Check?: string;
  GetEntriesFollowingUsername?: boolean;
  LastPublicKeyBase58Check?: string;
  NumToFetch: number;
}
export interface UserInfoResponse {
  Profile: Profile;
  IsBlacklisted: boolean;
  IsGraylisted: boolean;
}
export interface Profile {
  PublicKeyBase58Check: string;
  Username: string;
  Description: string;
  IsHidden: boolean;
  IsReserved: boolean;
  IsVerified: boolean;
  Comments?: null;
  Posts?: null;
  CoinEntry: CoinEntry;
  DAOCoinEntry: DAOCoinEntry;
  CoinPriceDeSoNanos: number;
  CoinPriceBitCloutNanos: number;
  UsersThatHODL?: null;
  IsFeaturedTutorialWellKnownCreator: boolean;
  IsFeaturedTutorialUpAndComingCreator: boolean;
}
