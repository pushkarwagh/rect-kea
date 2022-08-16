import React from 'react'
import './App.scss'
import { Header } from './Header/Header'
import { DemoForm } from './DemoForm/DemoForm'
import Counter from './Counter/Counter'
import Books from './book/Books'

import '@elastic/eui/dist/eui_theme_light.css';
import { EuiProvider } from '@elastic/eui';

export function App() {
  return (
    <div className="App">
      <Header />
      <EuiProvider colorMode="light">
      <div className="App-layout">
        <Books/>
      </div>
        </EuiProvider>
    </div>
  )
}
