module.exports = function(sequelize, DataTypes) { 
 credentials = sequelize.define(
 'credentials' 
,{ 
 
 id: {type: DataTypes.INTEGER, allowNull:false, autoIncrement:true, primaryKey: true} ,
   provider: {type:  DataTypes.STRING, allowNull:true },
   token: {type:  DataTypes.STRING, allowNull:true },
   uid: {type:  DataTypes.STRING, allowNull:true },
   key: {type:  DataTypes.STRING, allowNull:true },
   timestamp: {type:  DataTypes.DATE, allowNull:true }, 
}, 
{ tableName: 'credentials',timestamps: false, 

 associate: function(models){
 credentials.hasMany(models.users_has_credentials); }} )
 return credentials 
}