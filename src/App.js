import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

const QuizCreate = lazy(() => import("./pages/QuizCreate"));
const QuizResult = lazy(() => import("./pages/QuizResult"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<QuizCreate />} />
                    <Route path="/result" element={<QuizResult />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default App;