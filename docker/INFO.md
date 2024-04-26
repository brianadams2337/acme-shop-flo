# SCAYLE Storefront Boilerplate - /docker

The `docker/` directory is designated for storing `Dockerfiles` and potentially other Docker-related configuration files necessary for setting up containerized environments. This directory typically includes `Dockerfiles` tailored for specific runtime environments, such as `node` for traditional JavaScript server-side applications and `bun` for experimental deployments leveraging its modern JavaScript runtime capabilities. Each Dockerfile within this directory outlines the steps to create a Docker image — specifying the base image, defining the environment, copying necessary files, installing dependencies, and setting up runtime commands. This setup allows developers to ensure consistent, reproducible environments that are isolated from the host system, facilitating both development and production deployments. The inclusion of configurations for both Node.js and Bun allows for flexibility in choosing the runtime based on performance needs or compatibility requirements.

NOTE: Deployment with `bun` is currently not support in an official capacity!

---

For more information, check the [official Docker documentation](https://docs.docker.com/) and the [official Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).
