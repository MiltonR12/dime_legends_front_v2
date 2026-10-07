/** Forma que devuelve el backend: `{ message, data }`. El éxito o error lo da el código HTTP. */
export interface ApiResponse<T = null> {
  message: string;
  data: T;
}
