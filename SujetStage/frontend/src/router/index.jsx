import { createBrowserRouter} from "react-router-dom";
/* import App from "../pages/Home"; */
import Articles from "../pages/Articles";
import Categories from "../pages/Categories";
import Layout from "../layouts/layout";
import Departement from "../pages/Departement";
import Fonctionnaire from "../pages/Fonctionnaire";
import Fournisseur from "../pages/Fournisseur";
import Entree from "../pages/Entree";
import Home from "@/pages/Home";
import Sortie from "@/pages/Sortie";


export const router=createBrowserRouter(
    [
        {
            element:<Layout/>,
            children:[
                
                {
                    path:'/Categories',
                    element:<Categories/>
                },
                {
                    path:'/',
                    element:<Home/>
                },
                {
                    path:'/Entrée',
                element:<Entree/>

                },
                {
                    path:'/Sortie',
                element:<Sortie/>

                },
                {
                    path:'/Fournisseur',
                    element:<Fournisseur/>
                },
                {
                    path:'/Fonctionnaire',
                    element:<Fonctionnaire/>
                },
                {
                    path:'/Departement',
                    element:<Departement/>
                },
                {
                    path:'/Articles',
                    element: <Articles/>
                },
                {
                    path:'*',
                    element:<h1 style={{
                        textAlign: "center",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                      }}>Not found</h1>
                }

            ]
           
        }
       
    ]
)