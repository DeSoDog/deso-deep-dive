import * as React from "react";
import { Button, TextField, Tooltip } from "@mui/material";
import { submitPost } from "../../services/DesoApiSubmitPost";
import { useRecoilValue } from "recoil";
import {
  SampleAppLoggedInUser,
  SampleAppMyPublicKey,
} from "../../recoil/AppState.atoms";
import { useState } from "react";
export default function CreatePostInput() {
  const myPublicKey = useRecoilValue(SampleAppMyPublicKey);
  const [postBody, setPostBody] = useState<string | null>(null);
  const loggedInUser = useRecoilValue(SampleAppLoggedInUser);
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
  );
}
