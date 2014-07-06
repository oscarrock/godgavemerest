module.exports = function(sequelize, DataTypes) { 
 users = sequelize.define(
 'users' 
,{ 
 
 id: {type: DataTypes.INTEGER, allowNull:false, autoIncrement:true, primaryKey: true} ,
   firstname: {type:  DataTypes.STRING, allowNull:true },
   lastname: {type:  DataTypes.STRING, allowNull:true },
   doc_id: {type:  DataTypes.STRING, allowNull:true },
   username: {type:  DataTypes.STRING, allowNull:true },
   password: {type:  DataTypes.STRING, allowNull:true },
   active: {type:  DataTypes.BOOLEAN, allowNull:true },
 user_type_id: {type: DataTypes.INTEGER, allowNull:false },
   phone: {type:  DataTypes.STRING, allowNull:true }, 
}, 
{ tableName: 'users',timestamps: false, 

 associate: function(models){
 users.hasMany(models.service); 
 users.hasOne(models.user_type); 
 users.hasMany(models.users_has_address); 
 users.hasMany(models.users_has_credentials); }} )
 return users 
}