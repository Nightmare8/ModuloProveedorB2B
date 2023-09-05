import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    company: {type:String}, //Rut a la compañia
    companyName: {type:String}, //Nombre de la compañia
    type: {type:Number}, //Tipo de usuario, pyme 1, supplier 2, admin 0
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;