import AuthorCard from "@/components/AuthorCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getActiveLanguages, getLanguageObj } from "@/lib/languageParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { Author } from "@/types";
import path from "path";

const Authors = ({ params }: { params: { lang: string } }) => {
  const language = getLanguageObj(params.lang);
  const authorIndex: Author = getListPage(
    path.join(language.contentDir, "authors/_index.md"),
  );
  const authors: Author[] = getSinglePage(
    path.join(language.contentDir, "authors"),
  );
  const { title, meta_title, description, image, title1, title2, title3, title4, title5, title6, description1, description2, description3, description4, description5, description6 } = authorIndex.frontmatter;

  const projects = [
    {
      title: title1,
      description:
        description1,
      link: "https://alpescasing.com/about",
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
  
  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title}>
      </PageHeader>
      <div className="max-w-full mx-auto px-8">
        <HoverEffect items={projects} />
      </div>
    </>
  );
};

export default Authors;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}
