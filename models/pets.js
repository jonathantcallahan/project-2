module.exports = (sequelize, dataType) => {
    return sequelize.define('Pets', {
        lastFed: dataType.STRING
    })
}