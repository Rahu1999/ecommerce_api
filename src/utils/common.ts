export function isError(obj: any): obj is Error {
    return obj && obj.message !== undefined;
  }