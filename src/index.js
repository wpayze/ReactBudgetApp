import React from 'react';
import { createRoot } from 'react-dom/client';

import App from "./App";
import { BudgetsProvider } from './contexts/BudgetsContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <BudgetsProvider>
        <App />
    </BudgetsProvider>
);