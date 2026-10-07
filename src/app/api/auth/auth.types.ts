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
    description: string | null;
    image?: string | null;
    banner?: string | null;
    status?: boolean;
    review?: "pending" | "approved" | "rejected";
    socialLinks?: { platform: string; url: string }[];
    urlPage: string;
    urlGroup: string;
    urlImage: string;
  } | null;
  role: {
    name: string;
  }
}
