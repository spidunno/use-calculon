import { Connection, Edge, EdgeChange, Node, NodeChange, NodeTypes, addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import { create } from 'zustand';
import { edges, nodes } from './defaults';

type Store = {
	nodes: Node[],
	edges: Edge[],
	// nodeTypes: NodeTypes,
	setNodes: (nodes: Node[]) => void,
	setEdges: (edges: Edge[]) => void,
	setNodeData: (id: string, data: unknown) => void,
	// setNodeData: (id: string, data: unknown) => void,
	onNodesChange: (changes: NodeChange[]) => void,
	onEdgesChange: (changes: EdgeChange[]) => void,
	onConnect: (connection: Connection) => void
}

export const useStore = create<Store>((set) => ({
	nodes,
	edges,
	// nodeTypes,
	setNodes: (nodes: Node[]) => set({ nodes }),
	setEdges: (edges: Edge[]) => set({ edges }),
	setNodeData: (id: string, data: unknown) => set((state) => ({ nodes: state.nodes.map((n) => {if (n.id === id) n.data = data; return n}) })),
	// setNodeData: (id: string, data: unknown) => set((state) => {
	// 	const nodeIndex = state.nodes.findIndex((value) => value.id === id);
	// 	if (typeof nodeIndex === 'undefined') return {};

	// 	const newNodes = [...state.nodes];
	// 	newNodes[nodeIndex].data = Object.assign(newNodes[nodeIndex].data, data);

	// 	return { nodes: newNodes };
	// }),
	onNodesChange: (changes: NodeChange[]) => set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) })),
	onEdgesChange: (changes: EdgeChange[]) => set((state) => ({ edges: applyEdgeChanges(changes, state.edges) })),
	onConnect: (connection: Connection) => set((state) => ({ edges: addEdge(connection, state.edges) })),
}));