const Sequelize = require('sequelize')


const sequelize = new Sequelize('Diarybook', 'postgres', '2361201', {
    host: 'localhost',
    port:5433,
    dialect:'postgres'
  });

 const db = {}

 db.Sequelize = Sequelize
 db.sequelize = sequelize

 db.diary = require('./diary.model')(sequelize,Sequelize)
 db.comment=require('./comment.model')(sequelize,Sequelize)
 db.user  = require('./user.model')(sequelize,Sequelize)
// diaryni commentga boglash 3ta usulda foydalaniladi  1- hasMany 2-belongsToMany 3-manyTomany 
 
db.user.hasMany(db.diary,{
  as:'diaries',
  onDelete:'CASCADE',
  constriants:true
})
db.user.hasMany(db.comment,{
  as:'comment',
  onDelete:'CASCADE',
  constriants:true
})
db.diary.hasMany(db.comment,{
  as:'comment',
  onDelete:'CASCADE',
  constriants:true
})
db.diary.belongsTo(db.user,{
  foreingKey:'userId',
  as:'user',
 
 })
 db.comment.belongsTo(db.user,{
  foreingKey:'userId',
  as:'user'
 
 })
 db.comment.belongsTo(db.diary,{
  foreingKey:'diaryId',
  as:'diary',
 
 })
  module.exports = db