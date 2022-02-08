import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import { Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ToggleDrawer } from "../../recoil/AppState.atoms";
export interface DesoDrawerProps {
  routes: string[];
}
export default function DesoDrawer({ routes }: DesoDrawerProps) {
  const [toggleState, setToggleDrawer] = useRecoilState(ToggleDrawer);

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
        {routes.map((text, index) => (
          <div key={text}>
            <ListItem button className="flex justify-center">
              <Link
                to={`chapter${text}`}
                className="ml-2"
              >{`Chapter ${text}`}</Link>
            </ListItem>
            <Divider />
          </div>
        ))}

        <ListItem button className="flex justify-center">
          <Link to={`sample-app`} className="ml-2">
            sample app
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer anchor={"left"} open={toggleState} onClose={toggle(false)}>
      {list()}
    </Drawer>
  );
}
