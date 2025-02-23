export interface ValidationError {
    path: string;
    msg: string;
}

export interface ValidationErrorResponse {
    errors: ValidationError[];
}
