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
`bash DOCKERHUB_USERNAME = your Docker Hub username
      DOCKERHUB_TOKEN = the access token`
