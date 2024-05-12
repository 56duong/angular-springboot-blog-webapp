export interface Role {
  id?: number;
  name?: RoleEnum;
  description?: string;
}

export enum RoleEnum {
  USER = 1,
  STAFF = 2,
  ADMIN = 3
}
