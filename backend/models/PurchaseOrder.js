import mongoose from "mongoose";
const { Schema } = mongoose;

const purchaseOrderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    numeroOrden: {type:String, required:true},
    fecha: { type: Date, required: true },
    productos: [{
        nombre: { type: String, required: true }, //Segundo escalon
        categoria: { type: String}, //Primer Escalon
        subCategoria: { type: String }, //Sub categorias estandarizadas en el draw.io
        cantidad: { type: Number, required: true },
        precioUnitario: { type: Number, required: true },
    }],
    total: { type: Number, required: true },
    metodoPago: {type:String, required:true},
    estadoPago: {type:String, required:true}, //Pagado, No Pagado, En espera
    estadoEnvio: {type:String, required:true}, //Enviado, No Enviado, En espera
    dirEnvio: {type:String, required:true}, //Direccion de envio
    otrosDetalles: {type:String},
    companyBuyer: {type: mongoose.Schema.Types.ObjectId, ref:'CompanyBuyer'}, //Rut a la compañia
    companySeller: {type: mongoose.Schema.Types.ObjectId, ref: 'CompanySeller'}, //Rut a la compañia
}, { timestamps: true });

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);
export default PurchaseOrder;