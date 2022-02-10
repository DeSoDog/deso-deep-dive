import { Button } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import { ReactElement, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  SampleAppDecryptedHexes,
  SampleAppLoggedInUser,
  SampleAppMyProfilePicture,
  SampleAppMyPublicKey,
} from "../../recoil/AppState.atoms";
import { DecryptMessagesResponse } from "../../interfaces/MessageInfo.interface";
import { getUserPicture } from "../../services/DesoApiRead";
import { SendMessage } from "./SendMessage";
import { User } from "../../interfaces/DesoIdentity.interface";
import { getMessages } from "../../chapters/Chapter3/get-messages-stateless";

export interface DisplayMessagesProps {
  publicKey: string;
}

const DisplayMessages = ({ publicKey }: DisplayMessagesProps) => {
  const myPublicKey = useRecoilValue(SampleAppMyPublicKey);
  const [showMessages, setShowMessages] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>(false);
  const [threadCard, setThreadCard] = useState<ReactElement[] | null>(null);
  const loggedInUser = useRecoilValue(SampleAppLoggedInUser);
  const profilePicture = useRecoilValue<string | null>(
    SampleAppMyProfilePicture
  );
  const [followerPicture, setFollowerPicture] = useState<any>(null);
  const [decryptedMessages, setDecryptedMessages] = useRecoilState(
    SampleAppDecryptedHexes
  );

  useEffect(() => {
    const followerProfilePic = getUserPicture(publicKey);
    setFollowerPicture(followerProfilePic);
  }, []);

  useEffect(() => {
    if (!decryptedMessages?.payload?.decryptedHexes) {
      return;
    }
    // const thread = (messages?.encryptedMessages as DecryptMessagesResponse[])
    //   .filter((m) => {
    //     return (
    //       m.m.RecipientMessagingPublicKey === publicKey ||
    //       m.m.SenderMessagingPublicKey === publicKey
    //     );
    //     // m.m.
    //   });
    // if (thread) {
    // setThreadCard(genereateThread(thread));
    // }
  }, [setDecryptedMessages, decryptedMessages]);

  const generateThread = (thread: any[]) => {
    if (thread) {
      return thread.map((x, index) => {
        return (
          <>
            <div
              key={index}
              className={`flex justify-start ${
                x.m.IsSender ? "bg-[#484753]" : "bg-[#88869b]"
              } py-2 px-2 rounded-lg mx-6 mb-3`}
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
    if (loggedInUser === null) {
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
      loggedInUser
    );

    setThreadCard(generateThread(response));
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

      {showMessages ? (
        <>
          <div className="bg-[#4f4b6e] mx-6 mt-3 py-3 rounded-t-lg  max-h-[400px] overflow-auto">
            {threadCard}
          </div>
          <div className="px-7 ">
            <SendMessage
              publicKey={publicKey}
              myPublicKey={myPublicKey as string}
              loggedInUser={loggedInUser as User}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default DisplayMessages;
