
const sequelize = require("sequelize");
const { seq } = require("../config/db");


const recipie = seq.define("recipies",{
    recipi_id:{
          type: sequelize.INTEGER,
          allowNull: false,
        },
    image:{
          type: sequelize.STRING,
          allowNull: false,
        },
    imageType:{
          type: sequelize.STRING,
          allowNull: false,
        },
    title:{
          type: sequelize.STRING,
          allowNull: false,
        },

     user_id:{
          type: sequelize.INTEGER,
          allowNull: false,
        },
  })


  module.exports={recipie}

