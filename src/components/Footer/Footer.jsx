import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import React from "react";
import { Link } from "react-router-dom";
import IconiqueLogo from "../../assets/Iconique_Fashion_Logo.png";

const Footer = () => {
  
  return (
    <footer className=" text-white" style={{background:'#F33A6A'}}>
      <div className="max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div>
            <img
              src={IconiqueLogo} // Use the imported logo here
              alt="Iconique Logo"
              className="w-16 mb-4"
            />
            <p className="text-sm italic">
              Fashion that speaks your style. Explore the best with Iconique.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Phone: +1 234 567 890</li>
              <li>Email: info@iconique.com</li>
              <li>Address: 123 Fashion Street, NY</li>
            </ul>
          </div>
          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl hover:text-pink-300 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl hover:text-pink-300 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl hover:text-pink-300 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl hover:text-pink-300 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-pink-500 pt-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Iconique. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
