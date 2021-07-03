import Profile from './profile';

interface Project {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  title: string,
  description: string,
  ownerId: number,
  owner: Profile
}

export default Project;
