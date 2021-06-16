import buckets from 'buckets-js'

let visited = [];
let shortestPath = [];
let startNode, endNode;

const windowWidth =  Math.floor(window.innerWidth/22);
const windowHeight =  Math.floor((window.innerHeight-200)/21);

export default function BFS(grid, START_NODE, END_NODE){
	visited = []
	shortestPath=[]
   const dRow = [-1, 0, 1, 0]; 
   const dCol = [0, 1, 0, -1]

	const [sx, sy] = START_NODE;
	const [ex, ey] = END_NODE;

   //used for shortes path creation
   startNode = grid[sx][sy];
   endNode = grid[ex][ey];

	//actual algo start from here
	let q = buckets.Queue();
	q.enqueue(grid[sx][sy]);
	grid[sx][sy].isVisited = true;

	while(!q.isEmpty()){
		const currentElement = q.peek();
		let row = currentElement.row;
		let col = currentElement.col;
		q.dequeue();

		//do not process node if it is a wall
		if(grid[row][col].isWall)
			continue;

		//processing current node
		visited.push({row,col});

		if(grid[ex][ey] === currentElement){
            console.log("found")
			break;
		}

		
		for(let i=0; i<4; ++i){
			let adjX = row + dRow[i];
			let adjY = col + dCol[i];

			if(isValid(grid, adjX, adjY)){
				q.enqueue(grid[adjX][adjY]);
				grid[adjX][adjY].isVisited = true;
				grid[adjX][adjY].previousNode = grid[row][col];
			}
		}
	}

	//After finishing BFS computation
	visualizeBFS();
}



//===========Visualizer functions =======


function visualizeBFS(){
	const shortestPathOrder = getShortestPathOrder();
	const visitedNodesOrder = getVisitedNodesOrder();
	visualizeVisited(visitedNodesOrder, shortestPathOrder);    
}

function visualizeVisited(visitedNodesOrder, shortestPathOrder){ 	//visualize visited nodes 
	let time=0;
	for(let node of visitedNodesOrder){
		 if(node.row === endNode.row && node.col === endNode.col){  //wait for visited animation to complete
			  setTimeout(() => {
					visualizeShortestPath(shortestPathOrder);
			  }, 5.5*time);
			  return;
		 }

		 setTimeout(() => {
			  document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
		 }, 5*(time++));
	}
}

function visualizeShortestPath(shortestPathOrder){  // draw shortest path in order
	let time=0;
	for(let node of shortestPathOrder){
		 setTimeout(() => {
			  document.getElementById(`node-${node.row}-${node.col}`).className = 'node shortest-path';
		 }, 50*(time++));
	}

}






//=========Helper functions ========

function getVisitedNodesOrder(){
   return visited;
}

function getShortestPathOrder(){
    for(let node = endNode; node !=null; node = node.previousNode){
		const {row, col} = node;
		shortestPath.push({row, col});
    }

    //return reverse of shortest path ... i.e fornt -> end
    return shortestPath.reverse();
}

function isValid(grid, row, col){
	if (row < 0 || col < 0 || row >= windowHeight || col >= windowWidth)
		return false;
	if (grid[row][col].isVisited)
		return false;
	
	return true;
}
