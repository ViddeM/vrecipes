export interface Me {
  id: string;
  name: string;
  emails: UserEmail[];
}

export interface UserEmail {
  email: string;
  provider: string;
}
