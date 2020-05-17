#!/bin/sh

# Install npm packages.
echo "[INFO] Installing required npm packages:"
npm install

# Build the application.
echo "[INFO] Building the api."
npm run build

# Start the application.
echo "[INFO] Starting the development server."
npm run development:start
