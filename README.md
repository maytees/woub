# Woub

A web based file browser

## Setup

### Docker

If you wish to deploy Woub wih docker, you have two options, either the Docker compose (reccomended)
or the Docker CLI.

First, pull the Docker image

```bash
docker pull maytees/woub:latest
```

#### Docker Compose (Reccomended)

```yml
version: '3.8'

services:
  woub:
    platform: "linux/amd64"
    build:
      context: .
      dockerfile: Dockerfile
      args:
        NEXT_PUBLIC_CLIENTVAR: "clientvar"
    working_dir: /app
    ports:
      - "3000:3000"
    image: maytees/woub:latest
    environment:
    - DATABASE_URL=postgres://postgres:dbpassword@db:5432/woub
    - GITHUB_CLIENT_ID=your_github_client_id
    - GITHUB_SECRET=your_github_secret
    - NEXTAUTH_SECRET=your_nextauth_secret
    - NEXTAUTH_URL=http://localhost:3000
  db:
    image: postgres:latest
    restart: always
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=dbusername
      - POSTGRES_PASSWORD=dbpassword
      - POSTGRES_DB=woub
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```
*See next section for env modification*

Then, run both services

```bash
docker compose up
```
*to run the services in the background, add the `-d` flag*


#### Docker CLI

##### Woub Service

```bash
docker build -t woub:latest . \
  --build-arg NEXT_PUBLIC_CLIENTVAR=clientvar \
  --build-arg GITHUB_CLIENT_ID=your_github_client_id \
  --build-arg GITHUB_SECRET=your_github_secret \
  --build-arg NEXTAUTH_SECRET=your_nextauth_secret \
  --build-arg NEXTAUTH_URL=http://localhost:3000 
```  
*See next section for env modification*

##### Postgres service

```bash
docker run -d --name db --restart always \
  -p 5432:5432 \
  -e POSTGRES_USER=dbusername \
  -e POSTGRES_PASSWORD=dbpassword \
  -e POSTGRES_DB=woub \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:latest
```
*See next section for env modification*

#### Environment variables

Woub service:
- `DATABASE_URL` db url
- `GITHUB_CLIENT_ID` github oauth client id (will be optional in the future)
- `GITHUB_SECRET` github oauth client secret (also will be optional in the future)
- `NEXTAUTH_SECRET` nextauth secret, generate via `openssl rand -base64 32`

Postgres:
- `POSTGRES_USER` username
- `POSTGRES_PASSWORD` password
- `POSTGRES_DB` db name (should just be woub)

### No Docker installation (unreccomended)

1. Clone repo
```bash
git clone https://github.com/maytees/woub
```
2. Create .env file

Example
```yaml
DATABASE_URL="POSTGRES_DB"

# openssl rand -base64 32
NEXTAUTH_SECRET="mynextauthsecret"
NEXTAUTH_URL="http://localhost:3000"

GITHUB_CLIENT_ID=:"mygithuboauthid"
GITHUB_SECRET="mygithuboauthsecret"
```

3. Run

```bash
npm run dev
```

*Made using the create-t3-app, using Prisma, NextJS, NextAuth, TRPC, and ShadcnUi, named after*
*the infamous Oliver Monlar*