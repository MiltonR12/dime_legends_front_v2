
export interface InitialStatePage {
  page: IPage | null;
  isLoading: boolean;
}

export interface IPage {
  _id: string;
  id_user: string;
  name: string;
  description: string;
  image: string | null;
  status: boolean;
  socialLinks: {
    platform: string;
    url: string;
  }[]
}