import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { PageNavigation } from "../../../components/layout/PageNavigation";
import { User } from "../../../interfaces/DesoIdentity.interface";
import { GetMessageRequest } from "../../../interfaces/MessageInfo.interface";
import { jsonBlock } from "../../../services/utils";
import { LoggedInUser, PublicKey } from "../../Chapter.atom";
import { Chapter, ChapterNavigation } from "../../Chapter.models";
import { ChapterTemplate } from "../../ChapterTemplate";
import { IdentityInitialize } from "../../Identity/identity-initialize/IdentityInitialize";
import { identityLogin } from "../../Identity/identity-login/IdentityLogin";
import { getMessages } from "../get-messages-stateless";

export interface DecryptMessagesProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}
export const DecryptMessagesPage = ({
  selectedChapter,
  chapters,
}: DecryptMessagesProps) => {
  const [loggedInUser, setLoggedInUser] = useRecoilState<User | null>(
    LoggedInUser
  );

  const [myPublicKey, setPublicKey] = useRecoilState<string>(PublicKey);
  const [request, setRequest] = useState<GetMessageRequest>({
    NumToFetch: 25,
    PublicKeyBase58Check: myPublicKey as string,
    FetchAfterPublicKeyBase58Check: "",
    HoldersOnly: false,
    FollowersOnly: false,
    FollowingOnly: false,
    HoldingsOnly: false,
    SortAlgorithm: "time",
  });

  const [messageResponse, setMessageResponse] = useState<any>();
  const [finalResponse, setFinalResponse] = useState<any>();
  const loginInit = async () => {
    await IdentityInitialize();
    identityLogin().then((response) => {
      console.log(response);
      setLoggedInUser(response.loggedInUser);
      setPublicKey(response.publicKey);
    });
  };

  useEffect(() => {
    console.log("init user", loggedInUser);
    if (loggedInUser === null) {
      loginInit();
    }
  }, []);

  useEffect(() => {}, [setFinalResponse, setMessageResponse]);
  return (
    <>
      <ChapterTemplate
        title={selectedChapter.title}
        body={
          <div className="p-2">
            <div className="font-semibold text-lg">
              Click{" "}
              <span
                className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
                onClick={() => {
                  console.log("logged in user?", loggedInUser);
                  if (loggedInUser) {
                    getMessages(request, loggedInUser).then((response) => {
                      response.response.OrderedContactsWithMessages.slice(0, 4);
                      setMessageResponse(response.response);
                      setFinalResponse(response.thread);
                    });
                  }
                }}
              >
                here
              </span>{" "}
              to login with Identity.
            </div>
            <div className="font-semibold">What just happened?</div>

            <div className="list-decimal">
              <li>First we sent a post request to get-messages-stateless</li>
              <li>
                The Api will respond with all of our message, but encrypted due
                to security reasons
              </li>
              <li></li>
            </div>
            <div className="list-decimal">
              <div className="max-h-[300px] overflow-auto my-4">
                <li>{jsonBlock(request)}</li>
              </div>
              <li>
                <div className="max-h-[300px] overflow-auto my-4">
                  {messageResponse && jsonBlock(messageResponse)}
                </div>
              </li>
              <li className="max-h-[300px] overflow-auto">
                <div className="max-h-[300px] overflow-auto my-4">
                  {finalResponse && jsonBlock(finalResponse)}
                </div>
              </li>
            </div>
          </div>
        }
        navigation={
          <PageNavigation
            previous={chapters.prev(selectedChapter) as Chapter}
            next={chapters.next(selectedChapter) as Chapter}
          />
        }
      />
    </>
  );
};
