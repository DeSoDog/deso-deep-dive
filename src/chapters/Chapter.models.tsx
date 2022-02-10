import React, { ReactElement } from "react";
import { Route } from "react-router-dom";
import LayoutContent from "../components/layout/LayoutContent";
import { Chapter0 } from "./Chapter0";
import { getFollowsStateless } from "./Read/get-follows-stateless/GetFollowsStateless.service";
import { Chapter1Section } from "./Read/ReadSection";
import { getSingleProfile } from "./Read/get-single-profile/GetSingleProfile.service";
import { getUserStateless } from "./Read/get-users-stateless/GetUserStateless.service";
import { ProfileAndFollowerCard } from "./Read/profile-card/ProfileCard";
import { IdentityInitialize } from "./Identity/IdentitySection";

export const CHAPTERS: Readonly<ChapterNavigation> = {
  CHAPTER_0: {
    title: "Getting Started",
    route: "/getting-started",
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
    title: "Get Single Profile",
    route: "/chapter1/get-single-profile",
    description: "get-single-profile",
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
    title: "Get Users Stateless",
    route: "/chapter1/get-users-stateless",
    description: "get-users-stateless",
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Chapter1Section
              chapters={CHAPTERS}
              selectedChapter={this}
              apiCall={getUserStateless}
            />
          }
        ></Route>
      );
    },
  },
  CHAPTER_1_GET_FOLLOWS_STATELESS: {
    title: "Get Follows Stateless",
    route: "/chapter1/get-follows-stateless",
    description: "get-followers-stateless",
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
  CHAPTER_1_PROFILE_CARD: {
    title: "Profile Card",
    route: "/chapter1/profile-cards",
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <ProfileAndFollowerCard
              selectedChapter={this}
              chapters={CHAPTERS}
            />
          }
        ></Route>
      );
    },
  },
  CHAPTER_2_SETTING_UP_IDENTITY: {
    title: "Setting Up Identity",
    route: "/chapter2/setting-up-identity",
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={<IdentityInitialize />}
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
  CHAPTER_1_PROFILE_CARD: Chapter;
  CHAPTER_2_SETTING_UP_IDENTITY: Chapter;
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
  description?: string;
  component: () => ReactElement;
}

export const BASE_URI: Readonly<string> = "https://node.deso.org/api/v0";
