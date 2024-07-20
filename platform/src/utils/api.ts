import { post, get } from "./methods";

export interface UserInformation {
  email: string;
  permissions: string[];
}

export interface Session {
  token: string;
  user_information: UserInformation;
}

export interface User {
  id?: number;
  email: string;
  password: string;
}

export interface Therapist {
  firstname: string;
  lastname: string;
  birthdate: string;
  phone: string;
}

export interface Relative {
  firstname: string;
  lastname: string;
  location: string;
  phone: string;
}

export interface Student {
  relative_id: number;
  firstname: string;
  lastname: string;
  birthdate: string;
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
  },
  therapists: {
    create: (user: User, therapist: Therapist): Promise<void> => {
      return post("/therapist/enroll/create", { user, therapist });
    },
    list: (): Promise<[User, Therapist][]> => {
      return get("/therapist/see/all");
    }
  },
  relatives: {
    create: (user: User, relative: Relative): Promise<void> => {
      return post("/relative/enroll/create", { user, relative });
    },
    getNames: (): Promise<[number, string][]> => {
      return get("/relative/enroll/names");
    }
  },
  student: {
    create: (user: User, student: Student): Promise<void> => {
      return post("/student/enroll/create", { user, student });
    },
    list: (): Promise<[User, Student, string, string][]> => {
      return get("/student/see/all");
    }
  }
};
