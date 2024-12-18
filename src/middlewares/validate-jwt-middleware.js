import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const validateJWT = async (req, res, next) => {
  try {
    const bearerToken = req.header('Authorization');

    if (!bearerToken?.startsWith('Bearer ')) {
      return res.status(401).json({
        ok: false,
        msg: 'Acceso denegado'
      });
    }

    const token = bearerToken.substring(7);

    const {uid} = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: 'Acceso denegado'
      });
    }

    req.authUser = user;

    next();

  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'Acceso denegado'
    });
  }
}
