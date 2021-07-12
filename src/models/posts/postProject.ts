import PostTag from "./postTag";

interface PostProject {
  id: number,
  title: string,
  tags?: PostTag | null,
}

export default PostProject;