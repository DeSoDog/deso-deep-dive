import { PageNavigation } from "../../../components/layout/PageNavigation";
import { Chapter, ChapterNavigation } from "../../Chapter.models";
import { ChapterTemplate } from "../../ChapterTemplate";
import DisplayUser from "../../../components/profile/DisplayUser";
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

export interface ProfileAndFollowerCardProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
}
export const ProfileAndFollowerCard = ({
  selectedChapter,
  chapters,
}: ProfileAndFollowerCardProps) => {
  const publicKey = useRecoilValue(PublicKey);
  const [profile, setProfile] = useState<ProfileInfoResponse | null>(null);
  const [user, setUser] = useState<UserInfoResponse | null>(null);
  const [follows, setFollows] = useState<FollowerInfoResponse | null>(null);
  const getData = async () => {
    setProfile((await getSingleProfile(publicKey)).response);
    setUser((await getUserStateless(publicKey)).response);
    setFollows((await getFollowsStateless(publicKey)).response);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ChapterTemplate
      title="Profile And Follower Card"
      body={
        <div className="h-[300px] text-center">
          your content here
          {/* sample card for inspiration  */}
          {/* <DisplayUser
            publicKey="BC1YLheA3NepQ8Zohcf5ApY6sYQee9aPJCPY6m3u6XxCL57Asix5peY"
            isMyAccount={false}
          ></DisplayUser> */}
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
