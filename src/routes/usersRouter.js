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
getById,
}=require("../usecases/user"); //verificar ruta de user


routes.get("/", async (req,res)=>{
    const userEmail = req.params.tokenPayload.sub;

    const { email}= await getByEmail(userEmail);
    res.json({
        ok:true,
        payload:{email},
    })
});

routes.get("/", async(req,res)=>{
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

//get by ID
//const getById = async (id) => {
  //  return await User.getById(id).populate("user").exec();
//};

//¿qué necesito del usuario? Email, password
routes.post("/",async(req,res)=>{
   const  {email,password}=req.body;

   try {
    //obtener el usuario
    const payload=await create({email,password});
    res.json({
        ok:true,
        message:"User created succesfully",
        payload,
    }) 
   } catch (error) {
    const {message}=error;
    res.status(404).json({ok:false, message});
    
   }
});

//autenticar usuario con los datos que se necesitan del usuario
routes.post("/auth", async (req, res) => { 
    const { email, password } = req.body
    try {
        const payload = await authenticate(email, password);
        res.status(202).json({ ok: true, payload })
    } catch (error) {
        const { message } = error;
        res.status(401).json({ ok: false, message });
    }
});

routes.put("/", async (req, res) => {
    // Lógica para editar el usuario 

    const {email,password}=req.body;

    try {
        const data={email, password};
        const editedUser=await update(data);
        res.json({ok:true, payload:editedUser });

    } catch (error) {
        const {message}=error;
        res.status(404).json({ok:false, message});
    }

});

routes.delete("/", async(req, res) => {
    // Logica para eliminar el usuario con el id X
try {
    const {email, password}=req.params;
    const deletedUser= await del({email,password});
    res.json({ok:true, payload:{deletedUser}});

} catch (error) {
    const {message}=error;
    res.status(404).json({ok:false,message});
}
});

module.exports=routes;