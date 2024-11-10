import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './Providers/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      </HelmetProvider>
    </QueryClientProvider>
  </AuthProvider>
  ,
)