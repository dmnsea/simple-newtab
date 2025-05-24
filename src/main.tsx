import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider as ReduxProvider } from 'react-redux'
import store from './redux/store.ts'
import { HashRouter, Route, Routes } from 'react-router'
import BaseLayout from './components/BaseLayout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <HashRouter>
        <Routes>
          <Route element={<BaseLayout/>}>
            <Route path='/' element={<App/>}/>
          </Route>
        </Routes>
      </HashRouter>
    </ReduxProvider>
  </StrictMode>,
)
