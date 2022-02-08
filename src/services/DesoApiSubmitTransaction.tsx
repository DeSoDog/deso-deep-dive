import axios from "axios";
import { BASE_URI } from "../chapters/Chapter.models";
export const submitTransaction = async (TransactionHex: string) => {
  await axios.post(`${BASE_URI}/submit-transaction`, { TransactionHex });
};
