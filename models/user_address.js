module.exports = function(sequelize, DataTypes) { 
 user_address = sequelize.define(
 'user_address' 
,{ 
 
 id: {type: DataTypes.INTEGER, allowNull:false, autoIncrement:true, primaryKey: true} ,
   address: {type:  DataTypes.STRING, allowNull:true },
 city_id: {type: DataTypes.INTEGER, allowNull:false },
 coordinate_id: {type: DataTypes.INTEGER, allowNull:false }, 
}, 
{ tableName: 'user_address',timestamps: false, 

 associate: function(models){
 user_address.hasMany(models.service); 
 user_address.hasOne(models.city); 
 user_address.hasOne(models.coordinate); 
 user_address.hasMany(models.users_has_address); }} )
 return user_address 
}