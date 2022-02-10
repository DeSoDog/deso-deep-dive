import { User } from "../../interfaces/DesoIdentity.interface";

export const identityLogin = (): Promise<{
  publicKey: string;
  loggedInUser: User;
}> => {
  const prompt = window.open(
    "https://identity.deso.org/log-in?accessLevelRequest=4&hideJumio=true",
    null as unknown as any,
    "toolbar=no, width=800, height=1000, top=0, left=0"
  );
  const iframe: HTMLIFrameElement | null = document.getElementById(
    "identity"
  ) as HTMLIFrameElement;
  if (iframe === null) {
    throw Error("Iframe with id identity does not exist");
  }

  return new Promise((resolve, reject) => {
    const windowHandler = (event: any) => {
      console.log(event);
      const publicKey = event.data?.payload?.publicKeyAdded;
      if (!publicKey) {
        return;
      }

      const loggedInUser = event.data.payload.users[publicKey];
      prompt?.close();
      resolve({ publicKey, loggedInUser });
    };
    window.addEventListener("message", windowHandler);
  });
};
