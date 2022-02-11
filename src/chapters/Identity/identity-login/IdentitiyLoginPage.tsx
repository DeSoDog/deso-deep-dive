import { useEffect } from "react";
import { PageNavigation } from "../../../components/layout/PageNavigation";
import { Chapter, ChapterNavigation } from "../../Chapter.models";
import { ChapterTemplate } from "../../ChapterTemplate";
import { identityLogin } from "./IdentityLogin";

export interface IdentityLoginProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}
export const IdentityLoginPage = ({
  selectedChapter,
  chapters,
}: IdentityLoginProps) => {
  useEffect(() => {}, []);
  return (
    <ChapterTemplate
      title="Login With Identity"
      body={
        <div>
          <div className="p-2">
            <div>
              Click{" "}
              <span
                className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
                onClick={() => {
                  identityLogin();
                }}
              >
                here
              </span>{" "}
              to login with Identity.
            </div>
            <div className="font-semibold">What just happened?</div>
          </div>
          <div className="list-decimal p-2">
            <li>
              We Created the Identity Iframe and appended it to our project.
              (Should be the last element in the body tag).
            </li>
            <li>
              Then we established the event listener for "message" with a
              callback and waits for the Iframe to emit an initialize message.
              <div className="font-semibold">Initial Message:</div>
              <div className="overflow-auto min-h-[100px] bg-[#dadada] p-4 mx-2 my-2">
                {/* {initializedResponse &&
                      JSON.stringify(initializedResponse, null, 4)} */}
              </div>
            </li>

            <li>
              {" "}
              After receiving the above message we then send a message back to
              create a session between our application and Identity.
              <div className="overflow-auto min-h-[100px] bg-[#dadada] p-4 mx-2 my-2">
                {/* {initializedResponse &&
                      JSON.stringify({
                        id: initializedResponse.id,
                        service: "identity",
                        payload: {},
                      })} */}
              </div>
            </li>
            <li>
              Once the message has been sent Identity will make a call to get
              app state and then its done.{" "}
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
  );
};
