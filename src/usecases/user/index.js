const User = require("../../models/users").model;
const { hashPassword, verifyPassword } = require("../../lib/encrypt");
const { createToken, verifyToken } = require("../../lib/jwt");

const create = async (data) => {
  const { email, password } = data;

  const hash = await hashPassword(password);

  const user = new User({ email, password: hash });
  return await user.save();
};

const getByEmail = async (email) => await User.findOne({ email });

const getById = async (id) => await User.findById(id, ["email"]);

const update = async (id, data) =>
  await User.findByIdAndUpdate(id, data, { new: true }).exec(); // Falta el hash, no regresar el password sino un mensaje!!!! Esto debe ser con PATCH, y PUT debe mandar todo el objeto completo.

const del = async (id) => await User.findByIdAndDelete(id).exec();

const authenticate = async (data) => {
  const { email, password } = data;
  const user = await getByEmail(email);
  const hash = user.password;

  console.log("password: ", password, "hash:", hash);
  const isVerified = await verifyPassword(password, hash);
  if (!isVerified) throw new Error("Wrong password");
  return createToken({ sub: user._id });
};

module.exports = {
  create,
  authenticate,
  update,
  getById,
  getByEmail,
  del,
};
