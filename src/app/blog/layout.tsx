import { Navbar } from "@/components/fragments/Navbar"

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="pt-20">
                {children}
            </div>
        </>
    )
}

export default BlogLayout