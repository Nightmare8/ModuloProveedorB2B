import axios from "axios";
import { token } from "../../token.js";

export const getItems = async (req, res) => {
    try {
        const { id, limit, offset } = req.body;
        let url = `https://api.mercadolibre.com//sites/MLC/search?category=${id}&limit=${limit}&offset=${offset}`;
        //Set fetch call
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        });
        console.log("response", response.data);
        res.status(200).json(response.data);

    } catch (error) {
        console.log("error", error)
        res.status(500).json({error: error.message});
    }
}