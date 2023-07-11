import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Formulario } from "../pages/Formulario"
import { HomeV2 } from "../pages/HomeV2"


export const AppRouter = () => {
  return (
    <>
        <Routes >
            <Route path="home" element={<HomeV2 />}/>
            <Route path="form" element={<Formulario />} />
            <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
    </>
  )
}
