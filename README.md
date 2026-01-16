# MSU Global Hub | Midlands State University

The official MSU International & Alumni Relations Office platform - connecting students with global mentors, opportunities, and the legacy of Midlands State University.

<div align="center">
<img width="1200" height="475" alt="MSU Global Hub" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## 🌍 Features

- **User Authentication**: Secure login and registration system
- **Step-by-step Onboarding**: Guided registration process
- **Profile Management**: Complete user profile with academic details
- **Events Management**: Browse and register for upcoming events
- **Alumni Network**: Connect with mentors and alumni worldwide
- **Opportunities Portal**: Explore job opportunities and career paths
- **Merchandise Store**: Purchase MSU Global Hub merchandise
- **Volunteering**: Get involved in community initiatives
- **Donations**: Support the MSU Global Fund

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
demo/
├── src/
│   ├── components/        # React components
│   ├── services/          # API and authentication services
│   ├── App.tsx           # Main application component
│   ├── index.tsx         # Entry point
│   ├── types.ts          # TypeScript type definitions
│   └── constants.tsx     # Application constants
├── public/               # Static assets (images, logos)
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
└── tsconfig.json        # TypeScript configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect the Vite framework
4. Add your environment variables in Vercel dashboard
5. Deploy!

The project is already configured with `vercel.json` for optimal deployment.

## 🏗️ Built With

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling (via CDN)
- **Lucide React** - Icons

## 📝 License

© 2024 Midlands State University. All Rights Reserved.

## 🤝 Contributing

This is an internal project for Midlands State University. For contributions, please contact the International & Alumni Relations Office.

## 📧 Contact

For inquiries, visit [MSU Official Website](https://msu.ac.zw) or contact the IAR Office.

---

**Our Hands • Our Minds • Our Destiny**
