import { Button, Link } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import { Chapter, ChapterNavigation } from "./Chapter.models";
import { ChapterTemplate } from "./ChapterTemplate";
export interface Chapter0Props {
  selectedChapter: Chapter;
  Chapters: ChapterNavigation;
}
export const Chapter0 = ({ selectedChapter, Chapters }: Chapter0Props) => {
  return (
    <ChapterTemplate
      title="Chapter 0: Getting Started"
      body={
        <>
          <div className="pb-2">
            Welcome To <strong>DeSo Deep Dive</strong> the first Deso tutorial
            that walks you through building your own application on the DeSo
            blockchain! If you don't have the guide for this application you can
            find the link here:{" "}
            <Link href="https://google.com" target="_blank">
              Deso-Deep-Dive
            </Link>
          </div>
          <div>
            This application follows a chapter structure where you can learn
            about different parts of common application implementations in a
            linear manner. If you are new to deso development we recommend
            starting at chapter one, however if you are looking to implement a
            specific feature feel free to skip ahead by toggling the navigation
            bar to the left and selecting your desired chapter. Otherwise click
            the get started button below.
          </div>
        </>
      }
      navigation={
        <>
          <div className="flex justify-center h-1/2">
            <div className="mt-auto mb-2">
              <Button variant="contained">
                <RouterLink
                  to={Chapters.next(selectedChapter)?.route as string}
                >
                  Get Started
                </RouterLink>
              </Button>
            </div>
          </div>
        </>
      }
    ></ChapterTemplate>
  );
};
