import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import Header from './components/Header';

import Progress from './components/Progress';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const MarketingApp = lazy(() => import('./components/MarketingApp'));
const AuthApp = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);



  return (
    <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
          <Suspense fallback={ <Progress/> }>
            <Switch>
              <Route path="/auth">
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/" component={MarketingApp} />
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};
