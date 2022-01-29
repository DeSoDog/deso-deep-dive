import { Button } from "@mui/material";
import { useRecoilState } from "recoil";
import { AppState, AppStateEnum } from "../recoil/AppState.atoms";

const UserActions = () => {
  const [appState, setAppState] = useRecoilState<AppStateEnum>(AppState);
  return (
    <div className="flex md:flex-row justify-center">
      <Button
        variant="text"
        size="small"
        onClick={() => {
          setAppState(AppStateEnum.MY_POST);
        }}
      >
        {" "}
        View Posts
      </Button>

      <Button
        variant="text"
        size="small"
        onClick={() => {
          setAppState(AppStateEnum.MY_FOLLOWERS);
        }}
      >
        View Followers
      </Button>
      <Button
        variant="text"
        size="small"
        onClick={() => {
          setAppState(AppStateEnum.MY_FOLLOWERS_POST);
        }}
      >
        View Followers Posts
      </Button>
    </div>
  );
};
export default UserActions;
