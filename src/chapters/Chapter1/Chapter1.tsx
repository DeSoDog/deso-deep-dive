import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { PageNavigation } from "../../components/layout/PageNavigation";
import { PublicKey } from "../Chapter.atom";
import { CHAPTERS } from "../Chapter.models";
import { ChapterApiTemplate } from "../ChapterApiTemplate";
import { ChapterTemplate } from "../ChapterTemplate";
import {
  getSingleProfile,
  ProfileInfoRequest,
  ProfileInfoResponse,
} from "./API/GetSingleProfile";
export const Chapter1 = () => {
  const publicKey = useRecoilValue(PublicKey);
  const [response, setResponse] = useState<ProfileInfoResponse | null>(null);
  const [request, setRequest] = useState<ProfileInfoRequest | null>(null);
  const [endpoint, setEndpoint] = useState<string | null>(null);
  useEffect(() => {}, []);
  const getSingleProfileInfo = async () => {
    const profileResponse = await getSingleProfile(publicKey).catch(
      (e: Error) => alert(e.message)
    );
    if (profileResponse) {
      setResponse(profileResponse?.response);
      setEndpoint(profileResponse.endpoint);
      setRequest(profileResponse.request);
    }
  };
  return (
    <ChapterTemplate
      title={CHAPTERS.CHAPTER_1.title}
      body={
        <ChapterApiTemplate
          onClick={getSingleProfileInfo}
          title="get-single-profile"
          request={request}
          response={response}
          endpoint={endpoint}
        />
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
