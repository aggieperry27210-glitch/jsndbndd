# Back to Basics - Educational Platform

This is a Base44-powered educational platform providing interactive learning modules for Math, ELA, Finance, Politics, and more.

## Base44 Configuration

This app requires a Base44 backend connection. To set up:

1. **Get your Base44 App ID**:
   - Visit [Base44 Dashboard](https://base44.com)
   - Create or select your application
   - Copy your App ID (format: `yourapp-xxxxxxxx`)

2. **Configure Environment Variables**:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your Base44 App ID
   VITE_BASE44_APP_ID=your_app_id_here
   VITE_BASE44_BACKEND_URL=https://api.base44.com
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## Features

- **Math Module**: Interactive math lessons and simulator
- **ELA Module**: English Language Arts exercises and simulator
- **Finance Module**: Personal finance education including budgeting, investing, and credit management
- **Politics Module**: Government structure, elections, and civics education
- **Progress Tracking**: User progress tracking with Base44 backend
- **Quiz System**: Interactive quizzes across all subjects
- **Chatbot**: AI-powered educational assistant

## Base44 Integration

The app uses Base44 SDK for:
- User authentication and authorization
- Entity storage (Quiz, UserProgress)
- Backend integrations (LLM, Email, SMS, File Upload, Image Generation)
- App logging and analytics

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```
