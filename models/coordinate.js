module.exports = function(sequelize, DataTypes) { 
 coordinate = sequelize.define(
 'coordinate' 
,{ 
 
 id: {type: DataTypes.INTEGER, allowNull:false, autoIncrement:true, primaryKey: true} ,
   latitude: {type:  DataTypes.FLOAT, allowNull:false },
   longitude: {type:  DataTypes.FLOAT, allowNull:false },
   speed: {type:  DataTypes.FLOAT, allowNull:true },
   altitude: {type:  DataTypes.FLOAT, allowNull:true },
   address: {type:  DataTypes.STRING, allowNull:true }, 
}, 
{ tableName: 'coordinate',timestamps: false, 

 associate: function(models){
 coordinate.hasMany(models.user_address); }} )
 return coordinate 
}