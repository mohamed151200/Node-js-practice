import { DataTypes } from 'sequelize';
import { sequelize } from '../connections.js'

export const User = sequelize.define(
    'User',
    {

        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,

        },// Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                this.setDataValue('firstName', value.toUpperCase())
            },
            validate: {
               checkNameLength(value){
                if (value.length<=2) throw new Error("Name must be more than 6 characters");
               }
                //isLowercase:true,
                //throw error because the set function 


            }
        },
        lastName: {
            type: DataTypes.STRING,
            set(value) {
                this.setDataValue('lastName', value.toUpperCase())
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                checkPasswordLength(value){
                    if(value.length <= 6) throw new Error(`password must be more than 6 ` );
                    
                }
            }
        },
        confirmpassword: {
            type: DataTypes.BOOLEAN,
            // allowNull defaults to true
        },
        DOB: {
            type: DataTypes.DATEONLY,
            // allowNull defaults to true
        },
        gender: {
            type: DataTypes.ENUM,
            values: ['Male', 'Female'],
            defaultValue: 'Male'

            // allowNull defaults to true
        },

        // age: {
        //     type:DataTypes.VIRTUAL,
        //     get(){
        //         return new Date().getFullYear - this.DOB
        //     }

        // },
    },
    {
        createdAt: true,
        deletedAt:`destroyTime`,
        updatedAt: true,
        freezeTableName: true,
        paranoid:true,

    },
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true