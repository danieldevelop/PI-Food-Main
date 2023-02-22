const axios = require('axios');
const { Recipe } = require('../db');

require('dotenv').config();

const getRecetaById = async (id) => {
    let recetaDetail = {};

    try {
        const recetas = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`);
        const recetaId = recetas.data.id;
        // const recetas = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5');
        // const recetaId = recetas.data.results.id;

        // ESTA FORMA ES LA API
        recetaDetail = {
            id: recetas.data.id,
            title: recetas.data.title,
            name: recetas.data.name,
            image: recetas.data.image,
            summary: recetas.data.summary,
            healthScore: recetas.data.healthScore,
            steps: recetas.data.analyzedInstructions.map(step => step.steps.map(step => {
                return ({
                    number: step.number,
                    step: step.step
                });
            }
            ))
        }

        // ESTA FORMA ES EL MOCKY
        // recetaDetail = recetas.data.results.map(receta => {
        //     return ({
        //         id: receta.id,
        //         title: receta.title, 
        //         name: receta.name,
        //         image: receta.image,
        //         summary: receta.summary,
        //         healthScore: receta.healthScore,
        //         steps: receta.analyzedInstructions.map(step => step.steps.map(step => {
        //             return ({
        //                 number: step.number,
        //                 step: step.step
        //             });
        //         }))
        //     });
        // })

        return recetaDetail;
    } catch (err) {
        console.log(`${err}`);
    }
}



const getRecetaByName = async (name) => {
    const number = 100; // cantidad de registros a mostrar
    let recipes = [];

    try {
        let recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=${number}&apiKey=${process.env.API_KEY}`);
        recipes = recipe.data.results.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                summary: recipe.summary,
                healthScore: recipe.healthScore,
                diets: recipe.diets
            }
        })
        return recipes;
    } catch(err) {
        console.log(`${err}`);
    }
}

// POST
const setRecetaDatabase = async (title, image, summary, healthScore, steps) => {
    // Creating new recipe
    const [newRecipe, created] = await Recipe.findOrCreate({
        where: { title: title.toLowerCase() },
        defaults: {
            image,
            summary,
            healthScore,
            steps
        }
    })

}



module.exports = {
    getRecetaById,
    getRecetaByName,
    setRecetaDatabase
}