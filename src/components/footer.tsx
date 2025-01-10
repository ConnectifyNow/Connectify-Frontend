import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              About
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Our Mission
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Connect
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2023 Connectify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
