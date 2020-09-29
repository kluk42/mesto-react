class Api {
    constructor({ baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    _resultsProcessing (res) {
        if (res.ok) {
            return res.json()
        } else {return Promise.reject(`Ошибка: ${res.status}`)}
    }

    getInitialCards () {
        return fetch(`${this._baseUrl}cards`, {
            headers: {
                authorization: this._token,
                'content-type': 'application/json'
            }
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getUserInfo () {
        return fetch(`${this._baseUrl}users/me`, {
            headers: {
                authorization: this._token,
                'content-type': 'application/json'
            }
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    sendUserInfo(data) {
        return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
        },
            body: JSON.stringify({
            name: data.newName,
            about: data.about
  })
})
        .then(res => {
            return this._resultsProcessing(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getCardId(card) {
        this._cardId = card._id;
    }

    deleteCard (id) {
        return fetch(`${this._baseUrl}cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'content-type': 'application/json'
            },
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    likeCard (id) {
        return fetch(`${this._baseUrl}cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    dislikeCard (id) {
        return fetch(`${this._baseUrl}cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    uploadCard (card) {
        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    uploadAvatar (avatarLink) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/',
    token: '614c831a-d135-4d7c-82ff-12ed74000dec',
})

export default api;