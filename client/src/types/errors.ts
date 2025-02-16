export interface ValidationError {
    path: string;
    msg: string;
}

export interface LoginErrorResponse {
    errors: ValidationError[];
}
