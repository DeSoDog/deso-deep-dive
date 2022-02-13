import { useEffect, useState } from "react";
import { PageNavigation } from "../../../components/layout/PageNavigation";
import { identityLogin } from "./IdentityLogin";
import { LoginCodeBlocks } from "./CodeBlocks";
import { getSourceFromGithub, jsonBlock } from "../../../services/utils";
import { useRecoilState } from "recoil";
import { User } from "../../Interfaces/User";
import { LoggedInUser, PublicKey } from "../../ChapterHelper/Chapter.atom";
import { Chapter, ChapterNavigation } from "../../ChapterHelper/Chapter.models";
import ChapterTemplate from "../../ChapterHelper/ChapterTemplate";
import { Link } from "@mui/material";
import {
  PageSection,
  CommonPageSectionTitles,
} from "../../ChapterHelper/PageSections";

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
        tabs={[
          {
            title: CommonPageSectionTitles.OVERVIEW,
            content: (
              <>
                {PageSection(
                  "Login",
                  `In order to write data to the chain, decrypt personal
                  messages, or various other tasks, we must first login to the
                  DeSo chain. The simplest way to handle this is by making use
                  of the identity services window api.`
                )}
                {PageSection(
                  CommonPageSectionTitles.TRY_IT_OUT,
                  <div>
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
                    to call the login prompt.
                  </div>
                )}
                {PageSection(
                  <>
                    {loggedInUser && (
                      <div>{CommonPageSectionTitles.WHAT_HAPPENED}</div>
                    )}
                  </>,
                  <div>
                    {loggedInUser && (
                      <>
                        <div className="list-decimal ">
                          <li>
                            We called the identity login page with window.open()
                            to prompt the user to login.
                            {LoginCodeBlocks.section1}
                          </li>
                          <li>
                            Then we created a new handler for the "message"
                            event.
                            {LoginCodeBlocks.section2}
                          </li>
                          <li>
                            Once the user selects one of the login in options
                            our Iframe will emit an event with our logged in
                            user's data.
                            {loggedInUser && jsonBlock(loggedInUser)}
                          </li>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </>
            ),
          },

          {
            title: "Code",
            content: PageSection("", code),
          },
          {
            title: "Documentation",
            content: PageSection(
              CommonPageSectionTitles.ADDITIONAL_DOCUMENTATION,
              <>{chapters.documentationToLink(selectedChapter)}</>
            ),
          },
        ]}
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
