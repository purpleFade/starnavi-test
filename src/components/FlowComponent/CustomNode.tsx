import { Handle, Position } from 'reactflow';

type Props = {
  data: {
    category: string;
    name: string;
  };
};

const CustomNode: React.FC<Props> = ({ data }) => {
  return (
    <article
      className={`
        px-2 py-2 shadow-md relative w-40 
        rounded-md bg-primary hover:bg-primary-hover bg-gray-100 `}
    >
      <div
        className={`h-auto flex flex-col justify-center items-center bg-bgGrey px-2 py-2`}
      >
        <p className='text-custom text-center'>{data.name}</p>
      </div>

      {data.category !== 'hero' && (
        <Handle
          type='target'
          position={Position.Top}
          className='w-16 bg-blue'
        />
      )}

      {data.category !== 'starship' && (
        <Handle
          type='source'
          position={Position.Bottom}
          className='w-4 bg-blue-500'
        />
      )}
    </article>
  );
};

export default CustomNode;
