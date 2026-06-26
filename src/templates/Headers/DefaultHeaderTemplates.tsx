import pagesConfig from "@/config/page.config";
import Header, { HeaderContent, HeaderLeft, HeaderRight, HeaderLink } from "@/components/layouts/Header/Header";
import { ThemeToggle } from "@/components/ui";

const DefaultHeaderTemplates = () => {
  return (
    <Header className="flex-wrap md:flex-nowrap">
        <HeaderLeft className="w-full md:w-auto">
            <p className="font-bold text-primary">Logo</p>
        </HeaderLeft>
        <HeaderContent className="w-full md:w-auto flex gap-4">
            <HeaderLink to={pagesConfig.homePage.to} id={pagesConfig.homePage.id}>
                {pagesConfig.homePage.text}
            </HeaderLink>

            <HeaderLink to={pagesConfig.shopPage.to} id={pagesConfig.shopPage.id}>
                {pagesConfig.shopPage.text}
            </HeaderLink>
        </HeaderContent>
        <HeaderRight className="w-full md:w-auto">
            <ThemeToggle />
            <p>User</p>
        </HeaderRight>
    </Header>
  )
}

export default DefaultHeaderTemplates;
