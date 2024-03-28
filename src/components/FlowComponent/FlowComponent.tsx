import 'reactflow/dist/style.css';
import { EdgeType, NodeType } from '@/lib/types/node';
import React, { useMemo } from 'react';
import ReactFlow from 'reactflow';
import CustomNode from './CustomNode';

type Props = {
  nodes: NodeType[];
  edges: EdgeType[];
};

const FlowComponent: React.FC<Props> = ({ nodes, edges }) => {
  const nodeTypes = useMemo(
    () => ({
      custom: CustomNode,
    }),
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      nodeTypes={nodeTypes}
      fitViewOptions={{
        includeHiddenNodes: true,
        maxZoom: 5,
        minZoom: 0,
      }}
    />
  );
};

export default FlowComponent;
