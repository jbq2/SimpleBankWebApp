export interface CustomResponse {
    responseType: string;
    httpStatus: string;
    statusCode: number;
    message: string;
    body: Map<string, any>
}