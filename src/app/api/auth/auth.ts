export interface PLogin {
  email: string;
  password: string;
}

export interface PRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contact: number
}

export interface PCreatePage {
  pageName: string;
  description: string;
  urlPage: string;
  urlGroup: string;
}