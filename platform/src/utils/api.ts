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

export interface Report {
  id?: number;
  title: string;
  description: string;
  created_at?: string;
}

export interface ProductionReport {
  quantity: number;
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
    }, 
    count: (): Promise<number> => {
      return get("/therapist/see/count");
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
  students: {
    create: (user: User, student: Student): Promise<void> => {
      return post("/student/enroll/create", { user, student });
    },
    list: (): Promise<[User, Student, string, string][]> => {
      return get("/student/see/all");
    },
    areas: (): Promise<string[]> => {
      return get("/student/create-report/areas");
    },
    names: (): Promise<[number, string][]> => {
      return get("/student/create-report/names");
    }
  },
  productionReports: {
    create: (report: Report, production_report: ProductionReport): Promise<void> => {
      return post("/production-report/make/create", { report, production_report });
    },
    list: (): Promise<[Report, ProductionReport][]> => {
      return get("/production-report/see/all");
    },
    count: (): Promise<number> => {
      return get("/production-report/see/count");
    }
  }
};
