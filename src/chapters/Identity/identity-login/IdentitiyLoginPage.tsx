import { useEffect, useState } from "react";
import { PageNavigation } from "../../../components/layout/PageNavigation";
import { Chapter, ChapterNavigation } from "../../Chapter.models";
import { ChapterTemplate } from "../../ChapterTemplate";
import { identityLogin } from "./IdentityLogin";
import { LoginCodeBlocks } from "./CodeBlocks";
import { getSourceFromGithub, jsonBlock } from "../../../services/utils";
import { useRecoilState } from "recoil";
import { LoggedInUser, PublicKey } from "../../Chapter.atom";
import { User } from "../../../interfaces/DesoIdentity.interface";

// https://github.com/highlightjs/highlight.js/blob/main/src/languages/typescript.js
export interface IdentityLoginProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}
export const IdentityLoginPage = ({
  selectedChapter,
  chapters,
}: IdentityLoginProps) => {
  const [code, setCode] = useState<any | null>(null);

  const [loggedInUser, setLoggedInUser] = useRecoilState<User | null>(
    LoggedInUser
  );
  const [publicKey, setPublicKey] = useRecoilState<string>(PublicKey);

  useEffect(() => {
    getSourceFromGithub(selectedChapter.githubSource).then(setCode);
  }, [setLoggedInUser, loggedInUser]);
  return (
    <>
      <ChapterTemplate
        title={selectedChapter.title}
        body={
          <div>
            <div className="p-2">
              <div className="font-semibold text-lg">
                Click{" "}
                <span
                  className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
                  onClick={() => {
                    identityLogin().then((response) => {
                      setLoggedInUser(response.loggedInUser);
                      setPublicKey(response.publicKey);
                    });
                  }}
                >
                  here
                </span>{" "}
                to login with Identity.
              </div>
            </div>
            {loggedInUser && (
              <>
                <div className="font-semibold">What just happened?</div>
                <div className="list-decimal p-2">
                  <li className="font-semibold">
                    We called the identity login page with window.open() to
                    prompt the user to login.
                  </li>
                  <li className="font-semibold">
                    Then we created a new handler for the "message" event.
                  </li>
                  <li className="font-semibold">
                    Once the user selects one of the login in options our Iframe
                    will emit an event with our logged in user's data.
                    <div className="font-semibold">1.</div>
                    {LoginCodeBlocks.section1}
                    <div className="font-semibold">2.</div>
                    {LoginCodeBlocks.section2}
                    <div className="font-semibold">3.</div>
                    {loggedInUser && jsonBlock(loggedInUser)}
                  </li>
                  <div className="font-semibold text-lg">Github:</div>
                  {loggedInUser && code}
                </div>
              </>
            )}
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
