import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";

import { ProfileInfoResponse } from "../../interfaces/ProfileInfo.interface";
import { ReactElement, useEffect, useState } from "react";
import {
  getProfileInfo,
  getUserPicture,
  getFollowers,
  getUserInfoStateless,
} from "../../services/DesoApi";
import Button from "@mui/material/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  MyPublicKey,
  MyUserInfo,
  MyFollowersInfo,
  MyProfilePicture,
  MyUserInfoType,
} from "../../recoil/AppState.atoms";
import CreatePostInput from "./CreatePostInput";
import DisplayPosts from "./DisplayPosts";
import { FollowerInfoResponse } from "../../interfaces/FollowerInfo.interface";
import { getFollowerCount } from "../../services/utils";
export interface DisplayUserProps {
  publicKey: string | null;
}
const DisplayUser = () => {
  const myPublicKey = useRecoilValue(MyPublicKey);
  const [user, setUser] = useRecoilState<MyUserInfoType>(MyUserInfo);
  const [profilePicture, setProfilePicture] = useRecoilState<string | null>(
    MyProfilePicture
  );
  const [userFollowers, setUserFollowers] =
    useRecoilState<FollowerInfoResponse | null>(MyFollowersInfo);
  const [profileDescriptionCard, setCard] = useState<ReactElement | null>(null);
  useEffect(() => {
    getInfo(myPublicKey);
  }, []);

  useEffect(() => {
    if (profilePicture && user) {
      setCard(generateCard(user, profilePicture));
    }
  }, [profilePicture, user]);

  const getInfo = async (publicKey: string | null) => {
    let profileInfoResponse: ProfileInfoResponse;
    if (publicKey !== null) {
      const userInfoResponse = await getUserInfoStateless([publicKey]);
      profileInfoResponse = await getProfileInfo(publicKey);
      const profilePictureSrc = getUserPicture(
        profileInfoResponse?.Profile?.PublicKeyBase58Check
      );
      setUser({ profileInfoResponse, userInfoResponse });
      setProfilePicture(profilePictureSrc);
      const followers = await getFollowers(publicKey);
      setUserFollowers(followers);
    }
  };

  const generateCard = (
    myUserInfo: MyUserInfoType,
    profilePictureSrc: string
  ) => {
    console.log(myUserInfo);
    const userInfoResponse = myUserInfo?.userInfoResponse;
    const profileInfoResponse = myUserInfo?.profileInfoResponse;
    if (!(userInfoResponse && profileInfoResponse)) {
      return <></>;
    }
    return (
      <Card variant="outlined" className="mb-5 pb-2">
        <CardHeader
          avatar={<Avatar src={profilePictureSrc}></Avatar>}
          subheader={
            <div className="flex justify-start">
              <div className="font-bold">{`@${profileInfoResponse.Profile.Username}`}</div>
              <div className="ml-3 font-semibold">
                Followers: {userFollowers?.NumFollowers}
              </div>
              <div className="ml-3 font-semibold">
                Following: {getFollowerCount(userInfoResponse)}
              </div>
            </div>
          }
        ></CardHeader>
        <div className="flex justify-around mx-3 my-3 "></div>
        <div className="mx-4 mb-5">
          {profileInfoResponse.Profile.Description}
        </div>
        <div className=" ml-4 mr-20">
          <CreatePostInput></CreatePostInput>
        </div>
        <CardActions>
          <Button className="flex justify-around">follow</Button>
          <Button className="flex justify-around">tip</Button>
          <Button className="flex justify-around">message</Button>
        </CardActions>
      </Card>
    );
  };
  return (
    <div className="flex flex-col lg:w-2/5 lg:max-w-[650px] w-full">
      {profileDescriptionCard}
      <div className=" max-h-[30%]  overflow-auto">
        <DisplayPosts publicKey={myPublicKey} />
        <DisplayPosts publicKey={myPublicKey} />
      </div>
    </div>
  );
};
export default DisplayUser;
