export interface IAuthInput {
  id: string;
  placeholder: string;
  type: "email" | "text" | "password";
  required?: boolean;
  label?: string;
}
