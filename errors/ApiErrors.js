class ApiException extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'ClimbTrackerApiException';
  }
}

export { ApiException };
