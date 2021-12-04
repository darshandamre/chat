import { FieldError, UserRegisterInput } from "../resolvers/user";

export const validateRegister = ({
  email,
  password,
  username
}: UserRegisterInput): FieldError[] | null => {
  if (!email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email"
      }
    ];
  }

  if (username.length <= 2) {
    return [
      {
        field: "username",
        message: "length must be greater then 2"
      }
    ];
  }

  if (username.includes("@")) {
    return [
      {
        field: "username",
        message: "cannot include @"
      }
    ];
  }

  if (password.length <= 2) {
    return [
      {
        field: "password",
        message: "length must be greater then 2"
      }
    ];
  }
  return null;
};
