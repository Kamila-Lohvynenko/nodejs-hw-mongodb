import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  requestResetEmail,
  resetPassword,
} from '../services/auth.js';
import { setSessionCookies } from '../utils/setSessionCookies.js';

export const registerUserController = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const newUser = await registerUser(user);
  res.status(201).send({
    status: 201,
    message: 'User is successfully registered',
    user: newUser,
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const session = await loginUser(email, password);

  setSessionCookies(res, session);

  res.status(200).send({
    status: 200,
    message: 'User successfully logged in',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (typeof sessionId === 'string') {
    await logoutUser(sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).end();
};

export const refreshController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const newSession = await refreshSession(sessionId, refreshToken);

  setSessionCookies(res, newSession);

  res.status(200).send({
    status: 200,
    message: 'Session successfully refreshed',
    data: { accessToken: newSession.accessToken },
  });
};

export const requestResetEmailController = async (req, res) => {
  const { email } = req.body;

  await requestResetEmail(email);

  res.status(200).send({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  const { password, token } = req.body;

  await resetPassword(password, token);

  res.status(200).send({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
