import mongoose from "mongoose";
const {Schema} = mongoose;

const productSchema = new Schema({
    _id: Schema.Types.ObjectId,
    codigo: {type: String},//Codigo en el sistema, no igual al sku, definido por la empresa
    nombre: {type: String, required: true}, //Segundo escalon
    sku: {type: String, required: true, unique: true}, //Codigo de barras, dado por el proveedor 
    lote: {type: String},
    categoria: {type: String, required:true}, //Primer Escalon
    subCategoria: {type: String}, //Sub categorias estandarizadas en el draw.io
    marca: {type: String, required:true}, //Segundo Escalon
    modelo: {type: String},
    detalle: {type: String}, // Tercer Escalon
    color: {type: String},
    //Seccion de precios
    //Monto Neto
    precio: {type: Number, required:true},
    estado: {type: String, required:true}, //Disponible, Vendido, En Oferta, Stock
    rating: {type: Number, default: 0},
    //La compañia dueña del producto, puede ser 
    companyOwner: {type:mongoose.Schema.Types.ObjectId, ref:'CompanyOwner'}, 
    supplier: {type:mongoose.Schema.Types.ObjectId, ref:'Supplier'},
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);
export default Product;