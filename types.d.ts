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
}

const IsActive = {
  "active":"active",
  "inactive":"inactive",
  "retired":"retired"
} as const

interface OtherUserInfo {
  address?: string
  city?: string
  state?: string
  zip?: string
  home_phone?: string
  work_phone?: string
  department?: string
  is_active?: "active" | 'deceased' | 'retired' 
  group_email?: string
  member_role?: string
  member_type?: string
  premium?: string
  year?: string
}

interface Token {
  id: string | number | undefined,
  name: string
  email: string
  role: "USER" | "ADMIN"
}

