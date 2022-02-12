import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { PageNavigation } from "../../../components/layout/PageNavigation";
import { getSourceFromGithub } from "../../../services/utils";
import { PublicKey } from "../../ChapterHelper/Chapter.atom";
import { Chapter, ChapterNavigation } from "../../ChapterHelper/Chapter.models";
import { ChapterTemplate } from "../../ChapterHelper/ChapterTemplate";
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
  const [initializedResponse, setInitializedResponse] = useState<any | null>(
    null
  );

  const [myPublicKey, setPublicKey] = useRecoilState(PublicKey);
  const [response, setResponse] = useState<any | null>(null);
  const [code, setCode] = useState<any | null>(null);
  useEffect(() => {
    getSourceFromGithub(selectedChapter.githubSource).then((response) => {
      setCode(response);
    });
  }, [setInitializedResponse, initializedResponse]);
  return (
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
                  IdentityLogout(myPublicKey).then((response) => {
                    setResponse(response);
                  });
                }}
              >
                here
              </span>{" "}
              to logout with Identity.
            </div>
          </div>
          {response && (
            <>
              <div className="font-semibold">What just happened?</div>
              <div className="list-decimal p-2">
                <li className="font-semibold">
                  We called the identity logout page with window.open() to
                  prompt the user to logout.
                </li>
                <li className="font-semibold">
                  Then we created a new handler for the "message" event. In this
                  case all it does is close the prompt
                </li>
              </div>
              <div className="font-semibold">1.</div>
              {LoginCodeBlocks.section1}
              <div className="font-semibold">2.</div>
              {LoginCodeBlocks.section2}
              <div className="font-semibold text-lg">Github:</div>
              {response && code}
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
  );
};

{
}
