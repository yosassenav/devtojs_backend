//jess, las funciones de los usecases son findByEmail(email) -> user, 
// update(email, data) -> updatedUser, 
// authenticate(email, password) -> token, 
// create(email, password) -> user.
//la nomenclatura que le di es NombreFuncion(atributos) -> return
//y user y updatedUser son instancias del modelo user
//email es un string, password también y data es un objeto literal


const {Router}=require("express");
const routes= Router();
const {
    create,
findByEmail,
update,
authenticate,
};