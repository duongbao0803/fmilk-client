import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-center p-4 bg-gray-800 text-white">
      <p className="text-center">&copy; {new Date().getFullYear()} FPT University SDN Team Dương Bảo. All rights reserved.</p>
    </footer>
  );
}

export { Footer };
