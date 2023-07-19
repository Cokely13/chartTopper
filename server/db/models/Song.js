const Sequelize = require('sequelize')
const db = require('../db')


const Song = db.define('Song', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    artist: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    plays: {
      type: Sequelize.INTEGER,
    }

  });


module.exports = Song
