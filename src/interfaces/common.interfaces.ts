export interface RandomCodeType {
  length: number;
  numbers?: boolean;
  symbols?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  excludeSimilarCharacters?: boolean;
}

export interface IServiceError {
  status: number;
  message: string;
  error?: any;
}

export interface IServiceResponse<T> {
  result?: T;
  error?: IServiceError;
}

export interface IAPIError extends IServiceError {
  res: Response;
}

export interface IAPIResponse {
  res: Response;
  data?: any;
}
