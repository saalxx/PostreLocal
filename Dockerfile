FROM node:20-alpine

# Instalar Newman (Postman CLI)
RUN npm install -g newman

# Crear directorio de trabajo
WORKDIR /etc/newman

# Copiar colecciones y environments
COPY collections ./collections
COPY environments ./environments

# Comando por defecto (puedes cambiarlo)
CMD ["newman", "run", "collections/api-tests.postman_collection.json", "-e", "environments/dev.postman_environment.json"]