import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Chapter } from "../../chapters/Chapter.models";
export interface PageNavigationProps {
  previous: Chapter;
  next: Chapter;
}
export const PageNavigation = ({ previous, next }: PageNavigationProps) => {
  return (
    <div className="flex justify-around  mx-auto">
      <Button variant="contained" size="medium">
        <Link to={previous.route}>{previous.title}</Link>
      </Button>
      <Button variant="contained" size="medium">
        <Link to={next.route}>{next.title}</Link>
      </Button>
    </div>
  );
};
