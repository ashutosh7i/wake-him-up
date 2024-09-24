export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-sm space-y-2">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Wake Them Up. All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Made with <span className="text-red-500">💖</span> by{" "}
            <a
              className="font-semibold text-primary hover:underline"
              href="https://github.com/Ashutosh7i"
              rel="noopener noreferrer"
              target="_blank"
            >
              Ashutosh7i
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
