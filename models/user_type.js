module.exports = function(sequelize, DataTypes) { 
 user_type = sequelize.define(
 'user_type' 
,{ 
 
 id: {type: DataTypes.INTEGER, allowNull:false, autoIncrement:true, primaryKey: true} ,
   name: {type:  DataTypes.STRING, allowNull:true },
   description: {type:  DataTypes.STRING, allowNull:true }, 
}, 
{ tableName: 'user_type',timestamps: false, 

 associate: function(models){
 user_type.hasMany(models.users); }} )
 return user_type 
}