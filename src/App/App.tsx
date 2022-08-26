import './App.scss'
import { Header } from './Header/Header'
import Books from './book/Books'

import '@elastic/eui/dist/eui_theme_light.css';
import { EuiProvider } from '@elastic/eui';
import BookDropdown from './book/Dropdown';

export function App() {
  return (
    <div className="App">
      <Header />
      <EuiProvider colorMode="light">
      <div className="App-layout">
        <BookDropdown />
        <Books/>
      </div>
        </EuiProvider>
    </div>
  )
}
