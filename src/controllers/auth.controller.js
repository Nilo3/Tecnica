import { Router } from 'express'
import { check } from 'express-validator'
import { validateFields } from '../middlewares/validators.middlewares.js'
import { createUser, login, regenerateJWT } from '../services/auth.service.js'
import { validateEmail } from '../helpers/validator-db.helpers.js'
import { validateJWT } from '../middlewares/validate-jwt-middleware.js'

const router = Router()

router.get('/new-session', validateJWT, regenerateJWT)

router.post('/create', [
  validateJWT,
  check('name', 'El nombre es requerido y debe ser un string').notEmpty().isString(),
  check('email', 'El email es requerido y debe ser un email válido').notEmpty().isEmail(),
  check('password', 'La contraseña es requerida y debe tener al menos una mayúscula, dos dígitos, un carácter especial y 8 caracteres')
  .notEmpty()
  .matches(/^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])(?=.{8,})/),  
  check('age', 'La edad es requerida y debe ser un número entero no negativo').notEmpty().isInt({ min: 0 }),
  check('email').custom(validateEmail),
  validateFields
], createUser)

router.post('/login', [
  check('email', 'El email es requerido').notEmpty().isEmail(),
  check('password', 'La contraseña es requerida').notEmpty(),
  validateFields
], login)

export default router
