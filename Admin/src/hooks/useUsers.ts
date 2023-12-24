import useData from "./useData";

export interface User {
  _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
  isSuperuser: boolean;
}

const useUsers = () => {
  return useData<User>('/users');
}

export default useUsers;