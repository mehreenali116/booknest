# Deployment Guide

This project is containerized using Docker, making it easy to deploy on any cloud service.

## 1. Local Deployment (using Docker Compose)

To run the entire stack (Frontend, Backend, and Database) locally:

1.  Make sure you have [Docker](https://www.docker.com/) installed.
2.  Run the following command in the root directory:
    ```bash
    docker-compose up --build
    ```
3.  Access the applications:
    -   **Frontend:** [http://localhost](http://localhost)
    -   **Backend API:** [http://localhost:3000/api](http://localhost:3000/api)

---

## 2. Cloud Deployment (Railway - Recommended)

Railway is excellent for this project because it handles the Frontend, Backend, and Database in one cluster.

### Step-by-Step Railway Instructions:

1.  **Login to Railway**: Go to [railway.app](https://railway.app) and login with GitHub.
2.  **Create New Project**: Click "New Project" -> "Deploy from GitHub repo".
3.  **Add Database**:
    - Click "Add Service" -> "Database" -> "Add PostgreSQL".
    - Railway will automatically provide a `DATABASE_URL`.
4.  **Add Backend Service**:
    - Click "Add Service" -> "GitHub Repo" -> Select your repo.
    - Go to **Settings** -> **Root Directory**, set it to `backend`.
    - Railway will detect the `Dockerfile` inside the `backend` folder.
    - Go to **Variables** -> Click "Reference" and select `DATABASE_URL` from the Postgres service.
5.  **Add Frontend Service**:
    - Click "Add Service" -> "GitHub Repo" -> Select your repo again.
    - Go to **Settings** -> **Root Directory**, set it to `./` (root).
    - Go to **Variables**, add:
        - `VITE_API_BASE_URL`: (Paste the URL of your deployed Backend service).
6.  **Public Access**:
    - For both services, go to **Settings** -> **Public Networking** -> Click **Generate Domain**.

---

## 3. Cloud Deployment (Render)

If you are using a virtual server (like DigitalOcean, AWS EC2, or Google Compute Engine):

1.  Install Docker and Docker Compose on the server.
2.  Clone your repository.
3.  Update the `VITE_API_BASE_URL` in `docker-compose.yml` to your server's IP or domain.
4.  Run:
    ```bash
    docker-compose up -d --build
    ```

## Notes
- The frontend is served via **Nginx** on port 80 inside the container.
- The backend runs on port 3000.
- Database persists data via a Docker volume named `postgres_data`.
