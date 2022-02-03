import { Button, Card, CardHeader } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import { ReactElement, useEffect, useState } from "react";
import Close from "@mui/icons-material/Close";
import { getMessages } from "../../services/DesoApiSendMessage";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  DecryptedHexes,
  LoggedInUser,
  MyProfilePicture,
  MyPublicKey,
} from "../../recoil/AppState.atoms";
import { User } from "../../interfaces/DesoIdentity.interface";
import { DecryptMessagesResponse } from "../../interfaces/MessageInfo.interface";
import { getUserPicture } from "../../services/DesoApiRead";

export interface DisplayMessagesProps {
  publicKey: string;
}

const DisplayMessages = ({ publicKey }: DisplayMessagesProps) => {
  const myPublicKey = useRecoilValue(MyPublicKey);
  const [showMessages, setShowMessages] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>(false);
  const [threadCard, setThreadCard] = useState<ReactElement[] | null>(null);
  const user = useRecoilValue(LoggedInUser);
  const profilePicture = useRecoilValue<string | null>(MyProfilePicture);
  const [followerPicture, setFollowerPicture] = useState<any>(null);
  const [decryptedMessages, setDecryptedMessages] =
    useRecoilState(DecryptedHexes);

  useEffect(() => {
    const followerProfilePic = getUserPicture(publicKey);
    setFollowerPicture(followerProfilePic);
  }, []);

  useEffect(() => {
    if (!decryptedMessages?.payload?.decryptedHexes) {
      return;
    }
    const thread = (messages?.encryptedMessages as DecryptMessagesResponse[])
      ?.map((m) => {
        const decryptedMessage =
          decryptedMessages?.payload?.decryptedHexes[m.EncryptedHex];
        return { m, decryptedMessage };
        // return message;
      })
      .filter((m) => {
        return (
          m.m.RecipientMessagingPublicKey === publicKey ||
          m.m.SenderMessagingPublicKey === publicKey
        );
        // m.m.
      });
    if (thread) {
      setThreadCard(genereateThread(thread));
    }
  }, [setDecryptedMessages, decryptedMessages]);

  const genereateThread = (thread: any[]) => {
    if (thread) {
      return thread.map((x, index) => {
        return (
          <>
            <div
              key={index}
              className={`flex justify-start ${
                x.m.IsSender ? "bg-[#484753]" : "bg-[#88869b]"
              } py-2 px-2 rounded-lg mx-6 mb-1`}
            >
              <Avatar
                src={x.m.IsSender ? profilePicture : followerPicture}
              ></Avatar>
              <div className="my-auto px-2 text-[#fff] w-full text-left">
                {x.decryptedMessage}
              </div>
            </div>
          </>
        );
      });
    } else {
      return [];
    }
  };

  const getUserMessages = async () => {
    if (user === null) {
      return;
    }
    const response = await getMessages(
      {
        NumToFetch: 25,
        PublicKeyBase58Check: myPublicKey as string,
        FetchAfterPublicKeyBase58Check: "",
        HoldersOnly: false,
        FollowersOnly: false,
        FollowingOnly: false,
        HoldingsOnly: false,
        SortAlgorithm: "time",
      },
      user
    );
    setMessages(response);
  };

  return (
    <>
      <div className="display flex justify-start mt-2 py-2">
        <Button
          onClick={() => {
            if (showMessages === false) {
              getUserMessages();
            }
            setShowMessages(!showMessages);
          }}
        >
          {showMessages ? "hide messages" : "show messages"}
        </Button>
      </div>
      <>{showMessages ? threadCard : <></>}</>
    </>
  );
};
export default DisplayMessages;
