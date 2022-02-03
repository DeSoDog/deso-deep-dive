import { BASE_URI } from "./DesoApiRead";
import axios from "axios";
export const submitTransaction = async (TransactionHex: string) => {
  await axios.post(`${BASE_URI}/submit-transaction`, { TransactionHex });
};
