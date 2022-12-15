//funciones de los usecases son findByEmail(email) -> user, OK
// update(email, data) -> updatedUser,
// authenticate(email, password) -> token,
// create(email, password) -> user.
//la nomenclatura que le di es NombreFuncion(atributos) -> return
//y user y updatedUser son instancias del modelo user
//email es un string, password también y data es un objeto literal
//

const { Router } = require("express");
const routes = Router();
const {
  create,
  update,
  authenticate,
  getById,
  del,
} = require("../usecases/user"); //verificar ruta de user
const { authHandler } = require("../middlewares/authHandler");

routes.get("/", authHandler, async (req, res) => {
  console.log(req.params);
  const userId = req.params.token.sub;

  const findUser = await getById(userId);
  console.log(findUser);
  res.json({
    ok: true,
    payload: findUser,
  });
});

//¿qué necesito del usuario? Email, password
routes.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    //obtener el usuario
    const payload = await create({ email, password });
    res.json({
      ok: true,
      message: "User created succesfully",
      payload,
    });
  } catch (error) {
    const { message } = error;
    res.status(404).json({ ok: false, message });
  }
});

//autenticar usuario con los datos que se necesitan del usuario
routes.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  try {
    const payload = await authenticate({ email, password });
    res.status(202).json({ ok: true, payload });
  } catch (error) {
    const { message } = error;
    res.status(401).json({ ok: false, message });
  }
});

//NOTA: revisar de nuez el PUT y el DELETE
routes.put("/:id", async (req, res) => {
  // Lógica para editar el usuario
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const data = { email, password };
    const editedUser = await update(id, data);
    res.json({ ok: true, payload: editedUser });
  } catch (error) {
    const { message } = error;
    res.status(404).json({ ok: false, message });
  }
});

routes.delete("/:id", async (req, res) => {
  // Logica para eliminar el usuario con el id X
  try {
    const { id } = req.params;
    //const { email, password } = req.params;
    const deletedUser = await del(id);
    res.json({ ok: true, payload: { deletedUser } });
  } catch (error) {
    const { message } = error;
    res.status(404).json({ ok: false, message });
  }
});

module.exports = routes;
