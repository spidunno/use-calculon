import { Edge, Node, NodeTypes } from "reactflow";
import NumberNode, { NumberNodeData } from "./nodes/NumberNode";

export const nodeTypes: NodeTypes = {
	number: NumberNode
};

export const nodes: Node[] = [
	{
		id: '1',
		type: 'number',
		data: { 
			value: 0
		 } as NumberNodeData,
		position: { x: 250, y: 25 }
	},
	{
		id: '2',
		// you can also pass a React component as a label
		data: { label: <div>Default Node</div> },
		position: { x: 100, y: 125 },
	},
	{
		id: '3',
		type: 'output',
		data: { label: 'Output Node' },
		position: { x: 250, y: 250 },
	},
];

export const edges: Edge[] = [
  { id: 'e2-3', source: '2', target: '3', animated: true },
];