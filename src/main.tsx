import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import "@fontsource/inter";
import { CssBaseline, CssVarsProvider } from '@mui/joy';
import 'reactflow/dist/style.css';
import { ReactFlowProvider } from 'reactflow';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<CssVarsProvider defaultColorScheme={"dark"}>
			<CssBaseline />
			<ReactFlowProvider>
				<App />
			</ReactFlowProvider>
		</CssVarsProvider>
	</React.StrictMode>,
);