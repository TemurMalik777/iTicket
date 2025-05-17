export class CreateCustomerDto {
  first_naem?: string;
  last_name?: string;
  full_name: string;
  phone: string;
  email: string;
  password: string;
  confirm_password: string;
  birth_date: Date;
  gender: "male" | "female";
  lang_id: string;
}
