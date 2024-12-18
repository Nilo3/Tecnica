import jwt from 'jsonwebtoken'

export const generateJWT = (userId = '') => {
  const payload = {
    uid: userId
  }

  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
      algorithm: 'HS256'
    }, (err, token) => {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}
