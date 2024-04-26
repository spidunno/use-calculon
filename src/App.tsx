import { useTheme } from '@mui/joy';
import ReactFlow, { Background } from 'reactflow';
import { useStore } from './store';
import { useMemo } from 'react';
import { nodeTypes } from './defaults';

export default function App() {
	const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();
	const theme = useTheme();
	
  return (
    <ReactFlow
			nodes={nodes}
			edges={edges}
			nodeTypes={nodeTypes}
			onNodesChange={onNodesChange}
			isValidConnection={(connection) => {
				return connection.source !== connection.target;
			}}
			onEdgesChange={onEdgesChange}
			onConnect={onConnect}
			style={{ backgroundColor: theme.palette.background.body }} proOptions={{hideAttribution: true}}
      fitView
    >
			<Background color={theme.palette.text.primary}/>
		</ReactFlow>
  );
}