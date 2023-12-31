type ImageFormat = {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  url: string;
  width: number;
}

export interface GenericObject {
  [key: string]: any;
}

export interface ImageFormats {
  large: ImageFormat;
  medium: ImageFormat;
  small: ImageFormat;
  thumbnail: ImageFormat;
}

export interface ImageContent {
  alternativeText: string | null;
  caption: string | null;
  createdAt: string | null;
  ext: string;
  formats: ImageFormats;
  hast: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  size: number;
  updatedAt: string | null;
  url: string;
  width: number;
  id: any;
};

export interface Image {
  data?: ImageContent;
}

export interface Link {
  id: any;
  href: string;
  label: string;
  type?: string;
  aria?: string;
  target?: string;
  variant?: string;
  ariaLabel?: string;
  bgColor?: string | null;
  textColor?: string | null;
}

export interface CustomButtonProps {
  aria: string;
  label: string;
  type?: string;
  variant?: string;
  bgColor?: string;
  texrColor?: string;
  actions?: GenericObject;
}

export interface MetaContent {
  name: string;
  content: any;
}

export interface MetaProps {
  id: any;
  image?: ImageContent;
  structuredData?: any;
  title?: string | null;
  description?: string | null;
  preventIndexing?: boolean | null;
  content?: MetaContent[];
}

export interface HeroProps {
  id: any;
  title?: string;
  Subtitle?: string | null;
  hero?: ImageContent[] | null;
}

export interface HeaderProps {
  id?: any;
  locale?: string;
  variant?: string;
  bgColor?: string;
  textColor?: string;
  Logo?: Image | null;
  NavbarOption?: Link[];
}

export interface FooterProps {
  id?: any;
  locale?: string;
  disclaimerText?: string;
  SocialMediaButton?: Link[];
}

export interface TextBlockProps {
  id: any;
  button?: CustomButtonProps[];
  content?: string | HTMLElement;
}

export interface HomeInfo {
  meta: MetaProps;
  header: HeroProps;
  footer?: FooterProps;
  navbar?: HeaderProps;
  textBlock: TextBlockProps[];
}

export interface MoviesInfo {
  Name?: string;
  Year?: string;
  Slug?: string;
  poster?: ImageContent;
  id: any;
}

export interface PageInfo extends HomeInfo {
  content?: MoviesInfo[];
}

export interface DirectorInfo extends HomeInfo {
  name: string;
  id?: string;
  avatar?: ImageContent;
  movies?: MoviesInfo[];
}

export interface DetailsInfo extends HomeInfo {
  Description: string;
  Name: string;
  Slug: string;
  Year: string;
  createdAt?: string | null;
  poster?: ImageContent | null;
  director?: DirectorInfo;
}

export interface ErrorMessage extends GenericObject {
  status: number;
  message: string;
}
