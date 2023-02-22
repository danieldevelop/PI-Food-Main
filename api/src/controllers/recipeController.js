const axios = require('axios');
const { Recipe } = require('../db');

require('dotenv').config();

// add despues param id
const getRecetaById = async () => {
    let recipeDetail = {};

    try {
        // let recipe = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`);
        let recipe = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5');

        recipeDetail = {
            id: recipe.data.id,
            title: recipe.data.title,
            image: recipe.data.image,
            summary: recipe.data.summary,
            healthScore: recipe.data.healthScore,
            // Ingredients: recipe.data.extendedIngredients.map(ingredient => {
            //     return { name: ingredient.name, amount: ingredient.amount, unit: ingredient.unit };
            // }),
            Steps: recipe.data.analyzedInstructions[0].steps.map(step => {
                return { number: step.number, step: step.step };
            })
        }
        return recipeDetail;

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