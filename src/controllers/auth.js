import { loginUser, logoutUser, registerUser } from '../services/auth.js';

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

  res.cookie('sessionId', session._id, {
    httpOnly: true,
  });
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'User successfully logged in',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  if (typeof req.cookies.sessionId === 'string') {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).end();
};

export const refreshController = async (req, res) => {
  res.send('refresh');
};
