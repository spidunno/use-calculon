import { Button, Card, CardContent, CardOverflow, Divider, IconButton, Input, Typography } from "@mui/joy";
import { Node, NodeProps } from "reactflow";
import { useStore } from "../store";
import { Close } from "@mui/icons-material";

export type NumberNodeData = {
	value: number;
}

// export type NumberNode = Node<NumberNodeData>;

export default function NumberNode({ data, id }: NodeProps<NumberNodeData>) { 
	const { nodes, setNodes } = useStore((state) => ({ nodes: state.nodes, setNodes: state.setNodes }));

	return (
		<Card>
			<CardOverflow color="primary" variant="soft">
				<CardContent orientation="horizontal" sx={{ margin: '0', padding: '0', marginRight: '-16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					Number
					<IconButton size="sm" color="danger" variant="plain" onClick={() => {
						setNodes(nodes.filter(node => node.id !== id))
					}}><Close/></IconButton>
				</CardContent>
				<Divider inset="context"/>
			</CardOverflow>
			{/* {data.value} */}
			<Input
				className="nodrag"
				value={data.value}
				type="number"
			/>
		</Card>
	);
}