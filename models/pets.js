module.exports = (sequelize, dataType) => {
    return sequelize.define('Pets', {
        name: dataType.STRING,
        petType: dataType.STRING,
        lastFed: dataType.STRING
    })
}