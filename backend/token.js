//Have to export token
export let token = {
    "access_token": "APP_USR-4980080115367661-110113-61ebd830b7947cd8e5b80c405f03a9e4-301756680",
    "token_type": "Bearer",
    "expires_in": 21600,
    "scope": "offline_access read write",
    "user_id": 301756680,
    "refresh_token": "TG-65428ef9ceed010001bc3a7b-301756680"
}

export const updateToken = (newToken) => {
    //Have to update the token
    token.access_token = newToken.access_token;
    token.refresh_token = newToken.refresh_token;
}