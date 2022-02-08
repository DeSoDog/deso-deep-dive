import { ReactElement, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  FollowerInfo,
  FollowerInfoResponse,
} from "../interfaces/FollowerInfo.interface";
import {
  SampleAppMyFollowersInfo,
  SampleAppMyUserInfo,
  MyUserInfoType,
} from "../recoil/AppState.atoms";
import DisplayFollower from "./profile/DisplayFollower";

const DisplayFollowerFeed = () => {
  const [user, setUser] = useRecoilState<MyUserInfoType>(SampleAppMyUserInfo);
  const [userFollowers, setUserFollowers] =
    useRecoilState<FollowerInfoResponse | null>(SampleAppMyFollowersInfo);
  const [followerCards, setFollowerCards] = useState<ReactElement[]>([]);

  useEffect(() => {
    setFollowerCards(generateFollowerCards());
  }, []);

  const generateFollowerCards = (): ReactElement[] => {
    let followerCards: ReactElement[] = [];
    for (const publicKey in userFollowers?.PublicKeyToProfileEntry) {
      const follower: FollowerInfo | undefined =
        userFollowers?.PublicKeyToProfileEntry[publicKey];
      if (follower && publicKey !== "data") {
        followerCards.push(
          <>
            <DisplayFollower
              key={publicKey}
              publicKey={publicKey}
            ></DisplayFollower>
          </>
        );
      }
    }
    return followerCards;
  };
  return <>{followerCards}</>;
};
export default DisplayFollowerFeed;
