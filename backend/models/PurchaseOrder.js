import mongoose from "mongoose";
const { Schema } = mongoose;

const purchaseOrderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    numeroOrden: {type:String, required:true},
    productos: [{
        codigo: { type: String }, //Codigo en el sistema, no igual al sku, definido por la empresa
        sku: { type: String, required: true, unique: true }, //Codigo de barras, dado por el proveedor
        nombre: { type: String, required: true }, //Segundo escalon
        lote: { type: String },
        categoria: { type: String}, //Primer Escalon
        subCategoria: { type: String }, //Sub categorias estandarizadas en el draw.io
        marca: { type: String }, //Segundo Escalon
        modelo: { type: String },
        cantidad: { type: Number, required: true },
        precioUnitario: { type: Number, required: true },
    }],
    total: { type: Number, required: true },
    cantidadProductos: { type: Number, required: true },
    metodoPago: {type:String, required:true},
    estadoPago: {type:String, required:true}, //Pagado, No Pagado, En espera
    //Envio
    estadoEnvio: {type:String, required:true}, //Enviado, No Enviado, En espera
    costoEnvio: {type:Number, required:true}, //Costo de envio
    dirEnvio: {type:String, required:true}, //Direccion de envio
    otrosDetalles: {type:String},
    //Fecha
    fechaOrden: { type: Date, required: true, default: Date.now() },
    fechaEntrega: { type: Date, required: true },
    //Datos de la compañia
    companyBuyer: {type: mongoose.Schema.Types.ObjectId, ref:'CompanyBuyer'}, //Rut a la compañia
    companySeller: {type: mongoose.Schema.Types.ObjectId, ref: 'CompanySeller'}, //Rut a la compañia
}, { timestamps: true });

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);
export default PurchaseOrder;