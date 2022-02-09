import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { SampleAppToggleDrawer } from "../../recoil/AppState.atoms";
import { ChapterNavigation } from "../../chapters/Chapter.models";
export interface DesoDrawerProps {
  routes: string[];
  chapters: ChapterNavigation;
}
export default function DesoDrawer({ routes, chapters }: DesoDrawerProps) {
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
      <h1 className="font-semibold text-xl bg-primary text-[#fff] py-2 px-4">
        Deso Deep Dive
      </h1>
      <List>
        {chapters.chaptersToArray().map((chapter) => {
          return (
            <div key={chapter.chapterName}>
              <ListItem button className="flex justify-center">
                <Link
                  to={`${chapter.chapterContent.route}`}
                  className="ml-2"
                >{`${chapter.chapterName}`}</Link>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Drawer anchor={"left"} open={toggleState} onClose={toggle(false)}>
      {list()}
    </Drawer>
  );
}
