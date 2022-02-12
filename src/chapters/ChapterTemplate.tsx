import { ReactElement, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/system/Box";
export interface ChapterTemplateProps {
  title: string;
  body: ReactElement;
  tabs?: TabItem[];
  navigation: ReactElement;
}

export const ChapterTemplate = ({
  body,
  tabs,
  navigation,
}: ChapterTemplateProps) => {
  return (
    <div className="mx-auto mt-5  max-w-[1600px] bg-[#fff] pb-2">
      {/* <h1 className=" font-semibold text-3xl text-center  py-2">{title}</h1> */}

      {tabs && <DeSoTabs tabs={tabs} />}
      <div className="p-4">{body}</div>
      <div className="p-4"></div>
      <div className="mb-4 w-full">{navigation}</div>
    </div>
  );
};

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="p-3">{children}</div>}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export interface TabItem {
  title: string;
  subTitle: ReactElement;
  content: ReactElement;
}

export interface TabProps {
  tabs: TabItem[];
}

export default function DeSoTabs({ tabs }: TabProps) {
  const [value, setValue] = useState(0);
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div className="w-full">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabs.map((tab, index) => {
            return <Tab label={tab.title} {...a11yProps(index)} />;
          })}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => {
        return (
          <TabPanel value={value} index={index}>
            {tab.subTitle}
            {tab.content}
          </TabPanel>
        );
      })}
    </div>
  );
}
