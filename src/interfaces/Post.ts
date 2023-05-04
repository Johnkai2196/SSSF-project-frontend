import { User } from "./User";

interface Post {
  id: string;
  user: User;
  text: string;
  image: string;
  profilePicture: string;
  dateAdded: string;
  likes: number;
}
export type { Post };
