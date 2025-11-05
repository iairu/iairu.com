---
title: Docker Best Practices Guide
tags: docker, devops, containers, deployment
desc: A comprehensive guide to Docker containerization and best practices
date: 2025-11-05
bg: default
robots: index,follow
---

# Docker Best Practices Guide

Docker has revolutionized how we deploy and manage applications. This guide covers essential practices for working with Docker effectively.

## Why Docker?

Docker provides:
- **Consistency**: Same environment from development to production
- **Isolation**: Applications run in isolated containers
- **Portability**: Run anywhere Docker is supported
- **Efficiency**: Lightweight compared to virtual machines

## Basic Concepts

### Images vs Containers

- **Image**: Blueprint for creating containers (immutable)
- **Container**: Running instance of an image (ephemeral)

### Dockerfile Basics

```dockerfile
# Use official base images
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Define startup command
CMD ["node", "server.js"]
```

## Best Practices

### 1. Use Official Base Images

Always start with official images from trusted sources:

```dockerfile
FROM node:18-alpine
FROM python:3.11-slim
FROM nginx:alpine
```

### 2. Minimize Layers

Combine RUN commands to reduce image layers:

```dockerfile
# Bad
RUN apt-get update
RUN apt-get install -y package1
RUN apt-get install -y package2

# Good
RUN apt-get update && \
    apt-get install -y package1 package2 && \
    rm -rf /var/lib/apt/lists/*
```

### 3. Use .dockerignore

Create a `.dockerignore` file to exclude unnecessary files:

```
node_modules
npm-debug.log
.git
.env
*.md
.DS_Store
```

### 4. Don't Run as Root

Create a non-root user:

```dockerfile
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
```

### 5. Use Multi-Stage Builds

Reduce final image size:

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
CMD ["node", "dist/server.js"]
```

## Docker Compose

For multi-container applications, use Docker Compose:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=secret

volumes:
  db-data:
```

## Common Commands

```bash
# Build image
docker build -t myapp:latest .

# Run container
docker run -d -p 3000:3000 --name myapp myapp:latest

# View logs
docker logs -f myapp

# Execute command in container
docker exec -it myapp sh

# Stop and remove container
docker stop myapp && docker rm myapp

# Clean up
docker system prune -a
```

## Health Checks

Add health checks to monitor container health:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1
```

## Security Considerations

1. **Scan images for vulnerabilities**: Use `docker scan` or similar tools
2. **Keep images updated**: Regularly update base images
3. **Limit capabilities**: Use `--cap-drop` and `--cap-add`
4. **Use secrets management**: Never hardcode sensitive data
5. **Read-only filesystem**: When possible, mount as read-only

## Debugging Tips

```bash
# Inspect container
docker inspect myapp

# View resource usage
docker stats

# Access container filesystem
docker exec -it myapp sh

# Check container logs
docker logs --tail 100 myapp
```

## Conclusion

Docker is a powerful tool that, when used correctly, can significantly improve your development and deployment workflow. Start simple, follow best practices, and gradually adopt more advanced techniques as needed.

## Resources

- [Docker Official Documentation](https://docs.docker.com/)
- [Docker Hub](https://hub.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)

---

*Keep your containers light, your images secure, and your deployments smooth!*
