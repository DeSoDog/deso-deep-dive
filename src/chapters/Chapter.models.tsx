import { Route } from "react-router-dom";
import LayoutContent from "../components/layout/LayoutContent";
import { Chapter0 } from "./Chapter0";
import { getFollowsStateless } from "./Read/get-follows-stateless/GetFollowsStateless.service";
import { Chapter1Section } from "./Read/ReadSection";
import { getSingleProfile } from "./Read/get-single-profile/GetSingleProfile.service";
import { getUserStateless } from "./Read/get-users-stateless/GetUserStateless.service";
import { ProfileAndFollowerCard } from "./Read/profile-card/ProfileCard";
import { IdentityInitializePage } from "./Identity/identity-initialize/IdentityInitializePage";
import { IdentityLoginPage } from "./Identity/identity-login/IdentitiyLoginPage";
import { ReactElement } from "react";
import { IdentityLogoutPage } from "./Identity/identity-logout/IdentityLogoutPage";
import { DecryptMessagesPage } from "./Write/decrypt/DecryptMessagesPage";

export const CHAPTERS: Readonly<ChapterNavigation> = {
  GETTING_STARTED: {
    title: "Getting Started",
    route: "/getting-started",
    githubSource: ["N/A"],
    component: function () {
      return (
        <Route
          key={this.title}
          path="*"
          element={<Chapter0 Chapters={CHAPTERS} selectedChapter={this} />}
        ></Route>
      );
    },
  },
  READ_GET_SINGLE_PROFILE: {
    title: "Get Single Profile",
    route: "/read/get-single-profile",
    description: "get-single-profile",
    githubSource: [
      "https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/identity-initialize/IdentityInitialize.tsx",
    ],
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
  READ_GET_USERS_STATELESS: {
    title: "Get Users Stateless",
    route: "/read/get-users-stateless",
    description: "get-users-stateless",
    githubSource: [
      "https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Read/get-users-stateless/GetUserStateless.service.tsx",
    ],
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
  READ_GET_FOLLOWS_STATELESS: {
    title: "Get Follows Stateless",
    route: "/read/get-follows-stateless",
    description: "get-followers-stateless",
    githubSource: [
      "https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Read/get-follows-stateless/GetFollowsStateless.service.tsx",
    ],
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
  READ_PROFILE_CARD: {
    title: "Profile Card",
    route: "/read/profile-cards",
    githubSource: [
      "https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/components/profile/DisplayUser.tsx",
    ],
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
  IDENTITY_INITIALIZE: {
    title: "Initialize",
    route: "/identity/identity-initialize",
    githubSource: [
      "https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/identity-initialize/IdentityInitialize.tsx",
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <IdentityInitializePage
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },

  IDENTITY_LOGIN: {
    title: "Login",
    route: "/identity/identity-login",
    githubSource: [
      "https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/identity-login/IdentityLogin.tsx",
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <IdentityLoginPage chapters={CHAPTERS} selectedChapter={this} />
          }
        ></Route>
      );
    },
  },
  IDENTITY_LOGOUT: {
    title: "Logout",
    route: "/identity/identity-logout",
    githubSource: [
      "https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/identity-logout/IdentityLogout.service.tsx",
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <IdentityLogoutPage chapters={CHAPTERS} selectedChapter={this} />
          }
        ></Route>
      );
    },
  },
  IDENTITY_DECRYPT: {
    title: "Decrypt",
    route: "/identity/identity-decrypt",
    githubSource: [
      "https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/identity-decrypt/IdentityDecryption.service.tsx",
      "https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Write/get-messages-stateless.tsx",
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <DecryptMessagesPage chapters={CHAPTERS} selectedChapter={this} />
          }
        ></Route>
      );
    },
  },
  SAMPLE_APP: {
    title: "Sample App",
    route: "/sample-app",
    githubSource: ["N/A"],
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
  GETTING_STARTED: Chapter;
  READ_GET_SINGLE_PROFILE: Chapter;
  READ_GET_USERS_STATELESS: Chapter;
  READ_GET_FOLLOWS_STATELESS: Chapter;
  READ_PROFILE_CARD: Chapter;
  IDENTITY_INITIALIZE: Chapter;
  IDENTITY_LOGIN: Chapter;
  IDENTITY_LOGOUT: Chapter;
  IDENTITY_DECRYPT: Chapter;
  SAMPLE_APP: Chapter;
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
  githubSource: string[];
  component: () => ReactElement;
}

export const BASE_URI: Readonly<string> = "https://node.deso.org/api/v0";
