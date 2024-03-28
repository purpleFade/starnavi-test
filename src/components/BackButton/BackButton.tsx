import { useRouter } from 'next/navigation';

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button
      className='absolute cursor-pointer z-50 group px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 active:bg-gray-400 m-8'
      onClick={handleClick}
    >
      Go Back
    </button>
  );
};

export default BackButton;
