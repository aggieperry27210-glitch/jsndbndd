# Base44 Preview Template for MicroVM sandbox

This template is used by the server to preview user-apps.

## user files
server creates the user-app files in the __components__, __pages__ folders

## server injected data
server injects app related data to __app.config.js__, which is used by App.jsx to render the components in the files.

## Creating a Zip File

To create a zip file of the project, run the provided script:

```bash
bash create-zip.sh
```

This will create a timestamped zip file (e.g., `jsndbndd-project-YYYYMMDD-HHMMSS.zip`) containing all project files, excluding:
- `.git` directory
- `node_modules`
- `dist` folder
- Existing zip files
- Temporary folders
