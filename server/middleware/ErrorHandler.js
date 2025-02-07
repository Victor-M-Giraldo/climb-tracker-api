import logger from '../config/loggers/winston.js';

export default function ErrorHandler(err, req, res, _next) {
  logger.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
}
