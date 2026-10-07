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
    image?: string;
    status?: boolean;
    review?: "pending" | "approved" | "rejected";
    urlPage: string;
    urlGroup: string;
    urlImage: string;
  } | null;
  role: {
    name: string;
  }
}
