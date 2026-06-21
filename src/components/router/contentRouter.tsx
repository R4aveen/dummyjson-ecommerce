import { Route, Routes } from "react-router-dom"
import { contentRoutes } from "@/routes/contentRoutes"


export const ContentRouter = () => {
    return (
        <Routes>
            {contentRoutes.map((routeProps) =>(
                <Route key={routeProps.path} {...routeProps}/>    
            ))}
        </Routes>
    )
}