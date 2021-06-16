import './Node.css'

const Node = (props) => {
	const {row, col, isWall, isStart, isEnd} = props.node;
	const {onMouseDown, onMouseEnter, onMouseUp} = props;

	const extraClasses = isStart ? 'node-start' : isEnd ? 'node-end' : isWall ? 'node-wall' : '';
	
	return ( 
		<div
			id={`node-${row}-${col}`}
			className={`node ${extraClasses}`} 
			onMouseDown = {() => onMouseDown(row, col)}
			onMouseEnter= {() => onMouseEnter(row, col)}
			onMouseUp= {() => onMouseUp()}
		></div>
	);
}
 
export default Node;