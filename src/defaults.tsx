import { Edge, Node, NodeTypes } from "reactflow";
import NumberNode, { NumberNodeData } from "./nodes/NumberNode";
import CalculatorNode, { CalculatorNodeData } from "./nodes/CalculatorNode";

export const nodeTypes: NodeTypes = {
	number: NumberNode,
	calculator: CalculatorNode
};

export const nodes: Node[] = [
	{
		id: '1',
		type: 'number',
		data: { 
			value: 0
		 } as NumberNodeData,
		position: { x: -250, y: 0 }
	},
	{
		id: '2',
		type: 'calculator',
		// you can also pass a React component as a label
		data: { 
			expression: 'sin(x)',
			inputs: ["a", "b", "c"]
		} as CalculatorNodeData,
		position: { x: 250, y: 0 },
	},
	{
		id: '3',
		type: 'output',
		data: { label: 'Output Node' },
		position: { x: 250, y: 250 },
	},
];

export const edges: Edge[] = [
  // { id: 'e2-3', source: '2', target: '3', animated: true },
];