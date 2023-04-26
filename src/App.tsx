import React, {FC, ReactElement} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import userManager, {
  loadUser,
  signinRedirect,
  signoutRedirect,
} from './auth/user-service';
import AuthProvider from './auth/auth-provider';
import SigninOidc from './auth/SigninOidc';
import SignoutOidc from './auth/SignoutOidc';
import AdList from './ads/AdsList';
const App: FC<{}> = (): ReactElement => {
  loadUser();
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => signinRedirect()}>Login</button>
        <AuthProvider userManager={userManager}>
          <Router>
            <Routes>
              <Route path='/' Component={AdList}/>
              <Route 
                path='/signout-oidc'
                Component={SignoutOidc}/>
              <Route path='/siginin-odic' Component={SigninOidc}/>
            </Routes>
          </Router>
        </AuthProvider>
      </header>
    </div>
  );
}

export default App;
