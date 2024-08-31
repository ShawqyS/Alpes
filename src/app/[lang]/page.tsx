import languages from "@/config/language.json";
import ImageFallback from "@/helpers/ImageFallback";
import { getListPage } from "@/lib/contentParser";
import { getActiveLanguages } from "@/lib/languageParser";
import { markdownify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction";
import SeoMeta from "@/partials/SeoMeta";
import Testimonials from "@/partials/Testimonials";
import { Author, Button, Feature } from "@/types";
import Link from "next/link";
import path from "path";
import { FaCheck } from "react-icons/fa";
import React from "react";
import Image from "next/image";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { ImagesSlider } from "@/components/ui/images-slider";
import { HoverEffect } from "@/components/ui/card-hover-effect";


// remove dynamicParams
export const dynamicParams = false;

// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}

const Home = ({ params }: { params: { lang: string } }) => {
  const lang = params.lang;
  const language = languages.find(
    (language) => language.languageCode === lang,
  )!;
  const homepage = getListPage(
    path.join(language?.contentDir, "homepage/_index.md"),
  );

  const authorIndex: Author = getListPage(
    path.join(language.contentDir, "authors/_index.md"),
  );
  const testimonial = getListPage(
    path.join(language.contentDir, "sections/testimonial.md"),
  );
  const callToAction = getListPage(
    path.join(language.contentDir, "sections/call-to-action.md"),
  );
  const { title1, title2, title3, title4, title5, title6, description1, description2, description3, description4, description5, description6, discover } = authorIndex.frontmatter;
  const { frontmatter } = homepage;
  const {
    banner,
    features,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button };
    features: Feature[];
  } = frontmatter;

  const projects = [
    {
      title: title1,
      description:
        description1,
      link: "https://alpescasing.com/products/diamond",
    },
    {
      title: title2,
      description:
      description2,
      link: "https://alpescasing.com/about",
    },
    {
      title: title3,
      description:
      description3,
      link: "https://alpescasing.com/about",
    },
    {
      title: title4,
      description:
      description4,
      link: "https://alpescasing.com/about",
    },
    {
      title: title5,
      description:
      description5,
      link: "https://alpescasing.com/about",
    },
    {
      title: title6,
      description:
      description6,
      link: "https://alpescasing.com/about",
    },
  ];

  const words = [
    {
      text: "Alpes",
      className: "text-sky-300 dark:text-sky-300",
    },
    {
      text: "Alimentos",
      className: "text-white",
    },
    {
      text: "y",
      className: "text-white",
    },
    {
      text: "Productos",
      className: "text-white",
    },
    {
      text: "Especiales,",
      className: "text-white",
    },
    {
      text: "S.A.",
      className: "text-white",
    },
    {
      text: "de",
      className: "text-white",
    },
    {
      text: "C.V.",
      className: "text-white",
    },
  ];

  const images = [
    "https://jifpak.kallegroup.com/fileadmin/_processed_/a/d/csm_kalle-jifpak-stage-ultra-kote_be630402be.jpg",
    "https://jifpak.kallegroup.com/fileadmin/_processed_/e/c/csm_kalle-jifpak-stage-spice-kote_3aaed585d6.jpg",
    "https://jifpak.kallegroup.com/fileadmin/_processed_/1/a/csm_kalle-jif-pak-stage-schinken_606e49df1d.jpg",
  ];

  return (
    <>
      <SeoMeta />
      <ImagesSlider className="h-[40rem]" images={images}>
        <TypewriterEffect className="z-50" words={words} />
      </ImagesSlider>

      {features.map((feature, index: number) => (
        <section
          key={index}
          className={`section-sm ${index % 2 === 0 && "bg-gradient"}`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div
                className={`mb:md-0 mb-6 md:col-5 ${
                  index % 2 !== 0 && "md:order-2"
                } ml-auto pl-12`}
              >
                <ImageFallback
                  src={feature.image}
                  height={450}
                  width={250}
                  alt={feature.title}
                />
              </div>
              <div
                className={`md:col-7 lg:col-6 ${
                  index % 2 !== 0 && "md:order-1"
                } ml-auto`}
              >
                <h2
                  className="mb-4"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                {feature.button.enable && (
                  <Link
                    className="btn btn-primary mt-5"
                    href={feature.button.link}
                  >
                    {feature.button.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
      <div>
        <h1 className="text-center" dangerouslySetInnerHTML={markdownify(discover)}></h1>
        <div className="max-w-full mx-auto px-8">
          <HoverEffect items={projects} />
        </div>
      </div>
    </>
  );
};

export default Home;
