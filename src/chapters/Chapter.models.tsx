import { ReactElement } from "react";
import LayoutContent from "../components/layout/LayoutContent";
import { Chapter0 } from "./Chapter0";
import { Chapter1Section } from "./Chapter1/Chapter1Section";

export const CHAPTERS: Readonly<ChapterInfo> = {
  CHAPTER_0: {
    title: "Chapter 0: Getting Started",
    route: "/chapter0",
    component: function () {
      return <Chapter0 Chapters={CHAPTERS} selectedChapter={this} />;
    },
  },
  CHAPTER_1_GET_SINGLE_PROFILE: {
    title: "Chapter 1: Get Single Profile",
    route: "/chapter1/get-single-profile",
    component: function () {
      return <Chapter1Section chapters={CHAPTERS} selectedChapter={this} />;
    },
  },
  CHAPTER_1_GET_SOMETHING_ELSE: {
    title: "Chapter 1: Get Something Else",
    route: "/chapter1/get-something-else",
    component: function () {
      return <Chapter1Section chapters={CHAPTERS} selectedChapter={this} />;
    },
  },
  CHAPTER_SAMPLE_APP: {
    title: "Chapter4: Sample App",
    route: "/sample-app",
    component: () => <LayoutContent />,
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
  prev: function (currentChapter: Chapter) {
    const currentChapterIndex = this.chaptersToArray()
      .map((chapter, index) => {
        return { chapter, index };
      })
      .find((chapter) => {
        return chapter.chapter.chapterContent.title === currentChapter.title;
      });
    if (currentChapterIndex) {
      const nextChapter = this.chaptersToArray()[currentChapterIndex.index - 1];
      return nextChapter?.chapterContent ?? null;
    }
    return null;
  },
  next: function (currentChapter: Chapter) {
    const currentChapterIndex = this.chaptersToArray()
      .map((chapter, index) => {
        return { chapter, index };
      })
      .find((chapter) => {
        return chapter.chapter.chapterContent.title === currentChapter.title;
      });
    if (currentChapterIndex) {
      const nextChapter = this.chaptersToArray()[currentChapterIndex.index + 1];
      return nextChapter?.chapterContent ?? null;
    }
    return null;
  },
};
export interface ChapterInfo {
  CHAPTER_0: Chapter;
  CHAPTER_1_GET_SINGLE_PROFILE: Chapter;
  CHAPTER_1_GET_SOMETHING_ELSE: Chapter;
  CHAPTER_SAMPLE_APP: Chapter;
  next: (currentChapter: Chapter) => Chapter | null;
  prev: (currentChapter: Chapter) => Chapter | null;
  chaptersToArray: () => { chapterName: string; chapterContent: Chapter }[];
  //   CHAPTER_2: Chapter;
  //   CHAPTER_3: Chapter;
}
export interface Chapter {
  title: string;
  route: string;
  component: () => ReactElement;
}

export const BASE_URI: Readonly<string> = "https://node.deso.org/api/v0";
