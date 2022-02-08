import { PageNavigation } from "../components/layout/PageNavigation";
import { CHAPTERS } from "./Chapter.models";
import { ChapterTemplate } from "./ChapterTemplate";
export const Chapter1 = () => {
  return (
    <ChapterTemplate
      title={CHAPTERS.CHAPTER_1.title}
      body={
        <>
          <div>hello</div>
        </>
      }
      navigation={
        <PageNavigation
          previous={CHAPTERS.CHAPTER_0}
          next={CHAPTERS.CHAPTER_1}
        />
      }
    />
  );
};
export default Chapter1;
