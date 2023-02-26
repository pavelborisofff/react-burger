import useIngredients from '../../hooks/api';
import Header from "../header/header";
import Main from "../main/main";

import "./app.module.scss";

function App() {
  useIngredients();
  
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
