import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import PublishIcon from "@mui/icons-material/Publish";
import { Tooltip } from "@mui/material";
export default function CreatePostInput() {
  return (
    <Paper component="form" className="flex align-center">
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Whats on your mind?"
        inputProps={{ "aria-label": "Whats on your mind?" }}
      />
      <IconButton type="submit" className="p-2" aria-label="search">
        <Tooltip title="Post Status" placement="top">
          <PublishIcon></PublishIcon>
        </Tooltip>
      </IconButton>
    </Paper>
  );
}
