import { PageNavigation } from "../../../components/layout/PageNavigation";
import { Chapter, ChapterNavigation } from "../../Chapter.models";
import { ChapterTemplate } from "../../ChapterTemplate";
import { useEffect, useState } from "react";
import {
  getSingleProfile,
  ProfileInfoResponse,
} from "../get-single-profile/GetSingleProfile.service";
import {
  FollowerInfoResponse,
  getFollowsStateless,
} from "../get-follows-stateless/GetFollowsStateless.service";
import {
  getUserStateless,
  UserInfoResponse,
} from "../get-users-stateless/GetUserStateless.service";
import { useRecoilValue } from "recoil";
import { PublicKey } from "../../Chapter.atom";
import DisplayUser from "../../../components/profile/DisplayUser";
import { Button, Link } from "@mui/material";
import { getSourceFromGithub } from "../../../services/utils";

export interface ProfileCardProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}
export const ProfileAndFollowerCard = ({
  selectedChapter,
  chapters,
}: ProfileCardProps) => {
  const publicKey = useRecoilValue(PublicKey);
  const [profile, setProfile] = useState<ProfileInfoResponse | null>(null);
  const [user, setUser] = useState<UserInfoResponse | null>(null);
  const [follows, setFollows] = useState<FollowerInfoResponse | null>(null);
  const [showSample, toggleSample] = useState<boolean>(false);
  const [code, setCode] = useState<any | null>(null);
  const getData = async () => {
    setProfile((await getSingleProfile(publicKey)).response);
    setUser((await getUserStateless(publicKey)).response);
    setFollows((await getFollowsStateless(publicKey)).response);
  };

  useEffect(() => {
    getData();
    getSourceFromGithub(selectedChapter.githubSource).then((response) => {
      setCode(response);
    });
  }, []);
  return (
    <ChapterTemplate
      title="Profile And Follower Card"
      body={
        <div className="h-min-[300px] text-center">
          go to src\chapters\Chapter1\profile-card\ProfileCard.tsx and build
          your own profile card. Click{" "}
          <span
            className="cursor-pointer text-[#1776cf] hover:text-[#fff]"
            onClick={() => toggleSample(!showSample)}
          >
            here
          </span>{" "}
          to show a sample profile card.
          {showSample && (
            <DisplayUser
              publicKey="BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY"
              isMyAccount={false}
            ></DisplayUser>
          )}
          {showSample && (
            <div className="font-semibold text-lg text-left mx-2">
              Github:
              <div className="text-base">{code && code}</div>
            </div>
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
