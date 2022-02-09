import { ReactElement } from "react";
import { Route } from "react-router-dom";
import LayoutContent from "../components/layout/LayoutContent";
import { Chapter0 } from "./Chapter0";
import { getFollowsStateless } from "./Chapter1/get-follows-stateless/GetFollowsStateless.service";
import { Chapter1Section } from "./Chapter1/get-single-profile/Chapter1Section";
import { getSingleProfile } from "./Chapter1/get-single-profile/GetSingleProfile.service";
import { getUserInfoStateless } from "./Chapter1/get-users-stateless/GetUserStateless.service";

export const CHAPTERS: Readonly<ChapterNavigation> = {
  CHAPTER_0: {
    title: "Chapter 0: Getting Started",
    route: "/chapter0",
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<Chapter0 Chapters={CHAPTERS} selectedChapter={this} />}
        ></Route>
      );
    },
  },
  CHAPTER_1_GET_SINGLE_PROFILE: {
    title: "Chapter 1: Get Single Profile",
    route: "/chapter1/get-single-profile",
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Chapter1Section
              chapters={CHAPTERS}
              selectedChapter={this}
              apiCall={getSingleProfile}
            />
          }
        ></Route>
      );
    },
  },
  CHAPTER_1_GET_USERS_STATELESS: {
    title: "Chapter 1: Get User Stateless",
    route: "/chapter1/get-something-else",
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Chapter1Section
              chapters={CHAPTERS}
              selectedChapter={this}
              apiCall={getUserInfoStateless}
            />
          }
        ></Route>
      );
    },
  },
  CHAPTER_1_GET_FOLLOWS_STATELESS: {
    title: "Chapter 1: Get Followers Stateless",
    route: "/chapter1/get-follows-stateless",
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Chapter1Section
              chapters={CHAPTERS}
              selectedChapter={this}
              apiCall={getFollowsStateless}
            />
          }
        ></Route>
      );
    },
  },

  CHAPTER_SAMPLE_APP: {
    title: "Chapter4: Sample App",
    route: "/sample-app",
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<LayoutContent />}
        ></Route>
      );
    },
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
export interface ChapterNavigation {
  CHAPTER_0: Chapter;
  CHAPTER_1_GET_SINGLE_PROFILE: Chapter;
  CHAPTER_1_GET_USERS_STATELESS: Chapter;
  CHAPTER_1_GET_FOLLOWS_STATELESS: Chapter;
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
