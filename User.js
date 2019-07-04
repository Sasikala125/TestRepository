// Tested files tested files//

const bcryptService = require('../services/bcrypt.service');

const tableName = 'users';
const hooks = {
    beforeCreate(user) {
      user.password = bcryptService().password(user); // eslint-disable-line no-param-reassign
    },
  }

module.exports = (sequelize, { STRING, INTEGER, BOOLEAN }) => {
    const User = sequelize.define('User', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: STRING,
        },
        password:{
            type: STRING,
        },
        customer: {
            type: BOOLEAN,
        },
        agent: {
            type: BOOLEAN,
        },
        escrow: {
            type: BOOLEAN,
        },
        admin: {
            type: BOOLEAN,
        },
    }, { hooks,tableName });

    User.prototype.toJSON = function () {
        const values = Object.assign({}, this.get());

        delete values.password;

        return values;
      };

    return User
};