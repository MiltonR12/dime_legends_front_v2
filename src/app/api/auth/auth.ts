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
  name: string;
  description: string;
  image: File;
}