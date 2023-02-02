const express = require('express')

const {getCards, postCard, deleteCard, favoriteCard } = require('../controllers/cardController')
const requireAuth = require('../middleware/requireAuth')
const limiter = require('../middleware/rateLimiter')

const router = express.Router()

// IN PLACE TO REQUIRE AUTH FOR ALL ROUTES
router.use(requireAuth)

// GET ALL CARDS IN COLLECTION
router.get('/', getCards)

router.post('/', limiter, postCard)

router.delete('/:id', deleteCard)

router.patch('/:id', favoriteCard)

module.exports = router