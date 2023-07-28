import { Navigate, Route, Routes } from "react-router-dom"

import { HomeV2 } from "../pages/HomeV2"



export const AppRouter = () => {
  return (
    <>
      <Routes >
        <Route path="home" element={<HomeV2 />} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </>
  )
}
