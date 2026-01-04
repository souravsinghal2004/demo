import React from "react";

export function Footer() {
  return (
    <footer className="py-8 bg-gray-50 border-t">
      <div className="text-center text-gray-600">
        <p>
          © {new Date().getFullYear()} AI Interview Platform — Built for Smart Hiring.
        </p>
      </div>
    </footer>
  );
}
