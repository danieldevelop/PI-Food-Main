const recetaRouter = require('express').Router();
const { 
    getRecetaById, 
    getRecetaByName, 
    setRecetaDatabase 
} = require('../controllers/recipeController');


// GET | /recipes/:idRecipe
recetaRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (id) {
        const receta = await getRecetaById(id);

        (receta == undefined) 
            ? res.status(404).json({ error: "no se encontro la receta" })
            : res.status(200).json(receta);
    }
});


// GET | /recipes/name?="..."
recetaRouter.get('/', async (req, res) => {
    const { name } = req.query;

    if (name) {
        const receta = await getRecetaByName(name);
        console.log(receta.length);

        //!NOTA: EL ORDEN DE LA COSAS IMPORTANTE
        (receta.length > 0) 
            ? res.status(200).json(receta)
            : res.status(404).json({ message: `no se encontro la receta: ${name}`})
    }
});


// POST | /recipes (lo que recibo para guardarlos en la database)
recetaRouter.post('/', async (req, res) => {
    const { name, image, summary, healthscore, steps } = req.body;

    try {
        // !error en el if
        // if (!name || !image || !summary || !healthscore || !steps) throw Error('Me falta información');
        // else {
            const newRecipe = await setRecetaDatabase(name, image, summary, healthscore, steps);
            return res.status(200).json(newRecipe);
        // }

    } catch (err) {
        res.status(404).json(err)
    }
});



module.exports = recetaRouter;