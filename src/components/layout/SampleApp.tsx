import { ReactElement, useEffect, useState } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import {
  SampleAppState,
  AppStateEnum,
  SampleAppMyUserInfo,
  MyUserInfoType,
} from "../../recoil/AppState.atoms";
import DisplayFollowerFeed from "../DisplayFollowerFeed";
import DisplayPosts from "../profile/DisplayPosts";
import DisplayUser from "../profile/DisplayUser";

import { PublicKey } from "../../chapters/ChapterHelper/Chapter.atom";
import { Card, CardHeader } from "@mui/material";
const SampleApp = () => {
  const [appState, setAppState] = useRecoilState<AppStateEnum>(SampleAppState);
  const [user, setUser] = useRecoilState<MyUserInfoType>(SampleAppMyUserInfo);
  const myPublicKey = useRecoilValue(PublicKey);
  const [appStateContent, setAppStateContent] = useState<ReactElement | null>(
    null
  );
  useEffect(() => {
    setAppStateContent(generateAppStateContent());
  }, [appState, myPublicKey, user]);

  const generateAppStateContent = (): ReactElement => {
    switch (appState) {
      case AppStateEnum.MY_POST: {
        if (myPublicKey) {
          return (
            <>
              <div className="text-center font-bold text-lg mb-2 font-mono">
                {user?.profileInfoResponse?.Profile.Username}'s Posts
              </div>
              <div>
                <DisplayPosts publicKey={myPublicKey} />
              </div>
            </>
          );
        } else {
          return <></>;
        }
      }
      case AppStateEnum.MY_FOLLOWERS: {
        return (
          <>
            <div className="text-center font-bold text-lg mb-2 font-mono">
              {user?.profileInfoResponse?.Profile.Username}'s Followers
              <div>
                <DisplayFollowerFeed></DisplayFollowerFeed>
              </div>
            </div>
          </>
        );
      }
      case AppStateEnum.MY_FOLLOWERS_POST: {
        return (
          <>
            <div className="text-center font-bold text-lg mb-2 font-mono">
              {user?.profileInfoResponse?.Profile.Username}'s Feed
            </div>
          </>
        );
      }
      default: {
        return <></>;
      }
    }
  };
  return (
    <>
      <Card
        variant="outlined"
        className="bg-[#fff] w-2/5 px-3 mt-20 mx-auto mb-5 "
      >
        <CardHeader
          title=" Below you'll find a basic application that you can build with
          different endpoints covered in different sections."
        ></CardHeader>
      </Card>
      <div className="flex flex-col md:flex-row justify-around w-full mt-4  ">
        <div className="flex flex-col flex-grow-1">
          {myPublicKey !== null && (myPublicKey as string) !== "null" && (
            <DisplayUser
              publicKey={myPublicKey}
              isMyAccount={true}
            ></DisplayUser>
          )}
          {!(myPublicKey !== null && (myPublicKey as string) !== "null") && (
            <div className="mx-auto text-[#fff] ">you need to login first</div>
          )}
        </div>
        <div>
          <div className="w-[600px] mx-auto">{appStateContent}</div>
        </div>
      </div>
    </>
  );
};
export default SampleApp;
