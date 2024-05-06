import React from "react";
import logo from "@/public/platven_logo.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative mt-20 bg-gray-900 px-4 pt-20">
      <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-white p-2">
        <Image className="h-full object-contain" src={logo} alt="" />
      </div>
      <div className="flex justify-center w-full  text-white mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:max-w-[80%] gap-10">
          <div>
            Properties are most budget friendly so you have are find opportunity
            is main responsibility to clients
          </div>
          <div>
            <ul>
              <li>Some</li>
              <li>Links</li>
              <li>Goes</li>
              <li>Here</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Some</li>
              <li>Links</li>
              <li>Goes</li>
              <li>Here</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Some</li>
              <li>Links</li>
              <li>Goes</li>
              <li>Here</li>
            </ul>
          </div>
        </div>
      </div>
      <nav
        aria-label="Footer Navigation"
        className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left"
      >
        <a href="#" className="font-medium text-white">
          Demo
        </a>
        <a href="#" className="font-medium text-white">
          Support
        </a>
        <a href="#" className="font-medium text-white">
          Privacy Policy
        </a>
        <a href="#" className="font-medium text-white">
          Terms &amp; Conditions
        </a>
      </nav>
      <p className="py-10 text-center text-gray-300">
        © {new Date(Date.now()).getFullYear()} Platven | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
