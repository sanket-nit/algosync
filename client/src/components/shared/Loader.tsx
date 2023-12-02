import './Loader.css'

const Loader = () => {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-slate-700'>
      <span className='loader'>
        <span className='loader-inner'></span>
      </span>
    </div>
  )
}

export default Loader
