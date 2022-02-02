import * as React from "react";
import { Button, TextField, Tooltip } from "@mui/material";
import { submitPost } from "../../services/DesoApiSubmitPost";
import { useRecoilValue } from "recoil";
import { LoggedInUser, MyPublicKey } from "../../recoil/AppState.atoms";
import { useState } from "react";
export default function CreatePostInput() {
  const myPublicKey = useRecoilValue(MyPublicKey);
  const [postBody, setPostBody] = useState<string | null>(null);
  const loggedInUser = useRecoilValue(LoggedInUser);
  const createPost = () => {
    if (myPublicKey && postBody && loggedInUser) {
      submitPost(myPublicKey, loggedInUser, postBody);
    }
  };
  return (
    <div>
      <TextField
        fullWidth
        onChange={(event) => {
          setPostBody(event.target.value);
        }}
      />
      <Button onClick={createPost}>Submit Post</Button>
    </div>
    // <Paper component="form" className="flex align-center">
    //   <InputBase

    //     sx={{ ml: 1, flex: 1 }}
    //     placeholder="Whats on your mind?"
    //     inputProps={{ "aria-label": "Whats on your mind?" }}
    //   />
    //   <IconButton type="submit" className="p-2" aria-label="search">
    //     <Tooltip title="Post Status" placement="top">
    //       <PublishIcon></PublishIcon>
    //     </Tooltip>
    //   </IconButton>
    // </Paper>
  );
}
