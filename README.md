# EduForge

EduForge is a web app that allows teachers to create classrooms.  
It leverages AI to generate questions, making task creation faster, easier, and customizable. Students can join classrooms, view published tasks, attempt the tasks within the deadline, making learning interactive, efficient, and organized.

## Motive Behind EduForge

The idea for EduForge came from my own teaching experience. While tutoring my student, assigning tasks used to be a time-consuming process. His textbooks had only a limited number of questions, which weren’t enough for him to fully grasp the concepts I was teaching. To fill this gap, I would generate questions with AI, copy them into a text editor, export them as a PDF, and then send them through messaging apps. This fragmented workflow was inefficient and often distracted from what really mattered: helping him learn and giving him enough problems to practice.

With EduForge, everything is now in one place. Teachers can generate, edit, and publish tasks directly within the classroom, while students can access and attempt them seamlessly. This makes the teaching process smoother, saves time, and creates a more engaging experience for students.

## Tech Stack

- **Framework:** Next.js 15
- **UI:** Tailwind CSS + shadcn/ui + Lucide Icons
- **Auth:** Clerk
- **Database:** PostgreSQL (via [Neon](https://neon.tech/))
- **ORM:** Drizzle
- **AI Generation**: Integrated with OpenRouter (using the OpenAI SDK) using gpt-3.5-turbo.
- **Hosting:** Vercel

## Folder Structure

```
actions/                  # Server actions
src/
│
├── app/                  # Next.js App Router structure
│   ├── classroom/        # Page routes for classrooms
│   ├── create-classroom  # Page for creating classroom
|   ├── unauthorized      # Page for unauthorized access
│   ├── layout.tsx        # Root layout
|   ├── not-found.tsx     # Custom 404 page
|   ├── error.tsx         # Global error page
│   └── page.tsx          # Entry page
│
├── components/           # Reusable UI components
├── db/                   # Drizzle schema, migrations
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── middleware.ts         # Clerk middleware

```

## Getting Started (Development)

1. **Clone the repo:**

   ```bash
   git clone https://github.com/Shinjon101/edu-forge.git
   cd edu-forge
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file:

   ```env
   DATABASE_URL=...
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   OPENROUTER_API_KEY=...
   ```

4. **Run locally:**

   ```bash
   npm run dev
   ```

5. **Build for production:**

   ```bash
   npm run build
   ```

---

## Deployment

Use [Vercel](https://vercel.com) to deploy:

    1. Push your code to GitHub
    2. Import the project on Vercel
    3. Set up all environment variables in the Vercel dashboard
    4. Use a custom domain as Clerk does not allow domains given by vercel
    5. Done! 🎉

## Author

Built with ❤️ by Shinjon — open to feedback and contributions.
