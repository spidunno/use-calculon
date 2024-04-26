import { Card, CardContent, CardCover, CardOverflow, Divider, IconButton, Input, Stack, useTheme } from "@mui/joy";
import { Handle, NodeProps, Position, useUpdateNodeInternals } from "reactflow";
import { useStore } from "../store";
import { Close } from "@mui/icons-material";
import { useEffect } from "react";
import { useCalculator } from "../../lib/main";

export type CalculatorNodeData = {
	expression: string;
	inputs: string[]
}

// export type NumberNode = Node<NumberNodeData>;

export default function CalculatorNode({ data, id }: NodeProps<CalculatorNodeData>) {
	const calculatorValue = useCalculator(data.expression, data.inputs ? Object.fromEntries(data.inputs.map((v, i) => [v, 5])) : undefined)

	const updateNodeInternals = useUpdateNodeInternals();
	const { nodes, setNodes, setNodeData } = useStore((state) => ({ nodes: state.nodes, setNodes: state.setNodes, setNodeData: state.setNodeData }));
	const theme = useTheme();
	useEffect(() => {
		updateNodeInternals(id);
	}, [data.inputs, updateNodeInternals, id]);
	return (
		<>
			<Card>
				<CardOverflow color="primary" variant="soft">
					<CardContent orientation="horizontal" sx={{ margin: '0', padding: '0', marginRight: '-16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						Calculator
						<IconButton size="sm" color="danger" variant="plain" onClick={() => {
							setNodes(nodes.filter(node => node.id !== id))
						}}><Close /></IconButton>
					</CardContent>
					<Divider inset="context" />
				</CardOverflow>
				{/* {data.value} */}
				<CardContent>
				<Input
					className="nodrag"
					value={data.expression}
					onChange={(event) => setNodeData(id, { ...data, expression: event.target.value })}
				/>
				</CardContent>
				<CardCover>
				<Stack className="nodrag" sx={{position: 'relative', width: 'fit-content !important', height: 'fit-content !important', minHeight: '100%', justifyContent: 'space-around !important', paddingTop: '32px !important'}} display={'flex'} direction="column">
					{
						data.inputs.map((v, i) => {
							return <Handle key={i} id={`input-${i}${v}`} type="source" position={Position.Left} style={{ position: 'unset', transform: 'translate(-50%, 0)', border: `1px solid ${theme.palette.neutral.outlinedColor}`, background: theme.palette.neutral.outlinedActiveBg }} />
						})
					}
				</Stack>
				</CardCover>
			</Card>
			<Handle id="output" type="target" position={Position.Right} style={{ marginTop: '16px', right: '-2.5px', border: `1px solid ${theme.palette.neutral.outlinedColor}`, background: theme.palette.neutral.outlinedActiveBg }} />

		</>
	);
}