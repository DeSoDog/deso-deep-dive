import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import { UserInfoResponse } from "../interfaces/UserInfo.interface";
import { ReactElement, useEffect, useState } from "react";
import {
  getUserInfo,
  getUserPicture,
  getUsersStateless,
} from "../services/DesoApi";
import Button from "@mui/material/Button";
export interface DisplayUserProps {
  user: UserInfoResponse;
  profilePictureSrc: string;
}
const DisplayUser = () => {
  const [user, setUser] = useState<UserInfoResponse | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [userFollowers, setUserFollowers] = useState<string | null>(null);
  const [card, setCard] = useState<ReactElement | null>(null);
  useEffect(() => {
    getInfo();
  }, []);
  useEffect(() => {
    if (profilePicture && user) {
      console.log(profilePicture, user);
      setCard(generateCard(user, profilePicture));
    }
  }, [profilePicture, user]);

  const getInfo = async () => {
    const user = await getUserInfo();
    const profilePictureSrc = getUserPicture(
      user?.Profile?.PublicKeyBase58Check
    );
    setUser(user);
    setProfilePicture(profilePictureSrc);

    const users = await getUsersStateless();
    console.log(users);
  };
  const generateCard = (user: UserInfoResponse, profilePictureSrc: string) => {
    return (
      <Card variant="outlined" className="mx-2 w-4/5 max-w-[850px]">
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
        >
          kasdf
        </CardHeader>
        <div className="flex justify-around mx-3 my-3 "></div>
        <div className="mx-2 mb-10">{user.Profile.Description}</div>
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
      <div>{card}</div>
    </>
  );
};
export default DisplayUser;
