import {Routes, Route} from 'react-router-dom'
import GitHubPage from "./pages/GitHubPage";
import LeetcodePage from "./pages/LeetcodePage";

function App() {
    return(
        <Routes>
          <Route path='/' element={<GitHubPage />} />
          <Route path='/leetcode/' element={<LeetcodePage />} />
        </Routes>
    )
}

export default App;
