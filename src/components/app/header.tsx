import { useContext } from 'react';
import { Context } from './app';


function Header() {
  const { state, setState } = useContext(Context);
  
  const handleSubmit = (e: React.SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault();    
    setState({header: e.currentTarget.value});
  };

  return (
    <>
      <h1>current state: {state.header}</h1>
      <input type="text" onChange={handleSubmit}/>
    </>
  )
}

export default Header;

