import { CoinEntry, DAOCoinEntry } from "./Coin.interface";

export interface UserInfoRequest {
  PublicKeysBase58Check: string[];
  SkipForLeaderboard: boolean;
}

export interface ProfileEntryResponse {
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

export interface UserList {
  PublicKeyBase58Check: string;
  ProfileEntryResponse: ProfileEntryResponse;
  Utxos?: any;
  BalanceNanos: number;
  UnminedBalanceNanos: number;
  PublicKeysBase58CheckFollowedByUser?: string[];
  UsersYouHODL?: any;
  UsersWhoHODLYouCount: number;
  HasPhoneNumber: boolean;
  CanCreateProfile: boolean;
  BlockedPubKeys?: any;
  HasEmail: boolean;
  EmailVerified: boolean;
  JumioStartTime: number;
  JumioFinishedTime: number;
  JumioVerified: boolean;
  JumioReturned: boolean;
  IsAdmin: boolean;
  IsSuperAdmin: boolean;
  IsBlacklisted: boolean;
  IsGraylisted: boolean;
  TutorialStatus: string;
  CreatorCoinsPurchasedInTutorial: number;
  MustCompleteTutorial: boolean;
}

export interface ParamUpdaters {
  [key: string]: boolean;
}

export interface UserInfoResponse {
  UserList: UserList[];
  DefaultFeeRateNanosPerKB: number;
  ParamUpdaters: ParamUpdaters;
}
