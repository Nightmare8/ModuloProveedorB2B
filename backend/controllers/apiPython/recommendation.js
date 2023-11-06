import mongoose from "mongoose";
import axios from "axios";



export const getRecommendation = async (req, res) => {
    try {
        console.log("entro a la funcion de recomendacion")
        const {cantidad, categoria} = req.params;
        let url = process.env.LOCAL_PYTHON_URL + `${cantidad}/${categoria}`;
        //Set fetch call
        const response = await axios.get(url);
        const data = response.data;
        console.log("data", data)
        for (let i = 0; i < data.productos.length; i++) {
            let element = data['productos'][i];
            let responseINFO =  await axios.get(process.env.LOCAL_PYTHON_URL + `product/${element.idProducto}`)
            responseINFO = JSON.parse(responseINFO.data);
            element['info'] = responseINFO;
        }
        console.log("data", data)
        res.status(200).json(data);
    } catch (error) {
        console.log("error", error)
        res.status(500).json({error: error.message});
    }
}

export const getProductInfo = async (req, res) => {
    try {
        const { id } = req.body;
        let url = process.env.LOCAL_PYTHON_URL + `product/${id}`;
        //Set fetch call
        const response = await axios.get(url);
        //Transform the data to json object
        const data = JSON.parse(response.data);
        
        res.status(200).json(data);
    } catch (error) {
        console.log("error", error)
        res.status(500).json({error: error.message});
    }
}
