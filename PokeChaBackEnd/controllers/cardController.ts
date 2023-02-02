let Card = require('../models/cardModel')
const mongoose = require('mongoose')

// GET ALL CARDS IN COLLECTION
const getCards = async (req: { user: { id: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any } } }) => {
    const user_id = req.user.id
    const cards = await Card.find({user_id}).sort({createdAt: -1})
  
    res.status(200).json(cards)
  }

// ADD NEW CARD TO COLLECTION

const postCard = async (req: { body: { id: any; name: any; type1: any; type2: any; weight: any; height: any; image: any }; user: { id: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { err: any }): void; new(): any } } }) => {
    const {id, name, type1, type2, weight, height, image} = req.body
    try {
        const user_id = req.user.id
        const favorite = false
        const card = await Card.create({id, name, type1, type2, weight, height, image, user_id, favorite})
        res.status(200).json(card)
    } catch (err) {
        res.status(400).json({err: 'Error'})
    }
}

// DELETE A CARD
const deleteCard = async (req: { params: { id: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string }): void; new(): any } } }) => {
    
    
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
const favoriteCard = async (req: { params: { id: any }; body: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string }): void; new(): any } } }) => {
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