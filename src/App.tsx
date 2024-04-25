import { useRef, useState } from "react";
import { useCalculator } from "../lib/main";
import { string } from "mathjs";
import 'reactflow/dist/style.css';
import Draggable from "./draggable";

export default function App() {
	const divRef = useRef<HTMLDivElement>(null);

	const [ x, setX ] = useState(0);
	const [ y, setY ] = useState(0);
	const [ zoom, setZoom ] = useState(1);
	const [panning, setPanning] = useState(false);


	const [ slider, setSlider ] = useState(0);
  const value = useCalculator('sin(x)', { 
		x: slider
	});
	const otherValue = useCalculator('asin(x)', {
		x: value
	});

	return (
    <div ref={divRef} 
		onWheel={(ev) => {
			// if (ev.target !== divRef.current) return;
			// ev.preventDefault();
			// console.log(ev.deltaY);
			const scalechange = (zoom * ( Math.sign(ev.deltaY) === -1 ? 1.25 : 0.8)) - zoom;
			const zoomPointX = ev.clientX - x;
			const zoomPointY = ev.clientY - y;

			setZoom(zoom * ( Math.sign(ev.deltaY) === -1 ? 1.25 : 0.8));
			console.log(scalechange, zoomPointX, zoomPointY);

			setX(x + (zoomPointX * -scalechange));
			setY(y + (zoomPointY * -scalechange));
		}}
		onPointerMove={(ev) => {
			// if (ev.target !== ev.currentTarget) return;
			if (!panning) return;
			ev.preventDefault();
			setX(x + ev.movementX);
			setY(y + ev.movementY);
		}}
		onPointerDown={(ev) => {
			if (ev.target !== divRef.current) return;
			ev.preventDefault();
			setPanning(true);
			(ev.target as HTMLDivElement).setPointerCapture(ev.pointerId);
		}} 
		onPointerUp={(ev) => {
			// if (ev.target !== ev.currentTarget) return;
			ev.preventDefault();
			setPanning(false);
			(ev.target as HTMLDivElement).releasePointerCapture(ev.pointerId);
		}}
		id="canvas" style={{ overflow: 'hidden', width: '100%', height: '100%', backgroundPosition: `top ${y}px left ${x}px`, backgroundSize: `calc(100px * ${zoom}) calc(100px * ${zoom})`, backgroundColor: 'var(--background)', backgroundImage: 'radial-gradient(circle, var(--foreground) 2px, var(--background) 2px)' }}>
			<div id="items" style={{ pointerEvents: 'none', width: '0px', height: '0px', transform: `translate(${x}px, ${y}px) scale(${zoom})` }}>
				<Draggable>
					test
				</Draggable>
			</div>
    </div>
  );
}