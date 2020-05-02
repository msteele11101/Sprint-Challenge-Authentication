const db = require("../database//dbConfig.js");

module.exports = {
    add,
    findBy

    };


    function findBy(filter) {
    return db("users")
        .select("id", "username", "password") // make sure to return the password
        .where(filter);
    }

    function add(user) {
    return db("users").insert(user)
        .then(ids => {
        return db('users').where({id: ids[0]}).first()
        });
    }