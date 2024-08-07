# Cadi

A platform for Cadi

## Development

### Prerequisites

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)
- [VSCode](https://code.visualstudio.com/download)

## If you are in Windows follow the following additional steps

- [Install WSL](https://learn.microsoft.com/es-es/windows/wsl/install/)
- [Install Docker Compose for Windows](https://www.ionos.com/digitalguide/server/configuration/install-docker-compose-on-windows/) You have to run a terminal with administrator permissions

### Getting Started

1. Install the following extensions in VSCode:

- [DevContainers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2. Clone the repository

```bash
git clone https://github.com/zam-cv/cadi
```

3. Change to the project directory

```bash
# Open the project directory in VSCode or use the terminal
code cadi
```

4. Set environment variables

- Create a `.env` file inside the backend folder and add the following environment variables:

```bash
# backend/.env
RUST_LOG=debug
HOST=0.0.0.0
PORT=8080
DATABASE_URL=postgres://admin:awdrqwer12@database-server:5432/cadi

SECRET_KEY=secret

POSTGRES_USER=admin
POSTGRES_PASSWORD=awdrqwer12
POSTGRES_DB=cadi

ADMIN_DEFAULT_EMAIL=admin@cadi.com
ADMIN_DEFAULT_PASSWORD=awdrqwer12
```

5. Open the project in a container

- Press `F1` and select `Dev Containers: Reopen in Container`

6. Install the project dependencies

- Open a terminal and run the following commands:

```bash
cd platform
npm install
```

7. Start the project

```bash
cd backend
diesel setup
cargo run
```

```bash
cd platform
npm run dev
```