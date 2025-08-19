# Agent Instructions

This document provides instructions for AI agents working on this repository.

## Repository Purpose

This repository is for managing APIs, cross-pollinating AI models, extensions, and meta-automation. The goal is to create a robust system for these tasks.

## Directory Structure

- `src/`: Contains the main source code.
  - `src/api/`: Code for interacting with or implementing APIs.
  - `src/models/`: Code related to AI models.
  - `src/extensions/`: Code for extensions to the core functionality.
- `config/`: Contains configuration files.
  - `config/config.json`: The main configuration file. Do not commit secrets to this file. Use environment variables for sensitive data.
- `requirements.txt`: Python dependencies.

## Development Guidelines

1.  **Adding a new API integration:**
    - Add the client code to a new file in `src/api/`.
    - If the API requires a key, add a placeholder to `config/config.json` and use an environment variable to load the actual key.
2.  **Adding a new AI model:**
    - Place the model-related code in `src/models/`.
    - Add any new dependencies to `requirements.txt`.
3.  **Configuration:**
    - All configuration should be managed through `config/config.json`.
    - Do not hardcode configuration values in the source code.
4.  **Dependencies:**
    - Keep the `requirements.txt` file up-to-date with all necessary Python packages.
5.  **Testing:**
    - Before submitting, ensure that any changes are tested. (Note: No testing framework is set up yet).
