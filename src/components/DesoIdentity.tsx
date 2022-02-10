import { Button } from "@mui/material";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { identityLogin } from "../chapters/Chapter2/IdentityLogin";
import {
  DesoIdentityEncryptedResponse,
  DesoIdentityLoginResponse,
  DesoIdentityResponse,
} from "../interfaces/DesoIdentity.interface";
import {
  SampleAppEncryptedMessage,
  SampleAppLoggedInUser,
  SampleAppMyPublicKey,
} from "../recoil/AppState.atoms";
let action: "login" | "logout" | null = null;
let windowPrompt: Window | null = null;
const Identity = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(SampleAppLoggedInUser);
  const [myPublicKey, setPublicKey] = useRecoilState(SampleAppMyPublicKey);

  const [encryptedMessage, setEncryptedMessage] = useRecoilState(
    SampleAppEncryptedMessage
  );
  useEffect(() => {
    window.addEventListener("message", (event) => {
      const execution = determineExecution(event);
      switch (execution) {
        case "executeWindowCommand": {
          handleWindowExecution(event);
          break;
        }
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

  const logout = (myPublicKey: string | null) => {
    action = "logout";
    windowPrompt = window.open(
      `https://identity.deso.org/logout?publicKey=${myPublicKey}`,
      null as unknown as any,
      "toolbar=no, width=800, height=1000, top=0, left=0"
    );
  };

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

  const handleWindowExecution = (event: any) => {
    const data: DesoIdentityResponse = event.data;
    switch (data.method) {
      case "initialize": {
        event.source.postMessage(
          {
            id: data.id,
            service: "identity",
            payload: {},
          },
          "https://identity.deso.org" as WindowPostMessageOptions
        );
        break;
      }
      case "login": {
        // user is not logged in open login prompt
        if (action === "login") {
          // const loginData: DesoIdentityLoginResponse = data;
          // const publicKey = loginData.payload.publicKeyAdded;
          // const loggedInUser = loginData.payload.users[publicKey];
          // if (loggedInUser) {
          //   setLoggedInUser(loggedInUser);
          //   setPublicKey(publicKey);
          //   windowPrompt?.close();
          // }
        } else if (action === "logout") {
          // user is already logged in so this must be the logout call
          windowPrompt?.close();
          setLoggedInUser(null);
          setPublicKey(null);
        }
        break;
      }
      default: {
        break;
      }
    }
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
            logout(myPublicKey);
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
