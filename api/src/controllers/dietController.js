const axios = require('axios');
const { Diet } = require('../db');

require('dotenv').config();

const getDiets = async () => {
    try {
        let diets = await Diet.findAll();
        return diets.map(diet => diet.dataValues);
    } catch (err) {
        console.log(`${err}`);
    }
}


module.exports = getDiets;