const Card = require('../models/cardModel')
const mongoose = require('mongoose')

// GET ALL CARDS IN COLLECTION
const getCards = async (req, res) => {
    const user_id = req.user.id
    const cards = await Card.find({user_id}).sort({createdAt: -1})
  
    res.status(200).json(cards)
  }

// ADD NEW CARD TO COLLECTION

const postCard = async (req, res) => {
    const {id, name, type1, type2, weight, height, image} = req.body
    try {
        const user_id = req.user.id
        const favorite = false
        const card = await Card.create({id, name, type1, type2, weight, height, image, user_id, favorite})
        res.status(200).json(card)
    } catch (err) {
        res.status(400).json({err: err.message})
    }
}

// DELETE A CARD
const deleteCard = async (req, res) => {
    
    
    const { id }  = req.params

     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Hit here'})
     }

    const card = await Card.findOneAndDelete({_id: id})

    if (!card) {
        return res.status(400).json({error: 'No such card exists'})
    }

    res.status(200).json(card)
}

// UPDATE CARD FAVORITE
const favoriteCard = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Hit here'})
     }

     const card = await Card.findByIdAndUpdate({_id: id}, {
        ...req.body
     })

     if (!card) {
        return res.status(400).json({error: 'No such card exists'})
     }
    
     res.status(200).json(card)
}


module.exports = {getCards, postCard, deleteCard, favoriteCard}