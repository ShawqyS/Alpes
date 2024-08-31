import BlogCard from "@/components/BlogCard";
import Disqus from "@/components/Disqus";
import Share from "@/components/Share";
import { LampContainer } from "@/components/ui/lamp";
import config from "@/config/config.json";
import ImageFallback from "@/helpers/ImageFallback";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import {
  getActiveLanguages,
  getLanguageObj,
  getTranslations,
} from "@/lib/languageParser";
import dateFormat from "@/lib/utils/dateFormat";
import similarItems from "@/lib/utils/similarItems";
import { humanize, markdownify, slugify } from "@/lib/utils/textConverter";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import path from "path";
import { FaRegClock, FaRegFolder, FaRegUserCircle } from "react-icons/fa";

const { blog_folder } = config.settings;

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Size', minWidth: 170 },
  { id: 'code', label: 'Inches', minWidth: 100 },
  {
    id: 'population',
    label: 'MM',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'size',
    label: 'Inches',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'density',
    label: 'MM',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  name: string;
  code: string;
  population: string;
  size: string;
  density: string;
}

function createData(
  name: string,
  code: string,
  population: string,
  size: string,
  density: string,
): Data {
  return { name, code, population, size, density };
}

const PostSingle = async ({
  params,
}: {
  params: { single: string; lang: string };
}) => {
  const language = getLanguageObj(params.lang);
  const {
    related_post,
    share: shareTitle,
    tags: tagTitle,
  } = await getTranslations(params.lang);
  const posts: Post[] = getSinglePage(
    path.join(language.contentDir, blog_folder),
  );
  const post = posts.filter((page) => page.slug === params.single)[0];

  const { frontmatter, content } = post;
  const {
    title,
    meta_title,
    description,
    image,
    author,
    categories,
    date,
    size1,
    size2,
    size3,
    size4,
    size5,
    dinches1,
    dinches2,
    dinches3,
    dinches4,
    dinches5,
    dmm1,
    dmm2,
    dmm3,
    dmm4,
    dmm5,
    cinches1,
    cinches2,
    cinches3,
    cinches4,
    cinches5,
    cmm1,
    cmm2,
    cmm3,
    cmm4,
    cmm5,
    tags,
  } = frontmatter;
  const similarPosts = similarItems(post, posts, post.slug!);

  const rows = [
    createData(size1, dinches1, dmm1, cinches1, cmm1),
    createData(size2, dinches2, dmm2 , cinches2, cmm2),
    createData(size3, dinches3, dmm3 , cinches3, cmm3),
    createData(size4, dinches4, dmm4 , cinches4, cmm4),
    createData(size5, dinches5, dmm5 , cinches5, cmm5),
  ];

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <section className="section pt-7">
        <div className="container">
          <div className="row justify-center">
            <article className="lg:col-10">
              {image && (
                <div className="mb-10">
                  <ImageFallback
                    src={image}
                    height={500}
                    width={1200}
                    alt={title}
                    className="w-full rounded"
                  />
                </div>
              )}
              <h1
                dangerouslySetInnerHTML={markdownify(title)}
                className="h2 mb-4"
              />
              <div className="content mb-10">
                <MDXContent content={content} />
              </div>
              <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colSpan={2}>
                          Diameter
                        </TableCell>
                        <TableCell align="center" colSpan={3}>
                          Circumference
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ top: 57, minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .map((row) => {
                          return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                              {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostSingle;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => {
  single: string;
  lang: string;
}[] = () => {
  const slugs = getActiveLanguages().map((language) => {
    const posts: Post[] = getSinglePage(
      path.join(language.contentDir, blog_folder),
    );
    return posts.map(({ slug }) => ({
      single: slug!,
      lang: language.languageCode,
    }));
  });

  return slugs.flat();
};
