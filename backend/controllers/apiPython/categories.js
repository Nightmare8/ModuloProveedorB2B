import axios from "axios";

export const getProducts = async (req, res) => {
    try {
        const {categorie} = req.params;
        const categorias = ['MLC9240', 'MLC5068', 'MLC1672', 'MLC48906']
        let respuesta = [];
        for (let i = 0; i < categorias.length; i++) {
            const url = process.env.LOCAL_PYTHON_URL + `categorie/${categorias[i]}`;
            //Set fetch call
            const response = await axios.get(url);
            //Transform the data to json object
            const data = JSON.parse(response.data);
            respuesta.push(data);
        }
        console.log("respuesta", respuesta)
        console.log("respuesta largo", respuesta.length)
        console.log("respuesta largo 0", respuesta[0].length)
        res.status(200).json(respuesta);
    } catch (error) {
        console.log("error", error)
        res.status(500).json({error: error.message});
    }
}

export const getProductsByCategory = async (req, res) => {
    try {
        const {categorie} = req.params;
        const url = process.env.LOCAL_PYTHON_URL + `categorie/${categorie}`;
        //Set fetch call
        const response = await axios.get(url);
        //Transform the data to json object
        const data = JSON.parse(response.data);
        console.log("data", data)
        res.status(200).json(data);
    } catch (error) {
        console.log("error", error)
        res.status(500).json({error: error.message});
    }
}