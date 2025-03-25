# Étape 1 : Construire l'application React
FROM node:18 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json pour installer les dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Construire l'application React pour la production
RUN npm run build

# Étape 2 : Configurer Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape précédente
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
