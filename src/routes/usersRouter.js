//funciones de los usecases son findByEmail(email) -> user, OK
// update(email, data) -> updatedUser, 
// authenticate(email, password) -> token, 
// create(email, password) -> user.
//la nomenclatura que le di es NombreFuncion(atributos) -> return
//y user y updatedUser son instancias del modelo user
//email es un string, password también y data es un objeto literal
//


const {Router}=require("express");
const routes= Router();
const {
create,
getByEmail,
update,
authenticate,
}=require("../usecases/users"); //verificar ruta de user



routes.get("/", async (req,res)=>{
    const { email}= await getByEmail(email);
    res.json({
        ok:true,
        payload:{user},
    })
});


routes.get("/email", async(req,res)=>{
const {email}=req.params;

try {
    const emailFound= await getByEmail(email);
    res.json({
        ok:true,
        payload:{emailFound},
    })
} catch (error) {
    const {message}=error;
    res.status(404).json({ok:false, message});
}
});

//¿qué necesito del usuario? Email, password
routes.post("/",async(req,res)=>{
   const  {email, password}=req.body;

   try {
    //obtener el usuario 
   } catch (error) {
    const {message}=error;
    res.status(404).json({ok:false, message});
    
   }
});