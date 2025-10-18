# Notes App with GitHub Actions + Docker (No Cloud)
 A prettier Notes app: React + Vite + Tailwind frontend and Flask + SQLite backend. GitHub Actions runs tests, builds Docker images, and pushes to Docker Hub. Deploy locally with Docker or Docker Compose.

## Features
 - Frontend: React + Vite + Tailwind UI (web/)
 - Backend: Flask + SQLite (api/)
 - CI/CD: GitHub Actions tests, builds, and pushes images to Docker Hub
 - Local run: Pull published images or build locally via Compose

## Prerequisites
 - Git
 - GitHub account
 - Docker installed and running
 - macOS/Windows: Docker Desktop
 - Linux: Docker Engine + Compose plugin
 - Docker Hub account with two public repos:
     - docker.io/<your-username>/notes-api
     - docker.io/<your-username>/notes-web
 - Tip (macOS): If docker pull fails due to DNS, set Docker Desktop → Settings → Docker Engine:
```json
{ "dns": ["1.1.1.1", "8.8.8.8"] }
```
 - Apply & restart.

# Step by Step Guild 👇

## > Clone the Repo in your local
```bash
git clone
cd
```

## > Docker Hub setup
 - Create two public repos: notes-api and notes-web.
 -  Create a Docker Hub Access Token:
     - Docker Hub → Account Settings → Security → New Access Token
       
## > Create a GitHub Repo and Add GitHub secrets
 - Repo → Settings → Secrets and variables → Actions → New repository secret:
     - DOCKERHUB_USERNAME = your Docker Hub username
     - DOCKERHUB_TOKEN = the access token
  
## > push to main (triggers CI)
```bash
# optional tweak, e.g., edit web/src/App.jsx title
git add .
git commit -m "MESSAGE"
git push -u origin main
```
 - GitHub Actions will:
   - Install test deps and run pytest for api/
   - Build Docker images for api/ and web/
   - Push to Docker Hub as latest and <commit-sha>
 - Check progress: GitHub → Actions → CI-CD (After Successful ✅ CI-CD Actions)

## > Run locally (fastest: use published images)
 - Use the images that CI pushed to Docker Hub—no local build needed.
``` bash
docker run -d -p 5000:5000 --name notes-api \
  docker.io/<your-username>/notes-api:latest

docker run -d -p 5173:80 --name notes-web \
  -e VITE_API_URL=http://localhost:5000 \
  docker.io/<your-username>/notes-web:latest
```
 - Open:
    - UI:
      ```bash
      http://localhost:5173
      ```
    - API health:
    ```bash
      http://localhost:5000/health
    ```
    
### > Run locally with Docker Compose (build on your machine)
 ```bash
 docker rm -f notes-web notes-api
```
```bash
docker compose up --build -d
```
 - Note: Compose may warn that version is obsolete. You can remove the version: line in docker-compose.yml to silence it.
 - Open:
    - UI:
      ```bash
      http://localhost:5173
      ```
    - API health:
    ```bash
      http://localhost:5000/health
    ```
















