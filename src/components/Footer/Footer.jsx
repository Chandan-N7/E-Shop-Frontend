import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 pb-5">
      <div className="max-w-[1280px] m-auto px-5">
        <div className="container px-5 flex justify-between md:flex-row flex-col md:gap-0 gap-5">
          {/* E-SHOP Brand Section */}
          <div className="md:w-[300px]">
            <h3 className="text-xl font-semibold mb-4">E-SHOP</h3>
            <p className="text-gray-400">
              Your one-stop online shop for all your needs. We bring the best
              products at unbeatable prices!
            </p>
          </div>

          {/* Contact Information */}
          <div className="md:w-[300px]">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">Phone:</span> +61 123 456 789
              </li>
              <li>
                <span className="font-semibold">Email:</span> support@e-shop.com
              </li>
              <li>
                <span className="font-semibold">Address:</span> Sydney,
                Australia
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="md:w-fit">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400">
                {/* Facebook Icon */}
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 3.64 8.06 8.11 8.92v-6.31h-2.44v-2.6h2.44v-1.99c0-2.42 1.45-3.75 3.65-3.75 1.06 0 2.16.18 2.16.18v2.37h-1.21c-1.2 0-1.57.75-1.57 1.51v1.68h2.78l-.44 2.6h-2.34v6.31c4.47-.86 8.11-4.5 8.11-8.92 0-5.52-4.48-10-10-10z" />
                </svg>
              </a>
              <a href="#" className="hover:text-gray-400">
                {/* Twitter Icon */}
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.42 3.64 8.06 8.11 8.92v-6.31h-2.44v-2.6h2.44v-1.99c0-2.42 1.45-3.75 3.65-3.75 1.06 0 2.16.18 2.16.18v2.37h-1.21c-1.2 0-1.57.75-1.57 1.51v1.68h2.78l-.44 2.6h-2.34v6.31c4.47-.86 8.11-4.5 8.11-8.92 0-5.52-4.48-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          &copy; 2024 E-SHOP. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
