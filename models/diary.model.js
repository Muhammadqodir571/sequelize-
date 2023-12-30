

module.exports = (sequelize,Sequelize)=>{
    const Diary = sequelize.define('diary',{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey:true
        },
        imageUrl:{
            type: Sequelize.STRING(500),
            allowNull:false
        },
        text:{
            type: Sequelize.STRING(1000),
            allowNull:true
        }
    },{
        timestamps:true
    })

    return Diary
}