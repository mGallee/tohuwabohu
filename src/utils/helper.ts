export function assertUnreachable(value: never): never {
  throw new Error(`${value} should be unreachable`);
}
