import { Button, Card } from "@/components/ui";
import { PageWraper, Container } from "@/components/layouts";
import { useState } from "react";

const HomePage = () => {

    const [count, setCount] = useState<number>(0);

    return (
        <>
            <Container size="full" className="p-0 mb-4">
                <img 
                    src="https://www.heropay.eu/blog-images/603413080/ecommerce-marketplace-hero.webp" 
                    alt="Hero Home" 
                    className="w-full h-[65vh] object-cover mask-b-from-orange-500" 
                />
                <div className="absolute inset-0 flex items-center justify-center text-white rounded-lg">
                    <h1 className="text-5xl font-bold text-black dark:text-white drop-shadow-2xl">Tiki Store</h1>
                </div>
            </Container>
            <PageWraper name="Home Page" title="Home Page">
                <Container>

                    <h1 className="text-2xl font-bold mb-4">Home</h1>
                    <Card className="p-4">
                        <h2 className="text-xl font-bold mb-2">Counter</h2>
                        <p>Current Count: {count}</p>
                        <Button onClick={() => setCount(count + 1)}>Increment</Button>
                        <img src="https://picsum.photos/300/200" alt="Demo" className="mt-2 rounded-base object-cover" />
                    </Card>
                </Container>

            </PageWraper>
        </>
    )
}

export default HomePage
