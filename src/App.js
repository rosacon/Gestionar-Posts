import { Routes, Route, BrowserRouter} from 'react-router-dom';
import ListPosts from './components/ListPosts.js';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ListPosts></ListPosts>}></Route>
            

      </Routes>
    </BrowserRouter>
  )
}

export default App;
