import { Card, CardContent, CardOverflow, Divider, IconButton, Input, useTheme } from "@mui/joy";
import { Handle, NodeProps, Position, useUpdateNodeInternals } from "reactflow";
import { useStore } from "../store";
import { Close } from "@mui/icons-material";
import { useEffect } from "react";


export type NumberNodeData = {
	value: number;
}

// export type NumberNode = Node<NumberNodeData>;

export default function NumberNode({ data, id }: NodeProps<NumberNodeData>) {
	const { nodes, setNodes, setNodeData } = useStore((state) => ({ nodes: state.nodes, setNodes: state.setNodes, setNodeData: state.setNodeData }));
	const theme = useTheme();
	const updateNodeInternals = useUpdateNodeInternals();
	
	// useEffect(() => {
	// 	updateNodeInternals(id);
	// }, [updateNodeInternals, id])

	return (
		<>
			<Card>
				<CardOverflow color="primary" variant="soft">
					<CardContent orientation="horizontal" sx={{ margin: '0', padding: '0', marginRight: '-16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						Number
						<IconButton size="sm" color="danger" variant="plain" onClick={() => {
							setNodes(nodes.filter(node => node.id !== id))
						}}><Close /></IconButton>
					</CardContent>
					<Divider inset="context" />
				</CardOverflow>
				{/* {data.value} */}
				<Input
					className="nodrag"
					value={data.value}
					onChange={(event) => setNodeData(id, { value: event.target.value })}
					type="number"
				/>
			</Card>
			<Handle id="output" type="target" position={Position.Right} style={{marginTop: '16px', right: '-2.5px', border: `1px solid ${theme.palette.neutral.outlinedColor}`, background: theme.palette.neutral.outlinedActiveBg}} />
		</>
	);
}