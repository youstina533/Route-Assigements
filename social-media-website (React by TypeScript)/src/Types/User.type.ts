export interface UserType {
  _id: string;
  id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
  gender: string;
  dateOfBirth: string;     
  createdAt: string;        
  bookmarks: string[];
  bookmarksCount: number;
  followers: string[];
  followersCount: number;
  following: string[];
  followingCount: number;
}