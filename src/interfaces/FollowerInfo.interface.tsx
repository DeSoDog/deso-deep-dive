export interface FollowerInfoRequest {
  PublicKeyBase58Check?: string;
  Username?: string;
  GetEntriesFollowingUsername: boolean;
  LastPublicKeyBase58Check?: string;
  NumToFetch?: number;
}
export interface FollowerInfoResponse {}
