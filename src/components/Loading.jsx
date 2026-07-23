import loader from "/loader.gif";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <img
        src={loader}
        alt="Loading..."
        className="w-24 sm:w-32 md:w-40 lg:w-48 object-contain"
      />
    </div>
  );
};

export default Loading;
