module.exports = function(sequelize, DataTypes) { 
 users_has_credentials = sequelize.define(
 'users_has_credentials' 
,{ 
 
 id: {type: DataTypes.INTEGER, allowNull:false, autoIncrement:true, primaryKey: true} ,
 users_id: {type: DataTypes.INTEGER, allowNull:false },
 credentials_id: {type: DataTypes.INTEGER, allowNull:false }, 
}, 
{ tableName: 'users_has_credentials',timestamps: false, 

 associate: function(models){
 users_has_credentials.hasOne(models.credentials); 
 users_has_credentials.hasOne(models.users); }} )
 return users_has_credentials 
}