# CoolPos

POS-klient, zaprojektowany do użycia w sklepie stacjonarnym

Stack Technologii 

Frontend - Next.js + Tailwind CSS + Tanstack Query
Backend - NestJS + Prisma ORM + PostgreSQL


Uruchomienie frontendu
```sh
pnpm nx serve pos-web
```

Uruchomienie backendu

```sh
docker compose up -d
pnpm nx serve pos-api
```
Testy backendu

```sh
pnpm nx test pos-api
```

Kofiguracja `.env`

```
//apps/pos-api
PORT=/*Port dla backendu*/
MASTER_TOKEN=/*SECRET używany do rejestracji nowych użytkowników*/
REFRESH_SECRET=/*Secret dla JWT refresh tokena*/
ACCESS_SECRET=/*Secret dla JWT access tokena*/
DATABASE_URL=/*link do bazy dannych PostgreSQL*/
//apps/pos-web
NEXT_PUBLIC_API_BASE_URL=/*https://linkdobackendu/api*/
```

Do rejestracji użytkownika należy wysłać request z danymi użytkownika oraz MASTER_TOKEN na endpoint /auth/register, np:
```
POST {{baseURL}}/auth/register 
{
    "username": "AnnaKowalska123",
    "password": "SuperStrongPassword123",
    "greetname": "Anna",
    "masterToken": /*.env.MASTER_TOKEN*/
}
```
