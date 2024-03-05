import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Contacts from './containers/Contacts/Contacts';
import ContactForm from './components/ContactForm/ContactForm';

const App = () => (
  <>
    <Layout>
      <Routes>
        <Route path="/" element={(<Contacts/>)} />
        <Route path="/new-contact" element={(<ContactForm/>)}/>
        <Route path="/new-contact/:id" element={(<ContactForm/>)}/>
        <Route path="*" element={<h4>Oops! Page not found...</h4>}/>
      </Routes>
    </Layout>
  </>
);

export default App;
