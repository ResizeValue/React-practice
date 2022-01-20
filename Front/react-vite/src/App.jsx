import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'
import Header from './Components/Header'
import Create from './Pages/Create'
import Edit from './Pages/Edit'
import Details from './Pages/Details'
import Products from './Pages/Products'
import Footer from './Components/Footer'

function App() {
  return (
    <BrowserRouter>
        <Header></Header>
        <main className="flex flex-1 container mx-auto min-h-screen">
        <Switch>
          <Route path="/" exact>
            <Products/>
          </Route>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/add">
            <Create />
          </Route>
          <Route path="/edit/:id">
            <Edit />
          </Route>
        </Switch>
        </main>
        <Footer></Footer>
    </BrowserRouter>
  )
}


export default App
