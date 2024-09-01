"use client";

import Logo from "@/components/Logo";
import Social from "@/components/Social";
import config from "@/config/config.json";
import social from "@/config/social.json";
import { slugSelector } from "@/lib/utils/slugSelector";
import { markdownify } from "@/lib/utils/textConverter";
import { INavigationLink } from "@/types";
import Link from "next/link";
import { FaPhone, FaEnvelope } from "react-icons/fa"; // Import icons

const Footer = ({
  lang,
  menu,
}: {
  lang: string;
  menu: { footer: INavigationLink[] };
}) => {
  const { copyright } = config.params;

  return (
    <footer className="bg-theme-light dark:bg-darkmode-theme-light">
      <div className="container">
        <div className="row items-center py-10">
          <div className="mb-8 text-center lg:col-3 lg:mb-0 lg:text-left">
            <Logo lang={lang} />
          </div>
          <div className="mb-8 text-center lg:col-6 lg:mb-0">
            <div className="flex lg:justify-center">
              <div className="flex items-center mr-4">
                <FaPhone className="mr-2" />
                <span>+(55) 5766-0412</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>servicios@alpescasing.com</span> {/* Replace with your email */}
              </div>
            </div>
          </div>
          <div className="mb-8 text-center lg:col-3 lg:mb-0 lg:mt-0 lg:text-right">
            <Social source={social.main} className="social-icons mt-4 lg:mt-0" />
          </div>
        </div>
      </div>
      <div className="border-t border-border py-7 dark:border-darkmode-border">
        <div className="container text-center text-light dark:text-darkmode-light">
          <p dangerouslySetInnerHTML={markdownify(copyright)} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
