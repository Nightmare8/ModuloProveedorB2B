import mongoose from "mongoose";
const {Schema} = mongoose;

const supplierSchema = new Schema({
    _id: Schema.Types.ObjectId,
    idVendedor: {type:String, required: true, unique: true},
    nombre: {type:String, required: true},
    rut: {type:String},
    email: {type: String},
    telefono: {type:String},
    tags: {type: String},
    region: {type: String},
    ciudad: {type: String},
    reputacion: {type: Number},
    reputacionEstrellas: {type: Number},
    reviewPromedio: {type: Number},
    completadas: {type: Number},
    canceladas: {type: Number},
    total: {type: Number},
    ratingPositivo: {type: Number},
    ratingNegativo: {type: Number},
    ratingNeutral: {type: Number},
    ventas: {type: Number},
    reclamos: {type: Number},
    entregasRetrasadas: {type: Number},
    cancelaciones: {type: Number},
}, {timestamps: true});

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;