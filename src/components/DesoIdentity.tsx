import { Button } from "@mui/material";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { IdentityInitialize } from "../chapters/Identity/IdentityInitialize";
import { identityLogin } from "../chapters/Identity/IdentityLogin";
import { IdentityLogout } from "../chapters/Identity/IdentityLogout.service";
import { DesoIdentityEncryptedResponse } from "../interfaces/DesoIdentity.interface";
import {
  SampleAppEncryptedMessage,
  SampleAppLoggedInUser,
  SampleAppMyPublicKey,
} from "../recoil/AppState.atoms";
const Identity = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(SampleAppLoggedInUser);
  const [myPublicKey, setPublicKey] = useRecoilState(SampleAppMyPublicKey);

  const [encryptedMessage, setEncryptedMessage] = useRecoilState(
    SampleAppEncryptedMessage
  );
  useEffect(() => {
    IdentityInitialize();
    window.addEventListener("message", (event) => {
      const execution = determineExecution(event);
      switch (execution) {
        case "encryptMessage": {
          const data: DesoIdentityEncryptedResponse = event.data;
          setEncryptedMessage(data);
          break;
        }
        default: {
          break;
        }
      }
    });
  }, []);

  const approve = () => {
    const approve = window.open("https://identity.deso.org/approve");
  };

  const determineExecution = (
    event: any
  ): "dismiss" | "executeWindowCommand" | "encryptMessage" => {
    if (!(event.origin === "https://identity.deso.org" && event.source)) {
      // the event is coming from a different Iframe
      return "dismiss";
    }
    if (event?.data?.payload?.encryptedMessage) {
      return "encryptMessage";
    }
    return "executeWindowCommand";
  };

  return (
    <>
      {!loggedInUser ? (
        <Button
          color="inherit"
          onClick={() => {
            identityLogin().then(({ loggedInUser, publicKey }) => {
              setLoggedInUser(loggedInUser);
              setPublicKey(publicKey);
            });
          }}
        >
          Log In
        </Button>
      ) : (
        <Button
          color="inherit"
          onClick={() => {
            IdentityLogout(myPublicKey as string).then(() => {
              setLoggedInUser(null);
              setPublicKey(null);
            });
          }}
        >
          Log out
        </Button>
      )}

      <iframe
        title="desoidentity"
        id="identity"
        src="https://identity.deso.org/embed?v=2"
        style={{
          height: "100vh",
          width: "100vw",
          display: "none",
          position: "fixed",
          zIndex: 1000,
          left: 0,
          top: 0,
        }}
      ></iframe>
    </>
  );
};
export default Identity;
