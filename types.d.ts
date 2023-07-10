interface Person {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface Admin extends Person {
  role: 'ADMIN';
}

interface User extends Person {
  role: 'USER';
  other: OtherUserInfo
}

interface OtherUserInfo {
  address?: string
  city?: string
  state?: string
  zip?: string
  home_phone?: string
  work_phone?: string
  department?: string
  is_active?: "active" | "inactive" | "retired"
  group_email?: string
  member_role?: string
  member_type?: string
  year?: string
}