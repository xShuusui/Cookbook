#!/bin/sh

# Install npm packages.
echo "[INFO] Installing required npm packages:"
npm install --silent

# Start the application.
echo "[INFO] Starting the application."
npm run start
