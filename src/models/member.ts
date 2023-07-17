import mongoose, { FilterQuery, Model, ProjectionType, Query, QueryOptions } from "mongoose"

enum IsActive {
  "active" = "active",
  "inactive" = "inactive",
  "retired" = "retired",
}

enum memberRoles {
  "ADMIN" = "ADMIN",
  "USER" = "USER",
}

interface UserModel extends Model<Document> {
  findOne(
    filter?: FilterQuery<User>,
    projection?: ProjectionType<User> | null,
    options?: QueryOptions,
  ): Query<User | null, User>
}

const otherUserInfoSchema = new mongoose.Schema<OtherUserInfo>({
  address: String,
  city: String,
  state: String,
  zip: String,
  home_phone: String,
  work_phone: String,
  department: String,
  is_active: {
    type: String,
    enum: IsActive
  },
  group_email: String,
  member_role: String,
  member_type: String,
  year: String,
})

const memberSchema = new mongoose.Schema<User>({
  firstName: {
    type: String,
    required: [true, "Please provide your First Name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your Last Name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
  },
  role: {
    type: String,
    required: [true, "Please define your role"],
    enum: memberRoles,
  },
  other: otherUserInfoSchema
})

const Members = mongoose.models.Members ? mongoose.models.Members : mongoose.model<Admin | User | UserModel>("Members", memberSchema)

export default Members
