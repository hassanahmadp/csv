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
    member_number: {
      type: Number,
      required: true
    },
    firstName: {
      type: String,
      required: [true, "Please provide your First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide your Last Name"],
    },
    suffix: String,
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(memberRoles),
    },
    address1: String,
    address2: String,
    city: String,
    state: String,
    zip: String,
    cell_phone: String,
    work_phone: String,
    department: String,
    otherDepartment: String,
    is_active: {
      type: String,
      enum: Object.values(IsActive),
    },
    member_type: String,
    premium: {
      type: String,
      required: [true, "Please confirm if the User is a Premium member or not."],
    },
    join_date: String,
    payment_date: String,
  },
  { timestamps: true },
)

// let Members;

// if(mongoose.models.Members) Members = mongoose.models.Members

const Members = mongoose.models.members || mongoose.model("members", MemberSchema)

export default Members
