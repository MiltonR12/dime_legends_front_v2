export interface Configuration {
  minPlayers: number;
  maxPlayers: number;
  maxTeams: number;
  registrationEnd: Date;
  tipo: "doble" | "simple" | "normal";
}

export interface IPayment {
  qrImage: File;
  account: string;
  amount: number;
}

export interface PTournament {
  name: string;
  formUrl: string;
  dateStart: string;
  game: string;
  image: File;
  banners?: File[];
  description: string;
  rules: string[];
  award: string[];
  config: Configuration;
  payment: IPayment | null;
}

export interface PUpdateTournament {
  _id: string;
  name?: string;
  formUrl?: string;
  dateStart?: string;
  game?: string;
  image?: File;
  bannerOrder?: string[];
  bannerFiles?: File[];
  description?: string;
  rules?: string[];
  award?: string[];
  config?: Partial<Configuration>;
  payment?: IPayment | null;
  status?: boolean;
}
