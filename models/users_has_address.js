module.exports = function(sequelize, DataTypes) { 
 users_has_address = sequelize.define(
 'users_has_address' 
,{ 
 
 id: {type: DataTypes.INTEGER, allowNull:false, autoIncrement:true, primaryKey: true} ,
 user_address_id: {type: DataTypes.INTEGER, allowNull:false },
 users_id: {type: DataTypes.INTEGER, allowNull:false }, 
}, 
{ tableName: 'users_has_address',timestamps: false, 

 associate: function(models){
 users_has_address.hasOne(models.users); 
 users_has_address.hasOne(models.user_address); }} )
 return users_has_address 
}