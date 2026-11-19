# AguaFix API

API REST para reportar fugas de agua. Construida con NestJS, PostgreSQL, TypeORM (migraciones, `synchronize: false`), S3 y Nodemailer.

## Endpoints principales

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/` | Verificación básica de la API |
| `GET` | `/health` | Health check |
| `POST` | `/auth/register` | Registro de usuario (contraseña hasheada con bcrypt) |
| `POST` | `/auth/login` | Inicio de sesión |
| `GET` | `/user` | Lista de usuarios (sin contraseñas) |
| `GET` | `/user/:id` | Detalle de usuario |
| `POST` | `/reports` | Crea un reporte con imagen (`multipart/form-data`, campo `photo`) |
| `GET` | `/reports` | Lista de reportes con su imagen |

Ejemplo de creación de reporte:

```bash
curl -X POST http://localhost:3000/reports \
  -F "address=Calle 1 #123" \
  -F "description=Fuga en la banqueta" \
  -F "severity=high" \
  -F "reporterPhone=5551234567" \
  -F "photo=@fuga.jpg"
```

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores. El archivo `.env` está en `.gitignore` y nunca debe subirse.

En producción (EC2) las credenciales de AWS **no** se guardan en el `.env`: se usa el IAM instance profile de la instancia.

## Desarrollo local

```bash
npm install
cp .env.example .env
docker compose up -d postgres
npm run migration:run
npm run start:dev
```

La API queda en `http://localhost:3000`.

### Todo con Docker

```bash
docker compose up --build
```

El contenedor de la API ejecuta las migraciones y luego `node dist/main`.

## Migraciones

```bash
npm run migration:run       # compila y ejecuta migraciones
npm run migration:run:prod  # ejecuta migraciones ya compiladas (dist)
npm run migration:revert    # revierte la última migración
```

## Imagen Docker

```bash
docker build -t <usuario-dockerhub>/aguafix-api:latest .
docker push <usuario-dockerhub>/aguafix-api:latest
```

La imagen se publica automáticamente desde GitHub Actions en cada push a `main`.

## Despliegue automático

Workflow: `.github/workflows/docker-publish.yml`

Secretos requeridos en el repositorio:

- `DOCKER_USER`
- `DOCKER_PASSWORD`
- `EC2_HOST` (hostname de No-IP o IP elástica)
- `EC2_SSH_KEY` (llave privada SSH completa)

El workflow construye la imagen, la publica con tag `latest` y se conecta por SSH a la EC2 para ejecutar `docker compose pull` y `docker compose up -d`.
