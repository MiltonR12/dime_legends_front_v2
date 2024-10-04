export interface Futuresyo<T> {
  success: boolean;
  message: string;
  status: string;
  data: T | null;
}

export interface HttpResponse<F> {
  success: boolean;
  message: string;
  status: string;
  data: F | null;
}
