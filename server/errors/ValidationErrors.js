export class ValidationError extends Error {
  constructor(errors) {
    super('Validation Failed');
    this.name = 'ValidationError';
    this.errors = errors;
    this.status = 400;
    this.name = 'ValidationError';
  }
}
