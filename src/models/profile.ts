interface Profile {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,
  user_id: number,
  username: string,
  email: string,
  image: string,
  title: string,
  bio: string,
  website: string
}

export default Profile;
