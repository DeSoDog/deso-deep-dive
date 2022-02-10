export const IdentityInitialize = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const windowHandler = (event: any) => {
      if (event.data.method === "initialize") {
        event.source.postMessage(
          {
            id: event.data.id,
            service: "identity",
            payload: {},
          },
          "https://identity.deso.org" as WindowPostMessageOptions
        );
        resolve();
      }
    };
    window.addEventListener("message", windowHandler);
  });
};
