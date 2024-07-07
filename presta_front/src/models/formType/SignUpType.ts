// ! (1) react form hook + zod - création du schéma de donnée
import { FieldError, UseFormRegister } from "react-hook-form";
import { z } from "zod";

export type FormData = {
  avatar: any;
  name: string;
  job: string;
  tel: string;
  area: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Option = {
  name: string;
  value: string;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  options?: Option[];
  icon?: React.ReactNode;
};

export type ValidFieldNames =
  | "name"
  | "job"
  | "tel"
  | "area"
  | "email"
  | "password"
  | "avatar"
  | "confirmPassword";

export const SignupSchema = z
  .object({
    name: z.string().min(3, { message: "Username is too short" }),
    job: z.string(),
    tel: z.string(),
    area: z.string(),
    email: z.string().email(),
    avatar: z
      .any()
      .refine((file) => file[0]?.size <= 5000000, `Max file size is 5MB.`),
    password: z
      .string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });
