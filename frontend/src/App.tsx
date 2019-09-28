import React from 'react'
import { Routes } from './routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Navigation } from './components/Navigation'

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Navigation />
        <Routes />
      </Container>
    </Router>
  )
}

export default App
