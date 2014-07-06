module.exports = function(sequelize, DataTypes) { 
 service = sequelize.define(
 'service' 
,{ 
 
 id: {type: DataTypes.INTEGER, allowNull:false, autoIncrement:true, primaryKey: true} ,
   date: {type:  DataTypes.DATE, allowNull:true },
   end: {type:  DataTypes.DATE, allowNull:true },
   deliver_address: {type:  DataTypes.STRING, allowNull:true },
   deliver_instructions: {type:  DataTypes.STRING, allowNull:true },
   price: {type:  DataTypes.FLOAT, allowNull:true },
   deliver: {type:  DataTypes.BOOLEAN, allowNull:true },
 messenger_id: {type: DataTypes.INTEGER, allowNull:true },
   arrival_time: {type:  DataTypes.INTEGER, allowNull:true },
   is_money: {type:  DataTypes.BOOLEAN, allowNull:true },
   money: {type:  DataTypes.FLOAT, allowNull:true },
 user_address_id: {type: DataTypes.INTEGER, allowNull:false }, 
}, 
{ tableName: 'service',timestamps: false, 

 associate: function(models){
 service.hasOne(models.users); 
 service.hasOne(models.user_address); }} )
 return service 
}