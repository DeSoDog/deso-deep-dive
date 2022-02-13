import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { SampleAppToggleDrawer } from "../../recoil/AppState.atoms";
import { ChapterNavigation } from "../../chapters/ChapterHelper/Chapter.models";
export interface DesoDrawerProps {
  chapters: ChapterNavigation;
}
export default function DesoDrawer({ chapters }: DesoDrawerProps) {
  const [toggleState, setToggleDrawer] = useRecoilState(SampleAppToggleDrawer);
  const toggle =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setToggleDrawer(open);
    };

  const list = () => (
    <Box role="presentation" onClick={toggle(false)} onKeyDown={toggle(false)}>
      <div className="min-h-[64px]"></div>
      <List>
        {chapters.chaptersToArray().map((chapter) => {
          return (
            <div
              key={chapter.chapterName}
              className="hover:bg-[#c2c2c2] cursor-click"
            >
              <ListItem className="flex justify-center">
                <Link
                  to={`${chapter.chapterContent.route}`}
                  className="ml-2"
                >{`${chapter.chapterContent.title}`}</Link>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Drawer open={toggleState} variant="temporary" anchor="left">
      {list()}
    </Drawer>
  );
}
