import axios from "axios";

export const getUserRegisters = async (req, res) => {
    try {
        console.log("entra a la funcion de recomendacion")
        const {idUsuario} = req.params;
        let url = process.env.LOCAL_PYTHON_URL + '/users/' + `${idUsuario}`;
        //Set fetch call
        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        console.log("error", error)
        res.status(500).json({error: error.message});
    }
}