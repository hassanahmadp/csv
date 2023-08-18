interface Person {
  __v?: any
  _id?: string | number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  error?: string;
}

enum memberRoles {
  "ADMIN" = "ADMIN",
  "USER" = "USER",
}
interface Admin extends Person {
  role: 'ADMIN';
}

interface User extends Person, OtherUserInfo {
  role: 'USER';
  member_number: number;
}

const IsActive = {
  "active":"active",
  "inactive":"inactive",
  "retired":"retired"
} as const


interface Token {
  id: string | number | undefined,
  name: string
  email: string
  role?: "USER" | "ADMIN"
}


type csvElement = {
  "First Name": string
  "Last Name": string
  Email: string
  "Payment Status": string
  "Suffix": string
  Address1: string
  Address2: string
  City: string
  State: string
  Zip: string
  "Cell Phone": string
  "Work Phone": string
  Department: string
  Status: string
  "Member Type": string
  "Join Date": string
  "Payment Date": string
  Password: string
  Role: string
  'Member Number': number
}

interface EditFormValues {
  is_active?: string
  premium?: string
  suffix?: string
  address1?: string
  address2?: string
  city?: string
  state?: string
  zip?: string
  cell_phone?: string
  work_phone?: string
  department?: string
  otherDepartment?: string
  member_type?: string
  payment_date?: string
  join_date?: string
}


interface OtherUserInfo extends EditFormValues {
  createdAt?: string
}