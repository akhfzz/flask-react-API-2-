import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Profil from './component/js/profil';
import Home from './component/js/home';
import Support from './component/js/suport';

function App(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path='/input' exact component={Profil}/>
        <Route path='/tweet' exact component={Home}/>
        <Route path='/suport' exact component={Support}/>
      </Switch>
    </BrowserRouter>
  )
}
export default App;