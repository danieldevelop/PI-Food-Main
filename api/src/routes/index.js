const { Router } = require('express');
// const morgan = require('morgan');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { recipeController} = require('../controllers/recipeController');
const { dietController } = require('../controllers/dietController')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipeController);
router.use('/diets', dietController);


module.exports = router;
