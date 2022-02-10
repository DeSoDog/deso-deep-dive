import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { PageNavigation } from "../../../components/layout/PageNavigation";
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
  useEffect(() => {}, [setInitializedResponse, initializedResponse]);
  return (
    <ChapterTemplate
      title="Initialize Identity"
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
                  <div className="font-semibold">Initial Message:</div>
                  <div className="overflow-auto min-h-[100px] bg-[#dadada] p-4 mx-2 my-2">
                    {initializedResponse &&
                      JSON.stringify(initializedResponse, null, 4)}
                  </div>
                </li>

                <li>
                  {" "}
                  After receiving the above message we then send a message back
                  to create a session between our application and Identity.
                  <div className="overflow-auto min-h-[100px] bg-[#dadada] p-4 mx-2 my-2">
                    {initializedResponse &&
                      JSON.stringify({
                        id: initializedResponse.id,
                        service: "identity",
                        payload: {},
                      })}
                  </div>
                </li>
                <li>
                  Once the message has been sent Identity will make a call to
                  get app state and then its done.{" "}
                </li>
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
