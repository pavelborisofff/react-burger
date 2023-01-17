import { useState, createContext } from 'react';
import Header from './header';


interface IContext {
  state: {
    header?: string;
  };
  setState: ({}) => void;
}

const initContext:IContext = {
  state: {
    header: 'header',
  },
  setState: () => {}
}

export const Context = createContext<IContext>(initContext);


function App() {
  const [state, setState] = useState(initContext.state);

  return (
    <Context.Provider value={{ state, setState }}>
      <Header />
    </Context.Provider>
  );
}

export default App;