interface Person {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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

enum IsActive {
  "active"="active",
  "inactive"="inactive",
  "retired"="retired"
}

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