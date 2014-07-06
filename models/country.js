module.exports = function(sequelize, DataTypes) { 
 country = sequelize.define(
 'country' 
,{ 
 
 id: {type: DataTypes.INTEGER, allowNull:false, autoIncrement:true, primaryKey: true} ,
   name: {type:  DataTypes.STRING, allowNull:true }, 
}, 
{ tableName: 'country',timestamps: false, 

 associate: function(models){
 country.hasMany(models.city); }} )
 return country 
}