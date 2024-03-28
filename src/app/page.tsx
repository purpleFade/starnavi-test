import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <Link
        className='text-5xl hover:text-blue-700 hover:scale-105 transition-all duration-300'
        href='/people'
      >
        Welcome to <b>STARNAVI</b> test task!
      </Link>
    </div>
  );
}
