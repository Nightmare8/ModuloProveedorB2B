import axios from "axios";
import { token } from "../../token.js";

export const getReviews = async (req, res) => {
    try {
        console.log("req.body", req.body)
        const { id, limit, offset } = req.body;
        let url = `https://api.mercadolibre.com/reviews/item/${id}`;
        //Set fetch call
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        });
        console.log("response", response.data)
        res.status(200).json(response.data);

    } catch (error) {
        console.log("error", error)
        res.status(500).json({error: error.message});
    }
}