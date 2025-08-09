
# PDF Job Summarizer - Frontend

This is the frontend for the PDF Job Summarizer application, a tool designed to extract and display key information from government job notification PDFs in a clean, user-friendly format. This project was built with Next.js, TypeScript, and Tailwind CSS, and it is deployed on Vercel.

**Live Demo:** [https://pdf-job-parser-frontend-dn9v.vercel.app/](https://pdf-job-parser-frontend-dn9v.vercel.app/)

## Features

  - **File Upload:** A drag-and-drop file upload component for submitting PDF files.
  - **Job Card Display:** A clean and modern job card for displaying the extracted information.
  - **Extraction Summary:** A summary of the parsing process, including file size, text length, and the number of fields extracted.
  - **Download and Apply:** "Download PDF" and "Apply Now" buttons for user interaction.
  - **Responsive Design:** A fully responsive layout that works on all screen sizes.

## Tech Stack

  - **Framework:** Next.js
  - **Language:** TypeScript
  - **Styling:** Tailwind CSS
  - **UI Components:** Shadcn UI
  - **Notifications:** Sonner

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Jayshiva04/pdf-job-parser-frontend
    cd pdf-job-parser-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the URL of your backend API:

    ```
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.
