const axios = require('axios');
const { Recipe } = require('../db');

require('dotenv').config();

const getRecetaById = async (id) => {
    let recetaDetail = undefined;

    try {
        const recetas = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`);
        // const recetas = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5');

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
    const number = 2; // cantidad de registros a mostrar
    let recipes = [];

    try {
        let recipe = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=${number}&apiKey=${process.env.API_KEY}`);

        recipes = recipe.data.results.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image
            }
        });
        return recipes;

    } catch(err) {
        console.log(`${err}`);
    }
}



// POST database
const setRecetaDatabase = async (name, image, summary_dish, health_score, steps) => {
    // Creating new recipe
    // const [newRecipe, created] = await Recipe.findOrCreate({
    //     where: { title: title.toLowerCase() },
    //     defaults: {
    //         image,
    //         summary,
    //         healthScore,
    //         steps
    //     }
    // });
    const newRecipe = await Recipe.create({name, image, summary_dish, health_score, steps})

    // if (!created) throw new Error(`${title} allready exist`);

    return newRecipe;
}



module.exports = {
    getRecetaById,
    getRecetaByName,
    setRecetaDatabase
}