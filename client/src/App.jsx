import { Routes, Route } from "react-router-dom"
import { userContext } from "./contexts/user"
import { ArticleProvider } from "./contexts/article"
import { MembersProvider } from "./contexts/members"
import { useEffect, useState } from "react"

import * as utilsService from "./utils/user"

import Login from "./components/login/Login"
import Navigation from "./components/navigation/Nav"
import Register from "./components/register/Register"
import Home from "./components/home/Home"
import Members from "./components/members/Members"
import Logout from "./components/logout/Logout"
import Catalog from "./components/catalog/Catalog"
import Create from "./components/create/Create"
import Details from "./components/details/Details"
import Edit from "./components/edit/Edit"
import RouteGuardPrivate from "./components/common/RouteGuardPrivate"
import RouteGuardPublic from "./components/common/RouteGuardPublic"



function App() {

  const [user, setUser] = useState(() => {
    const savedUser = utilsService.getUserData();
    return savedUser ? savedUser : null;
  });

  const setUserWrapper = (data) => {
    setUser(data)
  }

  useEffect(() => {
    if (user) {
      utilsService.setUserData(user);
    } else {
      utilsService.clearUserData();
    }
  }, [user])


  return (
    <>
      <userContext.Provider value={{ user, setUserWrapper }}>
        <MembersProvider>
          <div id="box">

            <Navigation />

            <main id="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/members" element={<Members />} />
                <Route path='/login' element={<RouteGuardPublic><Login /></RouteGuardPublic>} />
                <Route path='/register' element={<RouteGuardPublic><Register /></RouteGuardPublic>} />
                <Route path='/logout' element={<RouteGuardPrivate><Logout /></RouteGuardPrivate>} />
                <Route path="/catalog/articles" element={<Catalog />} />
                <Route path="/create" element={<RouteGuardPrivate><Create /></RouteGuardPrivate>} />
                <Route path="/articles/:articleID" element={<ArticleProvider>
                  <Details />
                </ArticleProvider>} />
                <Route path="/articles/:articleID/edit" element={<ArticleProvider>
                  <RouteGuardPrivate><Edit /></RouteGuardPrivate>
                </ArticleProvider>} />
              </Routes>
            </main>

          </div>
        </MembersProvider>
      </userContext.Provider>
    </>
  )
}

export default App
