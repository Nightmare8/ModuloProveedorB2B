import axios from 'axios';
//Import token
import {token, updateToken} from '../../token.js';
//Get token
export const getToken = async (req, res) => {
    try {
        const {
            code,
        } = req.body;
        grant_type = "authorization_code";
        //Code of mercado libre api
        const url = `https://api.mercadolibre.com/oauth/token?grant_type=${grant_type}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.REDIRECT_URI}`;
        const response = await axios.post(url);
        const { access_token, refresh_token } = response.data;
        console.log("response", response.data);
        const newToken ={
            "access_token": access_token,
            "token_type": "Bearer",
            "expires_in": 21600,
            "scope": "offline_access read write",
            "user_id": 301756680,
            "refresh_token": refresh_token
        }
        updateToken(newToken);
        res.status(200).json({ access_token, refresh_token });
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export const refreshToken = async (req, res) => {
    try {
        const old_refresh_token = token.refresh_token;
        //Code of mercado libre api
        const url = `https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&refresh_token=${old_refresh_token}`;
        const response = await axios.post(url);
        const { access_token, refresh_token } = response.data;
        const newToken = {
            "access_token": access_token,
            "token_type": "Bearer",
            "expires_in": 21600,
            "scope": "offline_access read write",
            "user_id": 301756680,
            "refresh_token": refresh_token
        }
        updateToken(newToken);
        res.status(200).json({ access_token, refresh_token });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}