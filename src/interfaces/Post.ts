import { User } from "./User";

interface Post {
  id?: string;
  user?: User;
  text?: string;
  image?: string;
  likes?: number;
  tags?: string[];
}
export type { Post };
