import { registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const newUser = await registerUser(user);
  res.status(200).send({
    status: 200,
    message: 'User is successfully registered',
    user: newUser,
  });
};
