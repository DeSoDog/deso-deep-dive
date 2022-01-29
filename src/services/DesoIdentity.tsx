export const subscribeToIdentity = () => {
  window.addEventListener("message", (event) => {
    // console.log(event);
  });
};
export const loginWithIdentity = () => {
  const h = 1000;
  const w = 800;
  const y = window.outerHeight / 2 + window.screenY - h / 2;
  const x = window.outerWidth / 2 + window.screenX - w / 2;
  window.open(
    "https://identity.deso.org/log-in",
    undefined,
    `toolbar=no, width=${w}, height=${h}, top=${y}, left=${x}`
  );
};
