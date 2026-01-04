import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: "InterviewAI - Ace Your Next Interview",
  description: "Practice with AI-powered interview platform",
};

export default function RootLayout({ children }) {
  return (
 
  <ClerkProvider>
    
    
    <html lang="en">
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  </ClerkProvider>
  )
}
