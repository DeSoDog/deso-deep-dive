import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  DesoIdentityLoginResponse,
  DesoIdentityResponse,
} from "../interfaces/DesoIdentity.interface";
import { LoggedInUser, MyPublicKey } from "../recoil/AppState.atoms";
let action: "login" | "logout" | null = null;
let windowPrompt: Window | null = null;
const Identity = () => {
  const [loggedInUser, setLoggedInUser] = useRecoilState(LoggedInUser);
  const [myPublicKey, setPublicKey] = useRecoilState(MyPublicKey);
  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.origin === "https://identity.deso.org" && event.source) {
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
              const loginData: DesoIdentityLoginResponse = data;
              const publicKey = loginData.payload.publicKeyAdded;
              const loggedInUser = loginData.payload.users[publicKey];
              if (loggedInUser) {
                setLoggedInUser(loggedInUser);
                setPublicKey(publicKey);
                windowPrompt?.close();
              }
            } else if (action === "logout") {
              // user is already logged in so this must be the logout call
              windowPrompt?.close();
              setLoggedInUser(null);
              setPublicKey(null);
            }
            break;
          }
          case "signUp": {
            //todo
            break;
          }
          case "approve": {
            //todo
            break;
          }
          default: {
            break;
          }
        }
      }
    });
  }, []);

  const login = () => {
    action = "login";
    windowPrompt = window.open(
      "https://identity.deso.org/log-in?accessLevelRequest=4&hideJumio=true",
      null as unknown as any,
      "toolbar=no, width=800, height=1000, top=0, left=0"
    );
  };

  const logout = (myPublicKey: string | null) => {
    action = "logout";
    windowPrompt = window.open(
      `https://identity.deso.org/logout?publicKey=${myPublicKey}`,
      null as unknown as any,
      "toolbar=no, width=800, height=1000, top=0, left=0"
    );
  };
  return (
    <>
      {/* <button
        onClick={() => {
          console.log(myPublicKey);
          console.log(action);
        }}
      >
        state
      </button> */}
      {!loggedInUser ? (
        <Button
          color="inherit"
          onClick={() => {
            login();
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
