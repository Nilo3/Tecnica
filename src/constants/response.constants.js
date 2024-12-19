export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}

export const MESSAGES = {
  USERS_NOT_FOUND: 'No se encontraron usuarios',
  USER_NOT_FOUND: 'No se encontró el usuario',
  USER_ALREADY_INACTIVE: 'El usuario ya se encuentra desactivado',
  USER_ALREADY_ACTIVE: 'El usuario ya se encuentra activo',
  USERS_FETCHED: 'Usuarios obtenidos correctamente',
  USER_FETCHED: 'Usuario obtenido correctamente',
  USER_CREATED: 'Usuario creado correctamente',
  USER_UPDATED: 'Usuario actualizado correctamente',
  LOGIN_SUCCESS: 'Usuario logueado correctamente',
  USER_DEACTIVATED: 'Usuario desactivado correctamente',
  USER_ACTIVATED: 'Usuario activado correctamente',
  USER_DELETED: 'Usuario eliminado correctamente',
  ERROR_FETCHING_USERS: 'Error al obtener los usuarios',
  ERROR_FETCHING_USER: 'Error al obtener el usuario',
  ERROR_UPDATING_USER: 'Error al actualizar el usuario',
  ERROR_DEACTIVATING_USER: 'Error al desactivar el usuario',
  ERROR_ACTIVATING_USER: 'Error al activar el usuario',
  ERROR_DELETING_USER: 'Error al eliminar el usuario',
  ERROR_CREATING_USER: 'Error al crear el usuario',
  ERROR_LOGIN: 'Error al iniciar sesión - Credenciales incorrectas',
  ERROR_REGENERATING_TOKEN: 'Error al regenerar el token'
}
