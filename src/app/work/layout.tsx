import { Footer } from "@/components/fragments/Footer"
import { Navbar } from "@/components/fragments/Navbar"

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="pt-20">
                {children}
            </div>
         </>
    )
}

export default ProjectLayout