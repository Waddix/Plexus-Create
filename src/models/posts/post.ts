import PostOwner from "./postOwner";
import PostProject from "./postProject";

interface Post {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  text: string,
  project: PostProject,
  owner: PostOwner
}

export default Post;