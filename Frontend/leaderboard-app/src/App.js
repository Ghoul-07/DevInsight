import {Routes, Route} from 'react-router-dom'
import GitHubPage from "./pages/GitHubPage";
import LeetcodePage from "./pages/LeetcodePage";
import CombinedPage from './pages/CombinedPage';


function App() {
    return(
        <Routes>
          <Route path='/' element={<GitHubPage />} />
          <Route path='/leetcode/' element={<LeetcodePage />} />
          <Route path='/combined' element={<CombinedPage />} />
        </Routes>
    )
}

export default App;
