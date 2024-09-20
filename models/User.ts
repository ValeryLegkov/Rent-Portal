import { Schema, Types, model } from "mongoose";

export interface UserType {
  _id?: Types.ObjectId;
  email: string;
  username: string;
  image?: string;
  bookmarks?: Types.ObjectId[];
  createdAt?: string;
  updatedAt?: string;
}

// interface UserModel extends Model, UserType {}

const UserSchema = new Schema<UserType>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    username: { type: String, required: [true, "Username is required"] },
    image: String,
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Property" }],
  },
  { timestamps: true }
);

const UserModel = model<UserType>("User", UserSchema, "users", {
  overwriteModels: true,
});

export default UserModel;
