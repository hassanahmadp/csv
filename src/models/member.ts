import mongoose from "mongoose"

const IsActive = {
  active: "active",
  inactive: "inactive",
  retired: "retired",
} as const

enum memberRoles {
  ADMIN = "ADMIN",
  USER = "USER",
}

// interface UserModel extends Model<Document> {
//   findOne(
//     filter?: FilterQuery<User>,
//     projection?: ProjectionType<User> | null,
//     options?: QueryOptions,
//   ): Query<User | null, User>
// }

const MemberSchema = new mongoose.Schema<User>(
  {
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
      enum: Object.values(memberRoles),
    },
    address: String,
    city: String,
    state: String,
    zip: String,
    home_phone: String,
    work_phone: String,
    department: String,
    is_active: {
      type: String,
      enum: Object.values(IsActive),
    },
    group_email: String,
    member_role: String,
    member_type: String,
    premium: {
      type: String,
      required: [true, "Please confirm if the User is a Premium member or not."],
    },
    year: String,
  },
  { timestamps: true },
)

// let Members;

// if(mongoose.models.Members) Members = mongoose.models.Members

const Members = mongoose.models.members || mongoose.model("members", MemberSchema)

export default Members
