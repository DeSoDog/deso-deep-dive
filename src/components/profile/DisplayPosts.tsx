import { Avatar, CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import { ReactElement, useEffect, useState } from "react";
import { PostInfoResponse } from "../../interfaces/PostInfo.interface";
import { getPostsForPublicKey, getUserPicture } from "../../services/DesoApi";
export interface CreatePostProps {
  publicKey: string;
}
const DisplayPosts = ({ publicKey }: CreatePostProps) => {
  const [posts, setPosts] = useState<ReactElement[]>([]);
  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async (): Promise<void> => {
    const posts: PostInfoResponse = await getPostsForPublicKey(publicKey);
    setPosts(generatePosts(posts));
  };

  const generatePosts = (postInfo: PostInfoResponse): ReactElement[] => {
    let postElements: ReactElement[] = [];
    if (postInfo.Posts) {
      postElements = postInfo.Posts.map((post, index) => {
        const profilePictureSrc = getUserPicture(
          post.PosterPublicKeyBase58Check
        );
        return (
          <Card key={index} className="mb-5 pb-2">
            <CardHeader
              avatar={<Avatar src={profilePictureSrc}></Avatar>}
              title={`@${"TyFischer"}`}
            ></CardHeader>
            <div className="pl-4">{post.Body}</div>
          </Card>
        );
        // post.Body;
      });
    }
    if (postElements.length > 0) {
      return postElements;
    }
    return [];
  };
  return <div className="flex flex-col">{posts}</div>;
};
export default DisplayPosts;
