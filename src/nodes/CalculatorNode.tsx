import { Card, CardContent, CardCover, CardOverflow, Divider, IconButton, Input, Stack, useTheme } from "@mui/joy";
import { Handle, NodeProps, Position, getConnectedEdges, getIncomers, useUpdateNodeInternals } from "reactflow";
import { useStore } from "../store";
import { Close } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { OutputType, useCalculator } from "../../lib/main";
import { string } from 'mathjs';

export type CalculatorNodeData = {
	expression: string;
	inputs: string[];
	value: OutputType;
}

// export type NumberNode = Node<NumberNodeData>;

export default function CalculatorNode({ data, id }: NodeProps<CalculatorNodeData>) {
	const [ inputValue, setInputValue ] = useState(data.expression);

	const updateNodeInternals = useUpdateNodeInternals();
	const { nodes, edges, setNodes, setNodeData  } = useStore((state) => ({ nodes: state.nodes, edges: state.edges, setNodes: state.setNodes, setNodeData: state.setNodeData }));
	
	const calculator = useCalculator(data.expression, Object.fromEntries(getConnectedEdges(getIncomers( nodes.find(v => v.id === id)!, nodes, edges ), edges).filter(v => v.targetHandle ? (data.inputs.indexOf(v.targetHandle?.split('-').slice(1).join('-')) !== -1 ? true : false) : false).map(v => [v.targetHandle?.split('-').slice(1).join('-'), v.sourceNode?.data.value])))

	useEffect(() => {
			setNodeData(id, {...data, value: calculator.value})
	}, [calculator.value]);

	const theme = useTheme();
	useEffect(() => {
		updateNodeInternals(id);
	}, [data.inputs, updateNodeInternals, id]);
	return (
		<>
			<Card sx={{ gap: '0' }}>
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
				<CardOverflow sx={{ padding: '0', display: 'flex', flexDirection: 'row', alignItems: 'start' }}>
					<Stack className="nodrag" sx={{ marginRight: '16px', width: 'fit-content !important', height: 'fit-content !important', justifyContent: 'space-evenly !important', paddingTop: '10px', paddingBottom: '10px' }} display={'flex'} gap={'4px'} direction="column">
						{
							data.inputs.map((v, i) => {
								return <Stack key={i} direction="row" alignItems={'center'}>
									<Handle id={`input-${v}`} type="source" position={Position.Left} style={{ position: 'unset', transform: 'translate(-50%, 0)', border: `1px solid ${theme.palette.neutral.outlinedColor}`, background: theme.palette.neutral.outlinedActiveBg }} />
									<span style={{ position: 'relative', left: '12px' }}>{v}</span>
								</Stack>
							})
						}
					</Stack>
					<CardContent sx={{ padding: '16px' }}>
						<Stack direction="column">
							<Input
								className="nodrag"
								value={inputValue}
								onChange={(event) => {
									setInputValue(event.target.value);
									setNodeData(id, { ...data, expression: event.target.value });
								}}
							/>
							{/* @ts-expect-error */}
							{calculator.value ? string(calculator.value) : 'undefined'}
						</Stack>
					</CardContent>
				</CardOverflow>
				{/* <CardCover sx={{ height: '100%', minHeight: '100%' }}> */}
				{/* </CardCover> */}
			</Card>
			<Handle id="output" type="target" position={Position.Right} style={{ marginTop: '16px', right: '-2.5px', border: `1px solid ${theme.palette.neutral.outlinedColor}`, background: theme.palette.neutral.outlinedActiveBg }} />

		</>
	);
}