const dietRouter = require('express').Router();
const {
    getDiets
} = require('../controllers/dietController');

// GET | /diets
dietRouter.get("/", async (req, res) => {

});


module.exports = dietRouter;