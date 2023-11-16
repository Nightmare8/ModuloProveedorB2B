import mongoose from "mongoose";
const {Schema} = mongoose;

const productSchema = new Schema({
    _id: Schema.Types.ObjectId,
    idProducto: {type: String, required: true},//Codigo en el sistema, no igual al sku, definido por la empresa
    titulo: {type: String, required: true}, //Segundo escalon
    categoria: {type: String, required:true}, //Primer Escalon
    descripcion: {type: String},
    precio: {type: Number, required:true},
    cantidad: {type: Number, required:true},
    tags: {type: String},
    imagen: {type: String},
    link: {type: String},
    region: {type: String},
    ciudad: {type: String},
    cantidadReviews: {type: Number},
    unaEstrella: {type: Number},
    dosEstrellas: {type: Number},
    tresEstrellas: {type: Number},
    cuatroEstrellas: {type: Number},
    cincoEstrellas: {type: Number},
    reviewPromedio: {type: Number},
    opiniones: {type: String},
    likes: {type: Number},
    dislikes: {type: Number},
    atributos: [{
        nombre: {type: String},
        valor: {type: String},
    }],
    //Atributos de tiempo, para registros
    fechaCreacion: {type: Date, default: Date.now},
    fechaModificacion: {type: Date, default: Date.now},
    //La compañia dueña del producto, puede ser 
    companyOwner: {type:mongoose.Schema.Types.ObjectId, ref:'CompanyOwner'}, 
    supplier: {type:mongoose.Schema.Types.ObjectId, ref:'Supplier'},
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);
export default Product;