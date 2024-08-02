import { genSalt , hash} from "bcrypt";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is Required."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required."],
    },
    firstName: {
        type: String,
        // required: [true, "First Name is Required."],
    },
    lastName: {
        type: String,
        // required: [true, "Last Name is Required."],
    },
    image:{
        type:String,
        required: false,

    },
    color: {
        type: Number,
        required: false,
    },
    profileSetup:{
        type: Boolean,
        default: false,
    },
})

userSchema.pre("save", async function(next){
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
    next();
})

const User = mongoose.model("Users", userSchema);

export default User;