import { DecryptMessagesResponse } from "../../../interfaces/MessageInfo.interface";

export interface PayloadHasEncryptedMessages {
  payload: { encryptedMessages: any[] };
}
export function identityDecrypt(request: any): Promise<any> {
  if (!request?.payload?.encryptedMessages) {
    throw Error("Encrypted Messages are were not Included");
  }

  const iframe: HTMLIFrameElement | null = document.getElementById(
    "identity"
  ) as HTMLIFrameElement;
  if (iframe === null) {
    throw Error("Iframe with id identity does not exist");
  }
  iframe.contentWindow?.postMessage(request, "*");
  return new Promise((resolve, reject) => {
    const windowHandler = (event: any) => {
      if (!event?.data?.payload?.decryptedHexes) {
        return;
      }
      const decryptedHexes = event?.data?.payload?.decryptedHexes;
      const encryptedMessages = request.payload?.encryptedMessages;
      const thread = (encryptedMessages as DecryptMessagesResponse[])?.map(
        (m) => {
          const decryptedMessage = decryptedHexes[m.EncryptedHex];
          return { m, decryptedMessage };
          // return message;
        }
      );
      resolve(thread);
    };
    window.addEventListener("message", windowHandler);
  });
}
