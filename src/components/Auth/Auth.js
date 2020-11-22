export const baseUrl = 'https://auth.nomoreparties.co';

export const register = async ({ email, password }) => {
    try {
        const response = await fetch(`${baseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
        return response
    }
    catch (err) {
        console.log(err)
    }
};

export const authorize = async ({ email, password }) => {
    try {
        const response = await fetch(`${baseUrl}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        })
        return response
    }
    catch (err) {
        console.log(err);
    }
};

export const authorization = async (token) => {
    try {
        const response = await fetch(`${baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        return response
    } 
    catch (err) {
        console.log(err);
    }
};