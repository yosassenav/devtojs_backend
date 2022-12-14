//funciones de los usecases son findByEmail(email) -> user, 
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
}=require("../usecases/user"); //verificar ruta de user

routes.get("/email", async(req,res)=>{
const {email}=req.params;

try {
    const emailFound= await findByEmail(email);
    res.json({
        ok:true,
        payload:{emailFound},
    })
} catch (error) {
    const {message}=error;
    res.status(404).json({ok:false, message});
}
});

