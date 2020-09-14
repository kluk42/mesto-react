class Api {
    constructor({ baseUrl, token, renderLoading}) {
        this._baseUrl = baseUrl;
        this._token = token;
        this._renderLoading = renderLoading;
    }

    getInitialCards () {
        return fetch(`${this._baseUrl}cards`, {
            headers: {
                authorization: this._token,
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {return Promise.reject(`Ошибка: ${res.status}`)}
        })
        .then(cards => {
            return cards
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
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    sendUserInfo(data) {
        this._renderLoading(true);
        this._nameKey = 'name-input';
        this._descriptionInput = 'description-input'
        return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
        },
            body: JSON.stringify({
            name: data[this._nameKey],
            about: data[this._descriptionInput]
  })
})
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
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
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
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
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
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
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    uploadCard (card) {
        this._renderLoading(true);
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
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    uploadAvatar (avatarLink) {
        this._renderLoading(true);
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
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

const renderLoading = loading => {
    const activePopup = document.querySelector('.popup-opener');
    const button = activePopup.querySelector('.submit-button');

    button.textContent = loading ? 'Сохранение...' : 'Сохранить';
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/',
    token: '614c831a-d135-4d7c-82ff-12ed74000dec',
    renderLoading: renderLoading
})

export default api;