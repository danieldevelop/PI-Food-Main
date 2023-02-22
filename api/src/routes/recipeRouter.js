const recetaRouter = require('express').Router();
const { getRecetaById } = require('../controllers/recipeController');


// GET | /recipes/:idRecipe
recetaRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (id) {
        const receta = await getRecetaById(id);

        (receta == undefined) 
            ? res.status(404).json({ error: "no se encontro la receta" })
            : res.status(200).json(receta);
    }
})


module.exports = recetaRouter;