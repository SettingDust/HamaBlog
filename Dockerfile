FROM node:10.13.0-slim
ENV NODE_ENV production
WORKDIR /app
COPY package.json ./
RUN npm install --production
COPY . .
EXPOSE 4000
CMD ["hexo", "s"]