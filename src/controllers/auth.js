import { loginUser, registerUser } from '../services/auth.js';

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

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const session = await loginUser(email, password);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    expires: session.accessTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'User successfully logged in',
    data: { accessToken: session.accessToken },
  });
};
