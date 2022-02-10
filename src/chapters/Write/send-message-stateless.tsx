import axios from "axios";
import { SendMessageRequest } from "../../interfaces/MessageInfo.interface";
import { submitTransaction } from "../../services/DesoApiSubmitTransaction";
import { BASE_URI } from "../Chapter.models";

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
