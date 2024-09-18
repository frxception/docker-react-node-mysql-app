export type ValueOf<T> = T[keyof T];

// K is the union keyof T whose type is required,
// the remaining keys of T have the same type
export type RequiredKeys<T, K extends keyof T> = Required<Pick<T, Extract<keyof T, K>>> &
  Omit<T, Extract<keyof T, K>>;
