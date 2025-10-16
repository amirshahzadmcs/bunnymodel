import { getPageData } from "@/lib/fetchPage";

export async function generateMetadata() {
    const data = await getPageData("home");
    return {
        title: data.meta_title || "Home - Arham Tour Dubai",
        description: data.meta_description || "Explore Dubai with Arham Tour",
    };
}

export default async function HomePage() {
    const pageData = await getPageData("home");

    return (
        <div>
            <h1>{pageData.title}</h1>
            <p>{pageData.description}</p>
            <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
        </div>
    );
}
