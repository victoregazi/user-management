const Sequelize = require("sequelize");
const db = require("../config/database.js");

const User = db.define("systemdata", {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    }, 
}, {
    tableName: "systemdata",
    freezeTableName: true,
    timestamps: false
});

User.sync().then(() => {
    console.log('table created');
});
module.exports = User;