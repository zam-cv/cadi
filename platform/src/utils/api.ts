import { post, get } from "./methods";

export interface UserInformation {
  email: string;
  permissions: string[];
}

export interface Session {
  token: string;
  user_information: UserInformation;
}

export default {
  auth: {
    signin: (email: string, password: string): Promise<Session> => {
      return post("/auth/signin", { email, password }, false);
    },
    logout: (): Promise<void> => {
      return get("/auth/logout");
    },
    verify: (): Promise<UserInformation> => {
      return get("/auth/verify");
    },
  }
};
