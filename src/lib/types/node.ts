export enum Position {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

export type NodeType = {
  id: string;
  position: { x: number; y: number };
  data: { category: string; name: string };
  type: string;
  targetPosition: Position;
  sourcePosition: Position;
};

export type EdgeType = {
  id: string;
  source: string;
  target: string;
  type: string;
  animated?: boolean;
  style: object;
};
