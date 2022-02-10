export const IdentityLogout = (myPublicKey: string): Promise<void> => {
  const prompt = window.open(
    `https://identity.deso.org/logout?publicKey=${myPublicKey}`,
    null as unknown as any,
    "toolbar=no, width=800, height=1000, top=0, left=0"
  );

  return new Promise((resolve, reject) => {
    const windowHandler = (event: any) => {
      console.log(event.data.method);
      if (event.data.method === "login") {
        prompt?.close();
        resolve();
      }
    };
    window.addEventListener("message", windowHandler);
  });
};
