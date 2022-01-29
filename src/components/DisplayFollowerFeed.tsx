import { ReactElement, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  FollowerInfo,
  FollowerInfoResponse,
} from "../interfaces/FollowerInfo.interface";
import {
  MyFollowersInfo,
  MyUserInfo,
  MyUserInfoType,
} from "../recoil/AppState.atoms";
import DisplayFollower from "./profile/DisplayFollower";
import DisplayUser from "./profile/DisplayUser";

const DisplayFollowerFeed = () => {
  const [user, setUser] = useRecoilState<MyUserInfoType>(MyUserInfo);

  const [userFollowers, setUserFollowers] =
    useRecoilState<FollowerInfoResponse | null>(MyFollowersInfo);
  const [followerCards, setFollowerCards] = useState<ReactElement[]>([]);
  useEffect(() => {
    setFollowerCards(generateFollowerCards());
    // console.log();
  }, []);
  const generateFollowerCards = (): ReactElement[] => {
    let followerCards: ReactElement[] = [];
    for (const publicKey in userFollowers?.PublicKeyToProfileEntry) {
      const follower: FollowerInfo | undefined =
        userFollowers?.PublicKeyToProfileEntry[publicKey];
      if (follower) {
        console.log(follower);
        followerCards.push(
          <DisplayFollower publicKey={publicKey}></DisplayFollower>
        );
      }
    }
    return followerCards;
  };
  return <>{followerCards}</>;
};
export default DisplayFollowerFeed;
