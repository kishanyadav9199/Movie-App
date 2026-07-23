import notfound from "/404.gif";

const NotFound = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black px-4">
      <img
        src={notfound}
        alt="404 Not Found"
        className="w-64 sm:w-80 md:w-96 lg:w-[450px] object-contain"
      />

      <h1 className="mt-6 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
        Page Not Found
      </h1>

      <p className="mt-2 text-center text-zinc-400 text-sm sm:text-base max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
    </div>
  );
};

export default NotFound;
