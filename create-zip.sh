#!/bin/bash

# Script to create a zip file of the project

# Get the current directory name
PROJECT_NAME="jsndbndd-project"

# Create timestamp for zip file name
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")

# Output zip file name
ZIP_NAME="${PROJECT_NAME}-${TIMESTAMP}.zip"

# Files and folders to include
echo "Creating zip file: ${ZIP_NAME}"

# Create zip file excluding unnecessary files and folders
zip -r "${ZIP_NAME}" . \
  -x "*.git*" \
  -x "node_modules/*" \
  -x "dist/*" \
  -x "*.zip" \
  -x "back-to-basicsorg-3eef3fda (Unzipped Files)/*" \
  -x "create-zip.sh"

echo "Zip file created successfully: ${ZIP_NAME}"
echo "Contents:"
unzip -l "${ZIP_NAME}" | head -20
