import logger from '../config/loggers/winston.js';
import { ApiException } from '../errors/ApiErrors.js';
import { ValidationError } from '../errors/ValidationErrors.js';

export default function ErrorHandler(err, req, res, _next) {
  logger.error(err.stack);

  if (err instanceof ApiException) {
    return res.status(err.status).json({
      type: err.name,
      message: err.message,
    });
  }

  if (err instanceof ValidationError) {
    return res.status(err.status).json({
      type: err.name,
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(500).json({
    type: 'InternalServerError',
    message: 'Something unexpected went wrong!',
  });
}
