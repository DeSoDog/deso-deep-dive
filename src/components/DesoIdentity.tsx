import { Button } from "@mui/material";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { IdentityInitialize } from "../chapters/Identity/identity-initialize/IdentityInitialize";
import { identityLogin } from "../chapters/Identity/identity-login/IdentityLogin";
import { IdentityLogout } from "../chapters/Identity/identity-logout/IdentityLogout.service";
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
    </>
  );
};
export default Identity;
