import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
//jwt token generation method
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
          userId: this._id,
          username: this.username,
          email: this.email,
          isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }

      );
    } catch (err) {
        throw new Error("Error generating token");
    }
}
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
} 

const User = mongoose.model("Users", userSchema);

export default User;