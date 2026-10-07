export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  biography: string;
  image: string;
  contact: string;
  page: {
    name: string;
    description: string;
    urlPage: string;
    urlGroup: string;
    urlImage: string;
  }
  role: {
    name: string;
  }
}
