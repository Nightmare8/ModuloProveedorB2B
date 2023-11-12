import mongoose from "mongoose";
import axios from "axios";



export const getRecommendation = async (req, res) => {
    try {
        console.log("entro a la funcion de recomendacion")
        const {categoria, cantidad, palabrasClaves, stemming, n_components} = req.body;
        console.log("req.body", req.body)
        let url = process.env.LOCAL_PYTHON_URL;
        //Set fetch call
        //Set the timeout to 10 minutes
        const response = await axios.post(url + 'recommendations', 
        {
            categoria,
            cantidad,
            keyWords: palabrasClaves,
            stemming,
            n_components
        });
        const data = response.data;
        for (let i = 0; i < data.productos.length; i++) {
            let element = data['productos'][i];
            console.log(element)
            let responseINFO =  await axios.get(process.env.LOCAL_PYTHON_URL + `product/${element.idProducto}` + `/${element.categoria}`)
            responseINFO = JSON.parse(responseINFO.data);
            element['info'] = responseINFO;
        }
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
