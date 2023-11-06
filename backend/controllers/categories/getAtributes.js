import axios from "axios";
import { token } from "../../token.js";

export const getAtributes = async (req, res) => {
    try {
        const { id } = req.body;
        let url = `https://api.mercadolibre.com/categories/${id}/attributes`;
        //Set fetch call
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        });
        console.log("response", response.data);
        res.status(200).json(response.data);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}