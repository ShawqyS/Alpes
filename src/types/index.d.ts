export type RegularPage = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
  };
  content: string;
  slug?: string;
};

export type Post = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: string[];
    author: string;
    tags: string[];
    date?: string;
    draft?: boolean;
    size1: string;
    size2: string;
    size3: string;
    size4: string;
    size5: string;
    dinches1: string;
    dinches2: string;
    dinches3: string;
    dinches4: string;
    dinches5: string;
    cinches1: string;
    cinches2: string;
    cinches3: string;
    cinches4: string;
    cinches5: string;
    dmm1: string;
    dmm2: string;
    dmm3: string;
    dmm4: string;
    dmm5: string;
    cmm1: string;
    cmm2: string;
    cmm3: string;
    cmm4: string;
    cmm5: string;
  };

  slug?: string;
  content?: string;
};

export type Author = {
  frontmatter: {
    title: string;
    title1: string;
    title2: string;
    title3: string;
    title4: string;
    title5: string;
    title6: string;
    discover: string;
    description1: string;
    description2: string;
    description3: string;
    description4: string;
    description5: string;
    description6: string;
    image?: string;
    description?: string;
    meta_title?: string;
    social: [
      {
        name: string;
        icon: string;
        link: string;
      },
    ];
  };
  content?: string;
  slug?: string;
};

export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  content: string;
};

export type Call_to_action = {
  enable?: boolean;
  title: string;
  description: string;
  image: string;
  button: Button;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

export interface IChildNavigationLink {
  name: string;
  url: string;
}

export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}
