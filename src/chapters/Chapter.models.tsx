import { ReactElement } from "react";
import LayoutContent from "../components/layout/LayoutContent";
import { Chapter0 } from "./Chapter0";
import Chapter1 from "./Chapter1/Chapter1";

export const CHAPTERS: Readonly<ChapterInfo> = {
  CHAPTER_0: {
    title: "Chapter 0: Getting Started",
    route: "/chapter0",
    component: <Chapter0 />,
  },
  CHAPTER_1: {
    title: "Chapter 1: Fetching Data On Chain",
    route: "/chapter1",
    component: <Chapter1 />,
  },
  CHAPTER_SAMPLE_APP: {
    title: "Chapter4: Sample App",
    route: "/sample-app",
    component: <LayoutContent />,
  },
  chaptersToArray: function () {
    const chapterArray: { chapterName: string; chapterContent: Chapter }[] = [];
    for (const [chapterName, chapterContent] of Object.entries(this)) {
      if ("title" in chapterContent) {
        chapterArray.push({
          chapterName,
          chapterContent,
        });
      }
    }
    return chapterArray;
  },
};
export interface ChapterInfo {
  CHAPTER_0: Chapter;
  CHAPTER_1: Chapter;
  CHAPTER_SAMPLE_APP: Chapter;
  chaptersToArray: () => { chapterName: string; chapterContent: Chapter }[];
  //   CHAPTER_2: Chapter;
  //   CHAPTER_3: Chapter;
}
export interface Chapter {
  title: string;
  route: string;
  component: ReactElement;
}

export const BASE_URI: Readonly<string> = "https://node.deso.org/api/v0";
