module.exports = function(sequelize, DataTypes) { 
 city = sequelize.define(
 'city' 
,{ 
 
 id: {type: DataTypes.INTEGER, allowNull:false, autoIncrement:true, primaryKey: true} ,
   name: {type:  DataTypes.STRING, allowNull:true },
 country_id: {type: DataTypes.INTEGER, allowNull:false }, 
}, 
{ tableName: 'city',timestamps: false, 

 associate: function(models){
 city.hasOne(models.country); 
 city.hasMany(models.user_address); }} )
 return city 
}