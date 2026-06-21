

export interface PageConfig {
  id: string;
  to: string;
  text: string;
  icon: string;
  subPages?: Record<string, PageConfig>;
}

export const authPages = {
  homePage: {
    id: 'homepage',
    to: '/',
    text: 'Home',
    icon: '',
  },
  shopPage: {
    id: 'shopPage',
    to: '/shop',
    text: 'Shop',
    icon: '',
  },
} satisfies Record<string, PageConfig>;



export const pagesConfig = {...authPages};
export default pagesConfig;