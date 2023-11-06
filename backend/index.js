import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import companyRoutes from "./routes/company.js";
import supplierRoutes from './routes/supplier.js'
import purchaseRoutes from "./routes/purchase.js";
import productRoutes from "./routes/product.js";
import mercadoLibreRoutes from "./routes/mercadoLibre.js";
import apiPythonRoutes from "./routes/apiPython.js";
//Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path: path.join(__dirname, '.env')});

const app = express();
//Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'
}));
app.use(morgan("common"));
app.use(bodyParser.json({
    limit: "30mb",
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: "30mb",
    extended: true
}));
app.use(cors());
//Se the directory of the images to store localy
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

//File Storage
const storage= multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({storage: storage});

//Routes with Files have to use the upload middleware
// app.post('/auth/register', register);

//Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/supplier', supplierRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/product', productRoutes);
app.use('/mercadolibre', mercadoLibreRoutes);
app.use('/apiPython', apiPythonRoutes);
//Configure the data base
const PORT =  process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}). then(() => {
    console.log("connected to mongodb", process.env.MONGO_URL)
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
}).catch((error) => {
    console.log("Problem connecting to mongodb")
    console.log(error.message)}
)
