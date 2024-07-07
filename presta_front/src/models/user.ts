export default interface User {
  id: string;
  name: string;
  area: string;
  job: string;
  email: string;
  password: string;
  isAdmin: boolean;
  avatar: string;
  enabled: boolean;
}