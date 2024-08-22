import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ChickenDetail from './component/ChickenDetail';
import MainRouter from './MainRouter';

function App () {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainRouter />} />
                <Route path='/chicken-detail/:id' element={<ChickenDetail />} />
            </Routes>
        </Router>
    )
}

export default App;