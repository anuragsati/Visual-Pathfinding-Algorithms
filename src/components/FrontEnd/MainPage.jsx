import React, { useState, useEffect} from 'react';
import Node from './Node'
import './MainPage.css'
import logo from './logo.svg'
import BFS from '../Algorithms/BFS'


//constants
const START_NODE = [10, 4];
const END_NODE =  [15, 45];
const windowWidth =  Math.floor(window.innerWidth/22);
const windowHeight =  Math.floor((window.innerHeight - 150)/21);


const MainPage = () => {
	//Hooks
	let [grid, setGrid] = useState([]);
	let [mousePressed, setMousePressed] = useState(false);

	//when our page first mounts
	useEffect(() => {
		let initialGrid = getInitialGrid();
		setGrid(initialGrid);
	}, []);


	// =========== Additional Functions =============

	//Creates Inital grid
	const getInitialGrid = () => {          
		const initialGrid= [];
		for (let row = 0; row < windowHeight; row++) {
			const currentRow = [];
			for (let col = 0; col < windowWidth; col++) {
				currentRow.push(createNode(row,col));
			}
			initialGrid.push(currentRow);
		}

		return initialGrid;
	};


	//Creates the node template
	const createNode = (row, col) => {
		const newNode = {
			row,
			col,
			isVisited : false,
			isWall : false,
			prevNode : null,
			isStart : (row===START_NODE[0]) && (col===START_NODE[1]),
			isEnd : (row===END_NODE[0]) && (col===END_NODE[1]),
		}

		return newNode;
	}


	//resets everything
	const resetAll = () => {
		setGrid(getInitialGrid()); //reset grid and properties to initialGrid 

		for (let row = 0; row < windowHeight; row++) {
			for (let col = 0; col < windowWidth; col++) {
				document.getElementById(`node-${row}-${col}`).className = "node"
			}
		}

		document.getElementById(`node-${START_NODE[0]}-${START_NODE[1]}`).className = "node node-start";
		document.getElementById(`node-${END_NODE[0]}-${END_NODE[1]}`).className = "node node-end";
	}


	//resets everything but keep walls
	const resetAllExceptWalls = () => {

		for (let row = 0; row < windowHeight; row++) {	
			for (let col = 0; col < windowWidth; col++) {
				//if current node is not a wall then reset all classes & if it is not a wall then do nothing i.e node-wall class will remain
				if(!grid[row][col].isWall){	
					document.getElementById(`node-${row}-${col}`).className = "node"
				}
				grid[row][col].isVisited = false;
				grid[row][col].prevNode = null;
			}
		}

		document.getElementById(`node-${START_NODE[0]}-${START_NODE[1]}`).className = "node node-start";
		document.getElementById(`node-${END_NODE[0]}-${END_NODE[1]}`).className = "node node-end";

		setGrid(grid);
	}


	//===========Mouse events to draw walls
	const handleMouseDown = (row, col) => {
		grid[row][col].isWall = !grid[row][col].isWall;
		setGrid(grid);
		setMousePressed(true);
	}

	const handleMouseEnter = (row, col) => {
		if(!mousePressed)
			return;


		//temporary solution to late rendering elements
		let allClasses = document.getElementById(`node-${row}-${col}`).className.split(" ");
		if(allClasses.includes('node-wall')){
			const idx = allClasses.indexOf('node-wall');
			allClasses.splice(idx, 1);
			document.getElementById(`node-${row}-${col}`).className = allClasses.join(" ");
		}
		else if(!allClasses.includes('node-wall')){
			allClasses.push('node-wall');
			document.getElementById(`node-${row}-${col}`).className = allClasses.join(" ");
		}
		
		grid[row][col].isWall = !grid[row][col].isWall;
		setGrid(grid);
	}

	const handleMouseUp= () => {
		setGrid(grid);
		setMousePressed(false);
	}




	//==================Finally return

	return (
		<React.Fragment>

		{/* =====Header====== */}
		<nav className="navbar">
			<a> <img className="logo" src={logo} /> </a>

			<div className="legend">
				<div className="legend-item">
					<div className="symbol symbol-start"></div>
					<span className="symbol-text">Start Node</span>
				</div>
				<div className="legend-item">
					<div className="symbol symbol-end"></div>
					<span className="symbol-text">End Node</span>
				</div>
				<div className="legend-item">
					<div className="symbol symbol-wall"></div>
					<span className="symbol-text">Wall</span>
				</div>
			</div>

			<ul className="navbar-nav">
				{/* <li className="nav-item"> <a href="#" className="nav-link"> BFS </a> </li> */}
				<li className="nav-item"> <a href="#" className="nav-link" onClick={() => resetAll()}> Reset All </a> </li>
				<li className="nav-item"> <a href="#" className="nav-link" onClick={() => resetAllExceptWalls()}> Reset (Keep Walls)</a> </li>
				<li className="nav-item"> <a href="#" className="nav-link visualize-button" onClick={() => BFS(grid, START_NODE, END_NODE)}> Visualize </a> </li>
			</ul>

		</nav>

		{/* =====Grid====== */}
		<div className="grid">
			{
				grid.map(row => 
					<div className="inner-grid-div">
							{
								row.map(node => 
									{
										return(
											<Node
												node = {node}
												onMouseDown = {(row, col) => handleMouseDown(row,col)}
												onMouseEnter= {(row, col) => handleMouseEnter(row,col)}
												onMouseUp= {() => handleMouseUp()}
											/>
										)
									}
								)
							}
					</div>
				)
			}
		</div>
		</React.Fragment>
	);
}


export default MainPage;
