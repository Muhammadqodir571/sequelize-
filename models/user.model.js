

module.exports = (sequelize,Sequelize)=>{
    const User = sequelize.define('user',{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey:true
        },
        name:{
            type: Sequelize.STRING(500),
            allowNull:false
        },
        email:{
            type: Sequelize.STRING(1000),
            allowNull:false,
            unique:true
        },
        password:{
            type:Sequelize.STRING(100),
            allowNull:false
        },
        isAdmin:{
            type:Sequelize.BOOLEAN,
            default:false

        }
    },{
        timestamps:true
    })

    return User
}