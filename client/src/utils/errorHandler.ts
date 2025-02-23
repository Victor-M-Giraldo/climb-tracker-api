import { ValidationErrorResponse, ValidationError } from "../types/errors";

function formatErrors(errors: ValidationError[]): Record<string, string> {
    const serverErrors: Record<string, string> = {};
    errors.forEach((error: ValidationError) => {
        serverErrors[error.path] = error.msg;
    });
    return serverErrors;
}

export async function handleErrors(response: Response) {
    const data = await response.json();
    switch (response.status) {
        case 400: {
            const { errors } = data as ValidationErrorResponse;
            const serverErrors = formatErrors(errors);
            return serverErrors;
        }
        case 401:
            return { general: 'Invalid email or password' };
        default:
            return { general: 'Something went wrong' };
    }
}
