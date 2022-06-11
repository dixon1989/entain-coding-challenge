type Nullable<T> = T | null;

type ValueOf<T> = T[keyof T];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InferTypes<T> = T extends { [key: string]: infer U } ? U : any;
