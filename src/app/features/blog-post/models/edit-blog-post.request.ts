export interface EditBlogPostRequest {
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  isVisible: boolean;
  categories: string[];
}
