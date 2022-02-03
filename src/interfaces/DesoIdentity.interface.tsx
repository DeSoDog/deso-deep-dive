export interface DesoIdentityResponse {
  id: string;
  service: string;
  method: string;
  payload: any;
}
export interface DesoIdentityLoginResponse extends DesoIdentityResponse {
  payload: LoginInformationPayload;
}
export interface DesoIdentitySumbitTransactionResponse
  extends DesoIdentityResponse {
  payload: SubmitTransactionPayload;
}
export interface DesoIdentityDecryptedHexesactionResponse
  extends DesoIdentityResponse {
  payload: DecryptedHexesPayload;
}

export interface User {
  hasExtraText: boolean;
  btcDepositAddress: string;
  ethDepositAddress: string;
  version: number;
  encryptedSeedHex: string;
  network: string;
  accessLevel: number;
  accessLevelHmac: string;
}

export interface Users {
  [user: string]: User;
}

export interface LoginInformationPayload {
  users: Users;
  publicKeyAdded: string;
  signedUp: boolean;
}
export interface SubmitTransactionPayload {
  signedTransactionHex: string;
}
export interface DecryptedHexesPayload {
  decryptedHexes: { [hex: string]: string };
}
