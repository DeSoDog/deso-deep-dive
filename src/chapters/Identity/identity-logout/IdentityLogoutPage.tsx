import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { PageNavigation } from "../../../components/layout/PageNavigation";
import { getSourceFromGithub } from "../../../services/utils";
import { PublicKey } from "../../ChapterHelper/Chapter.atom";
import { Chapter, ChapterNavigation } from "../../ChapterHelper/Chapter.models";
import { ChapterTemplate } from "../../ChapterHelper/ChapterTemplate";
import {
  CommonPageSectionTitles,
  PageSection,
} from "../../ChapterHelper/PageSections";
import { LoginCodeBlocks } from "../identity-login/CodeBlocks";
import { IdentityLogout } from "./IdentityLogout.service";

export interface IdentityLogoutProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}

export const IdentityLogoutPage = ({
  selectedChapter,
  chapters,
}: IdentityLogoutProps) => {
  const [logoutResponse, setLogoutResponse] = useState<any | null>(null);

  const [myPublicKey, setPublicKey] = useRecoilState(PublicKey);
  const [response, setResponse] = useState<any | null>(null);
  const [code, setCode] = useState<any | null>(null);
  useEffect(() => {
    getSourceFromGithub(selectedChapter.githubSource).then((response) => {
      setCode(response);
    });
  }, [setLogoutResponse, logoutResponse]);
  return (
    <ChapterTemplate
      title={selectedChapter.title}
      tabs={[
        {
          title: CommonPageSectionTitles.OVERVIEW,
          content: (
            <>
              {PageSection(
                "Logout",
                "After a user has logged in they can end their session with identity by calling logout"
              )}
              {PageSection(
                CommonPageSectionTitles.TRY_IT_OUT,
                <div>
                  Click{" "}
                  <span
                    className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
                    onClick={() => {
                      IdentityLogout(myPublicKey).then((response) => {
                        setResponse(response);
                      });
                    }}
                  >
                    here
                  </span>{" "}
                  to call the logout prompt
                </div>
              )}
              {PageSection(
                CommonPageSectionTitles.WHAT_HAPPENED,
                <>
                  <div className="list-decimal">
                    <li>
                      We called the identity logout page with window.open() to
                      prompt the user to logout.
                      {LoginCodeBlocks.section1}
                    </li>
                    <li>
                      Then we created a new handler for the "message" event. In
                      this case all it does is close the prompt
                      {LoginCodeBlocks.section2}
                    </li>
                  </div>
                </>
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
      // body={
      //     {response && (
      //       <>
      //         <div className="font-semibold">What just happened?</div>
      //         <div className="list-decimal p-2">
      //           <li className="font-semibold">
      //             We called the identity logout page with window.open() to
      //             prompt the user to logout.
      //           </li>
      //           <li className="font-semibold">
      //             Then we created a new handler for the "message" event. In this
      //             case all it does is close the prompt
      //           </li>
      //         </div>
      //         <div className="font-semibold">1.</div>
      //         {LoginCodeBlocks.section1}
      //         <div className="font-semibold">2.</div>
      //         {LoginCodeBlocks.section2}
      //         <div className="font-semibold text-lg">Github:</div>
      //         {response && code}
      //       </>
      //     )}
      //   </div>
      // }
      navigation={
        <PageNavigation
          previous={chapters.prev(selectedChapter) as Chapter}
          next={chapters.next(selectedChapter) as Chapter}
        />
      }
    />
  );
};

{
}
