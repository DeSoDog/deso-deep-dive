import { Button, Link } from "@mui/material";
import { ReactElement } from "react";

import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { PublicKey } from "./Chapter.atom";
export interface ChapterTemplateProps {
  title: string;
  body: ReactElement;
  navigation: ReactElement;
}
export const ChapterTemplate = ({
  title,
  body,
  navigation,
}: ChapterTemplateProps) => {
  return (
    <div className="mx-auto mt-5  max-w-[800px] bg-[#fff] pb-2">
      <h1 className=" font-semibold text-3xl text-center bg-primary text-[#fff] py-2">
        {title}
      </h1>
      <div className="p-4">{body}</div>
      <div className=" mb-4 w-full">{navigation}</div>
    </div>
  );
};
