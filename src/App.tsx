import { useTheme } from '@mui/joy';
import ReactFlow, { Background } from 'reactflow';

export default function App() {
	const theme = useTheme();
	
  return (
    <ReactFlow
			style={{ backgroundColor: theme.palette.background.body }} proOptions={{hideAttribution: true}}
      fitView
    >
			<Background color={theme.palette.text.primary}/>
		</ReactFlow>
  );
}