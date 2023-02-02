let express = require('express')

let {getCards, postCard, deleteCard, favoriteCard } = require('../controllers/cardController')
let requireAuth = require('../middleware/requireAuth')
let limiter = require('../middleware/rateLimiter')

let router = express.Router()

// IN PLACE TO REQUIRE AUTH FOR ALL ROUTES
router.use(requireAuth)

// GET ALL CARDS IN COLLECTION
router.get('/', getCards)

router.post('/', limiter, postCard)

router.delete('/:id', deleteCard)

router.patch('/:id', favoriteCard)

module.exports = router

export {}