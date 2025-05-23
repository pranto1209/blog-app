export interface UpdateBlogPost {
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  publishedDate: Date;
  isVisible: boolean;
  categories: string[];
}
