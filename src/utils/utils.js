const cardsFromServerReprocessor = (card, user) => {
    return {
        imgLink: card.link,
        name: card.name,
        likes: card.likes,
        likesNumber: Object.keys(card.likes).length,
        isLiked: card.likes.some(i => i._id === user._id),
        cardOwnerId: card.owner._id,
        cardId: card._id
    }
}

export {cardsFromServerReprocessor}