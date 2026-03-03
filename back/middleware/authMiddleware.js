// Importamos la librería jsonwebtoken
// Sirve para crear y verificar tokens JWT
const jwt = require("jsonwebtoken");

// Clave secreta usada para firmar y verificar los tokens
// ⚠️ En producción esto NO debe estar hardcodeado
// debería estar en una variable de entorno (.env)
const SECRET = "supersecreto";

// Exportamos un middleware
// (req, res, next) es la estructura típica de un middleware en Express
module.exports = (req, res, next) => {

  // Obtenemos el header Authorization de la petición
  const authHeader = req.headers.authorization;

  // Si no existe el header Authorization → no está autenticado
  if (!authHeader) {
    return res.status(401).json({ message: "No autorizado" });
  }

  // El header normalmente viene así:
  // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  // Entonces lo dividimos por espacio y tomamos la segunda parte (el token)
  const token = authHeader.split(" ")[1];

  // Si por alguna razón no existe el token
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    // Verificamos el token usando la clave secreta
    // Si es válido, devuelve la información decodificada
    const decoded = jwt.verify(token, SECRET);

    // Guardamos la información del usuario dentro del request
    // Así las siguientes rutas pueden acceder a req.user
    req.user = decoded;

    // Llamamos a next() para continuar con la siguiente función
    next();

  } catch (error) {
    // Si el token es inválido o expiró
    res.status(401).json({ message: "Token inválido" });
  }
};