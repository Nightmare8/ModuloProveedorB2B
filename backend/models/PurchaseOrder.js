import mongoose from "mongoose";
const { Schema } = mongoose;
//Solamente se guardara el registro como referencia, el que sera ocupado para el manejo del sistema de recomendacion, sera agregarlo en python
const purchaseOrderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    numeroOrden: {type:Number},
    productos: {
        idProducto: { type: String }, //Codigo en el sistema, no igual al sku, definido por la empresa
        titulo: { type: String, required: true }, //Segundo escalon
        categoria: { type: String}, //Primer Escalon
        descripcion: { type: String },
        precio: { type: Number, required: true },
        tags: {type: String},
        imagen: { type: String },
        link: { type: String },
        region: { type: String },
        ciudad: { type: String },
        cantidadReviews: { type: Number },
        unaEstrella: { type: Number },
        dosEstrellas: { type: Number },
        tresEstrellas: { type: Number },
        cuatroEstrellas: { type: Number },
        cincoEstrellas: { type: Number },
        reviewPromedio: { type: Number },
        opiniones: { type: String },
        likes: { type: Number },
        dislikes: { type: Number },
        idVendedor: { type: String },
        atributos: [{
            nombre: { type: String },
            valor: { type: String },
        }],
        //Cantidad que se compro
        cantidad: { type: Number, required: true },
    },
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
    fechaEntrega: { type: Date, required: true, default: Date.now() },
    //Datos de la compañia
    companyBuyer: {type: mongoose.Schema.Types.ObjectId, ref:'Company'}, //Object ID de la compañia
    companySeller: {type: mongoose.Schema.Types.ObjectId, ref: 'Supplier'}, //Object id al proveedor
}, { timestamps: true });



purchaseOrderSchema.pre('save', async function(next) {
    if (!this.numeroOrden) {
        const lastOrderNumber = await PurchaseOrder.findOne({companyBuyer: this.companyBuyer}).sort({ numeroOrden: -1 }).limit(1);
        if (lastOrderNumber) {
            const lastNumber = parseInt(lastOrderNumber.numeroOrden, 10);
            this.numeroOrden = (lastNumber + 1);
            next()
        } else{
            this.numeroOrden = 1
        }
    }
});

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

export default PurchaseOrder;