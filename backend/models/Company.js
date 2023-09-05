import mongoose from "mongoose";
const { Schema } = mongoose;

const companySchema = new Schema({
    _id: Schema.Types.ObjectId,
    rut: { type: String, unique:true, default: '76.765.735-8' },
    razonSocial: { type: String, default: "Consultoria y Gestión Tecnologica Diego Osvaldo Manquez Villalobos E.I.R.L" },
    nombre: { type: String, default: "CGTEC" },
    detalle: { type: String, default: "VENTA DE EQUIPOS Y SERVICIOS DE SOPORTES INFORMÁTICOS Y RED" },
    giro: { type: String, default: "VENTA DE EQUIPOS Y SERVICIOS DE SOPORTES INFORMÁTICOS Y RED" },
    actEco: { type: Number, default: 4720 },
    email: {type: String},
    comuna: { type: String, default: "Illapel" },
    ciudad: {type: String, default: "Illapel"},
    direccion: { type: String, default: "Independencia 481" },
    telefono: { type: String, default: '+56953264720' },
    datos: {
        workers: { type: Number, default: 0 },
        clients: [{
            nombre: { type: String, default: "CGTEC" },
            rut: { type: String, default: "76.765.735-8" },
            email: { type: String, default: ""},
            telefono: { type: String, default: "+56953264720" },
        }],
        suppliers: [{
            nombre: { type: String, default: "CGTEC" },
            rut: { type: String, default: "76.765.735-8" },
            email: { type: String, default: ""},
            telefono: { type: String, default: "+56953264720" },
            direccion: { type: String, default: "Independencia 481" },
            ciudad: { type: String, default: "Illapel" },
            comuna: { type: String, default: "Illapel" },
        }],
        //Telefono, tablet, portatil, note
        productTypes: [{
            name: { type: String, default: "consolas" },
        }],
        priority: [{
            name: { type: String, default: "price" },
            rating: { type: Number, default: 0 },
        }],
        tags: [{
            name: { type: String, default: "tecnologia" },
        }]
    }
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);
export default Company;