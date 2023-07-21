interface Person {
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

interface User extends Person {
  role: 'USER';
  other?: OtherUserInfo
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
  is_active?: IsActive
  group_email?: string
  member_role?: string
  member_type?: string
  year?: string
}