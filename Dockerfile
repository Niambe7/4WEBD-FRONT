FROM node:16

WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source
COPY . .

# Définir la variable pour que le serveur écoute sur 0.0.0.0
ENV HOST=0.0.0.0

# Exposer le port 3000
EXPOSE 3000

# Lancer le serveur de développement
CMD ["npm", "start"]
