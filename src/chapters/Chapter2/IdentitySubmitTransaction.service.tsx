import { submitTransaction } from "../../services/DesoApiSubmitTransaction";

export function identitySubmitTransaction(request: any): Promise<any> {
  const iframe: HTMLIFrameElement | null = document.getElementById(
    "identity"
  ) as HTMLIFrameElement;
  if (iframe === null) {
    throw Error("Iframe with id identity does not exist");
  }
  iframe.contentWindow?.postMessage(request, "*");
  return new Promise((resolve, reject) => {
    const windowHandler = (event: any) => {
      if (event?.data?.payload?.signedTransactionHex) {
        console.log(event);
        return submitTransaction(event?.data?.payload?.signedTransactionHex)
          .then((response) => {
            window.removeEventListener("message", windowHandler);
            resolve(response);
          })
          .catch(() => {
            window.removeEventListener("message", windowHandler);
            reject();
          });
      }
    };
    window.addEventListener("message", windowHandler);
  });
}
