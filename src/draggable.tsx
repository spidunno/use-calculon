import { PropsWithChildren, useState } from "react";

export default function Draggable(props: PropsWithChildren<{x?: number, y?: number}>) {
	const [ x, setX ] = useState(props.x);
	const [ y, setY ] = useState(props.y);
	
	return (
		<div style={{ minWidth: '150px', backgroundColor: '#303030', padding: '12px', display: 'flex', justifyContent: 'center', transform: `translate(${x}px, ${y}px)` }}>
			{props.children}
		</div>
	)
}