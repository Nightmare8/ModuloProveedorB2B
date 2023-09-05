import mongoose from "mongoose";
const {Schema} = mongoose;

const supplierSchema = new Schema({
    _id: Schema.Types.ObjectId,
    nombre: {type:String, required: true},
    rut: {type:String, unique: true, required:true},
    email: {type: String},
    telefono: {type:String},
    direccion: {type:String, required: true},
    ciudad: {type: String},
    comuna: {type: String}
}, {timestamps: true});

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;