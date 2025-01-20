import { Course } from "./Course";

export interface Registration {
    id: string;
    vorname: string;
    name: string;
    birthdate: string,
    course: Course,
    courseId: number,
    registrationDate: string;
  }