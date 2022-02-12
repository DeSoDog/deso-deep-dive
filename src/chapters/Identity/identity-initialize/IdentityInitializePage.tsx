import { useEffect, useState } from "react";
import { PageNavigation } from "../../../components/layout/PageNavigation";
import { getSourceFromGithub, jsonBlock } from "../../../services/utils";
import { Chapter, ChapterNavigation } from "../../Chapter.models";
import { ChapterTemplate } from "../../ChapterTemplate";
import { ChapterIdentityTemplate } from "../ChapterIdentityTemplate";
import { IdentityInitialize } from "./IdentityInitialize";

export interface IdentityInitializeProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}

export const IdentityInitializePage = ({
  selectedChapter,
  chapters,
}: IdentityInitializeProps) => {
  const [initializedResponse, setInitializedResponse] = useState<any | null>(
    null
  );

  const [code, setCode] = useState<any | null>(null);
  useEffect(() => {
    console.log(selectedChapter.githubSource);
    getSourceFromGithub(selectedChapter.githubSource).then((response) => {
      setCode(response);
    });
  }, [setInitializedResponse, initializedResponse]);
  return (
    <ChapterTemplate
      title={selectedChapter.title}
      body={
        <ChapterIdentityTemplate
          onClick={() => {
            console.log("identity initialized");
            IdentityInitialize().then((response) => {
              setInitializedResponse(response);
            });
          }}
          title="Initialize Identity"
          response={initializedResponse}
          textBody={
            <div className="p-2">
              <div className="font-semibold">What just happened?</div>
              <div className="list-decimal">
                <li>
                  We Created the Identity Iframe and appended it to our project.
                  (Should be the last element in the body tag).
                </li>
                <li>
                  Then we established the event listener for "message" with a
                  callback and waits for the Iframe to emit an initialize
                  message.
                </li>

                <li>
                  Once the message has been sent Identity will make a call to
                  get app state and then its done.{" "}
                </li>
                <div className="font-semibold">
                  Initial message from IdentityFrame:
                </div>
                {initializedResponse && jsonBlock(initializedResponse)}
                <div>
                  {" "}
                  <div className="font-semibold">
                    The message we send in response to the IdentityFrame:
                  </div>
                  {initializedResponse &&
                    jsonBlock({
                      id: initializedResponse.id,
                      service: "identity",
                      payload: {},
                    })}
                </div>
                <div className="font-semibold">Github:</div>
                {initializedResponse && code}
              </div>
            </div>
          }
        />
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
