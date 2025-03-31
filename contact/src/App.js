import logo from './logo.svg';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import usePhoneBookStore from "./stores/usePhoneBookStore";
import Grid from '@mui/material/Grid';
// Font Awesome 관련 import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import './App.css';



function App() {


  return (
    <div className="App">

      <h1> <FontAwesomeIcon
        icon={faPhone}
        style={{ color: "green", marginRight: "10px" }}
        size="1x"
      />Call me!</h1>
      <Grid container spacing={2}>
        <Grid size={12}>
          <ContactForm />
          <ContactList />
        </Grid>

      </Grid>


    </div>
  );
}

export default App;
