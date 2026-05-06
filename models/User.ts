import { HydratedDocument, Model, Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "@/types";


interface UserMethods {
  comparePassword(password: string): Promise<boolean>;
}

type UserModel = Model<IUser, {}, UserMethods>;
export type UserDocument = HydratedDocument<IUser, UserMethods>;

const UserSchema = new Schema<IUser, UserModel, UserMethods>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    googleId:{type:String, required:false},
    image:{type:String, required:false},
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});


UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const User =
  (models.User as UserModel | undefined) || model<IUser, UserModel>("User", UserSchema);
