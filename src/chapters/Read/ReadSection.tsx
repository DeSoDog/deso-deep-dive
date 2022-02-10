import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { PageNavigation } from "../../components/layout/PageNavigation";
import { PublicKey } from "../Chapter.atom";
import { BASE_URI, Chapter, ChapterNavigation } from "../Chapter.models";
import { ChapterApiTemplate } from "../ChapterApiTemplate";
import { ChapterTemplate } from "../ChapterTemplate";
import {
  ProfileInfoRequest,
  ProfileInfoResponse,
} from "./get-single-profile/GetSingleProfile.service";
export interface Chapter1SectionProps {
  selectedChapter: Chapter;
  chapters: ChapterNavigation;
  apiCall: (params: any) => any;
}
export const Chapter1Section = ({
  selectedChapter,
  chapters,
  apiCall,
}: Chapter1SectionProps) => {
  const publicKey = useRecoilValue(PublicKey);
  const [response, setResponse] = useState<ProfileInfoResponse | null>(null);
  const [request, setRequest] = useState<ProfileInfoRequest | null>(null);
  const [endpoint, setEndpoint] = useState<string | null>(null);
  const [chapterTitle, setChapterTitle] = useState<null>(null);
  useEffect(() => {
    // clear out the page if they hit go to the next section
    if (chapterTitle !== selectedChapter.title) {
      setResponse(null);
      setEndpoint(null);
      setRequest(null);
      setChapterTitle(chapterTitle);
    }
  }, [selectedChapter]);
  const executeApiCall = async () => {
    const apiResponse = await apiCall(publicKey).catch((e: Error) =>
      alert(e.message)
    );
    if (apiResponse) {
      setResponse(apiResponse?.response);
      setEndpoint(`${BASE_URI}/${apiResponse.endpoint}`);
      setRequest(apiResponse.request);
    }
  };
  return (
    <ChapterTemplate
      title={selectedChapter.title}
      body={
        <ChapterApiTemplate
          onClick={executeApiCall}
          title={selectedChapter.description ?? ""}
          request={request}
          response={response}
          endpoint={endpoint}
        />
      }
      navigation={
        <PageNavigation
          previous={chapters.prev(selectedChapter) as Chapter}
          next={chapters.next(selectedChapter) as Chapter}
        />
      }
    />
  );
};
export default Chapter1Section;
