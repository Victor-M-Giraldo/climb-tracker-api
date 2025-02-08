export function isPrismaError(error, code) {
  return error?.code === code;
}
