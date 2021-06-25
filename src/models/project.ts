import User from './user';

interface Project {
  title: string,
  description: string,
  owner: User
}

export default Project;
