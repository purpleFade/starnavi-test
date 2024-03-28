import { NodeType } from '../types/node';

export const generateNodePositions = (initialNodes: NodeType[]) => {
  const nodeWidth = 160;
  const nodeMargin = 20;
  const step = 50;
  let currentXPosition = nodeMargin;
  let totalMoviesWidth = 0;
  let totalMovies = 0;

  const updatedNodes = initialNodes.reverse().map((node) => {
    let xPos = 0;
    let yPos = 0;

    switch (node.data.category) {
      case 'starship':
        xPos = currentXPosition + 100;
        yPos = 500 + Math.floor(Math.random() * 3) * step;
        currentXPosition += nodeWidth + nodeMargin;
        break;
      case 'film':
        xPos = currentXPosition;
        yPos = 200 + Math.floor(Math.random() * 3) * step;
        totalMoviesWidth += currentXPosition;
        currentXPosition += nodeWidth + nodeMargin;
        totalMovies++;
        break;
      case 'person':
        xPos = Math.round(totalMoviesWidth / totalMovies);
        yPos = 0;
        break;
      default:
        break;
    }

    return {
      ...node,
      position: { x: xPos, y: yPos },
    };
  });

  return updatedNodes.reverse();
};
