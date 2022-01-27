import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";

import {
  UserInfoRequest,
  UserInfoResponse,
} from "../../interfaces/UserInfo.interface";
import { ReactElement, useEffect, useState } from "react";
import {
  getUserInfo,
  getUserPicture,
  getFollowers,
} from "../../services/DesoApi";
import Button from "@mui/material/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  MyPublicKey,
  MyUserInfo,
  MyFollowersInfo,
  MyProfilePicture,
} from "../../recoil/AppState.atoms";
import CreatePostInput from "./CreatePostInput";
import DisplayPosts from "./DisplayPosts";
export interface DisplayUserProps {
  publicKey: string | null;
}
const DisplayUser = () => {
  const myPublicKey = useRecoilValue(MyPublicKey);
  const [user, setUser] = useRecoilState<UserInfoResponse | null>(MyUserInfo);
  const [profilePicture, setProfilePicture] = useRecoilState<string | null>(
    MyProfilePicture
  );
  const [userFollowers, setUserFollowers] =
    useRecoilState<UserInfoResponse[]>(MyFollowersInfo);
  const [profileDescriptionCard, setCard] = useState<ReactElement | null>(null);
  useEffect(() => {
    getInfo(myPublicKey);
  }, []);

  useEffect(() => {
    if (profilePicture && user) {
      console.log(profilePicture, user);
      setCard(generateCard(user, profilePicture));
    }
  }, [profilePicture, user]);

  const getInfo = async (publicKey: string | null) => {
    let user: UserInfoResponse;
    if (publicKey !== null) {
      user = await getUserInfo(publicKey);
      const profilePictureSrc = getUserPicture(
        user?.Profile?.PublicKeyBase58Check
      );
      setUser(user);
      setProfilePicture(profilePictureSrc);

      const followers = await getFollowers(publicKey);
      console.log(followers);
    }
  };

  const generateCard = (user: UserInfoResponse, profilePictureSrc: string) => {
    return (
      <Card variant="outlined" className="mr-2 w-4/5 max-w-[850px]">
        <CardHeader
          avatar={<Avatar src={profilePictureSrc}></Avatar>}
          title={`@${user.Profile.Username}`}
          subheader={
            <div className="flex">
              <div>follower: </div>
              <div>following: </div>
              <div>asdf</div>
            </div>
          }
        ></CardHeader>
        <div className="flex justify-around mx-3 my-3 "></div>
        <div className="mx-4 mb-5">{user.Profile.Description}</div>
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
    <>
      <div>{profileDescriptionCard}</div>
      <DisplayPosts publicKey={myPublicKey} />
      <div>{}</div>
    </>
  );
};
export default DisplayUser;
