import { PageWraper, Container } from "@/components/layouts";

const HomePage = () => {
    return (
        <PageWraper name="Home Page" title="Home Page">
            <Container>
                <h1 className="text-2xl font-bold">Home</h1>
            </Container>
        </PageWraper>
    )
}

export default HomePage
