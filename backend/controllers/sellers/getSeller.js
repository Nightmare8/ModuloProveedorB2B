import axios from "axios";
import { token } from "../../token.js";

export const getSeller = async (req, res) => {
    try {
        const { id } = req.body;
        let url = `https://api.mercadolibre.com//sites/MLC/search?seller_id=${id}`;
        //Set fetch call
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        });
        res.status(200).json(response.data);

    } catch (error) {
        console.log("error", error)
        res.status(500).json({error: error.message});
    }
}

