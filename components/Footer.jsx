import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-gray-300 py-10  border-t border-zinc-800">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Left side */}
        <div className="text-center sm:text-left space-y-1">
          <h4 className="text-lg font-semibold">Sourav Singhal</h4>
          <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
          <p className="text-sm">Made with ❤️ by Sourav Singhal</p>
        </div>

        {/* Middle: Message instead of just "Contact" */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Let’s connect and build something amazing together.
          </p>
          <p className="text-sm">
            <a
              href="mailto:contactsouravsinghal@gmail.com"
              className="text-blue-400 hover:underline"
              title="Send an Email"
            >
              contactsouravsinghal@gmail.com
            </a>
          </p>
        </div>

        {/* Right: Enhanced social icons */}
        <div className="flex gap-6 text-sm">
          <a
            href="https://github.com/souravsinghal2004"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-blue-400 transition"
            title="GitHub"
          >
            <FaGithub className="text-2xl" />
            <span className="text-xs mt-1">GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/sourav-singhal-a860b5259/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-blue-400 transition"
            title="LinkedIn"
          >
            <FaLinkedin className="text-2xl text-blue-500" />
            <span className="text-xs mt-1">LinkedIn</span>
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=contactsouravsinghal@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center hover:text-blue-400 transition"
            title="Send Email"
          >
            <FaEnvelope className="text-2xl text-red-400" />
            <span className="text-xs mt-1">Email</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer