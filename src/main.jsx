import { App } from './App'
import { NextUIProvider } from '@nextui-org/react'
import { AnimatePresence } from 'framer-motion'
import ReactDOM from 'react-dom/client'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AnimatePresence>
    <NextUIProvider>
      <App/>
    </NextUIProvider>
  </AnimatePresence>

)
