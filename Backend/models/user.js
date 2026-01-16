import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
    if (!user.isModified("password")){
        next();
    } 

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
    }catch(err){
        next(err);
    }
});
const User = mongoose.model("Users", userSchema);

export default User;