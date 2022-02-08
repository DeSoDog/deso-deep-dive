import { ReactElement, useEffect, useState } from "react";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import {
  SampleAppState,
  AppStateEnum,
  SampleAppMyPublicKey,
  SampleAppMyUserInfo,
  MyUserInfoType,
} from "../../recoil/AppState.atoms";
import DisplayFollowerFeed from "../DisplayFollowerFeed";
import DisplayPosts from "../profile/DisplayPosts";
import DisplayUser from "../profile/DisplayUser";
const LayoutContent = () => {
  const [appState, setAppState] = useRecoilState<AppStateEnum>(SampleAppState);
  const [user, setUser] = useRecoilState<MyUserInfoType>(SampleAppMyUserInfo);
  const myPublicKey = useRecoilValue(SampleAppMyPublicKey);
  const [appStateContent, setAppStateContent] = useState<ReactElement | null>(
    null
  );
  useEffect(() => {
    setAppStateContent(generateAppstateContent());
  }, [appState, myPublicKey, user]);

  const generateAppstateContent = (): ReactElement => {
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
    <div className="flex flex-col md:flex-row justify-around w-full mt-4  ">
      <div className="flex flex-col flex-grow-1">
        {myPublicKey !== null && (myPublicKey as string) !== "null" && (
          <DisplayUser publicKey={myPublicKey} isMyAccount={true}></DisplayUser>
        )}
        {!(myPublicKey !== null && (myPublicKey as string) !== "null") && (
          <div className="mx-auto ">you need to login first</div>
        )}
      </div>
      <div>
        <div className="w-[600px] mx-auto">{appStateContent}</div>
      </div>
    </div>
  );
};
export default LayoutContent;