# NestJS + PDF

Pasos:

1. Reconstruir módulos de Node: `pnpm i`
2. Levantar db con: `docker compose up -d`
3. Generar el prisma client: `pnpm dlx prisma generate`

Si al momento de utilizar el pdfmake genera el error `pdfmake_1.default is not a constructor`, hay que indicar la opción `"esModuleInterop": true` en el archivo `tsconfig.json`.
