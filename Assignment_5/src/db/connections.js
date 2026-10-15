
import {Sequelize} from "sequelize"

export const sequelize = new Sequelize (
    
    {
        host:'localhost',
        port:'3306',
        dialect:'mysql'
    }

)

export const  connectDB=async( )=>{
    try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}

export const syncTabels=async()=>{
    try{
        await sequelize.sync(
            // use this option in development phase only
            { force: false,alter:false });
        console.log('All models were synchronized successfully.');
    }catch(err){
                console.log(err);
                
    }
}