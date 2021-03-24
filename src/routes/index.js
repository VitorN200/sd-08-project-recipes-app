import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Comidas from '../pages/Comidas';
import ProfilePage from '../pages/PerfilPágina';
import Bebidas from '../pages/Bebidas';
import Explore from '../pages/Explorar';
import Detalhes from '../pages/Detalhes';
import Ingredientes from '../pages/Ingredientes';
import FeitasFavoritas from '../pages/FeitasFavoritas';
import ExplorarTudo from '../pages/ExplorarTudo';
import ExplorarArea from '../pages/ExplorarArea';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={ Login } />
    <Route exact path="/comidas" component={ Comidas } />
    <Route exact path="/comidas/:id/in-progress" component={ Detalhes } />
    <Route exact path="/comidas/:id" component={ Detalhes } />
    <Route exact path="/bebidas" component={ Bebidas } />
    <Route exact path="/bebidas/:id/in-progress" component={ Detalhes } />
    <Route exact path="/bebidas/:id" component={ Detalhes } />
    <Route exact path="/explorar" component={ Explore } />
    <Route exact path="/explorar/comidas" component={ ExplorarTudo } />
    <Route exact path="/explorar/bebidas" component={ ExplorarTudo } />
    <Route exact path="/explorar/comidas/ingredientes" component={ Ingredientes } />
    <Route exact path="/explorar/comidas/area" component={ ExplorarArea } />
    <Route exact path="/explorar/bebidas/ingredientes" component={ Ingredientes } />
    <Route exact path="/perfil" component={ ProfilePage } />
    <Route exact path="/receitas-feitas" component={ FeitasFavoritas } />
    <Route exact path="/receitas-favoritas" component={ FeitasFavoritas } />
  </Switch>
);

export default Routes;
