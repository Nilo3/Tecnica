import { Router } from 'express'
import { activateUser, deactivateUser, deleteUser, getAllUsers, getUserById, updateUser } from '../services/user.service.js'
import { validateJWT } from '../middlewares/validate-jwt-middleware.js'
import { validateFields } from '../middlewares/validators.middlewares.js'
import { check, param } from 'express-validator'

const router = Router()

router.get('/get-all-users', getAllUsers)

router.get('/get-user-by-id/:id', [
  validateJWT,
  param('id', 'Debe ser un id válido.').isMongoId(),
  validateFields
], getUserById)

router.put('/update-user/:id', [
  validateJWT,
  param('id', 'Debe ser un id válido.').isMongoId(),
  check('name', 'El nombre debe ser un string.').optional().isString(),
  check('age', 'La edad debe ser un número entero positivo.').optional().isInt({ gt: 0 }),
  check('email', 'Debe ser un email válido.').optional().isEmail(),
  check('password', 'La contraseña es requerida y debe tener al menos una mayúscula, dos dígitos, un carácter especial y 8 caracteres')
  .notEmpty()
  .matches(/^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*])(?=.{8,})/),
  validateFields
], updateUser)

router.put('/deactivate-user/:id', [
  validateJWT,
  param('id', 'Debe ser un id válido.').isMongoId(),
  validateFields
], deactivateUser)

router.put('/activate-user/:id', [
  validateJWT,
  param('id', 'Debe ser un id válido.').isMongoId(),
  validateFields
], activateUser)

router.delete('/delete-user/:id', [
  validateJWT,
  param('id', 'Debe ser un id válido.').isMongoId(),
  validateFields
], deleteUser)

export default router
