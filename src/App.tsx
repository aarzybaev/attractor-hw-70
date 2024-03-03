import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';

const App = () => (
  <>
    <Layout>
      <Routes>
        <Route path="/" element={(<></>)}/>
        <Route path="*" element={<h4>Oops! Page not found...</h4>}/>
      </Routes>
    </Layout>
  </>
);

export default App;
