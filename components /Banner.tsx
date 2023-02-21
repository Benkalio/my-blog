function Banner() {
  return (
    <>
      <div
        className="flex flex-col lg:flex-row lg:space-x-5 justify-between font-bold
        px-10 py-5 mb-10"
      >
        <div>
          <h1 className="text-5xl">EHA Blog</h1>
          <h2 className="mt-5 md:mt-0">
            Welcome to the{' '}
            <span className="underline decoration-4 decoration-[#537FE7]">
              health and fitness
            </span>{' '}
            blog for people concerned with living right.
          </h2>
        </div>
        <p className="mt-5 md:mt-2 text-gray-500 max-w-sm">
          We discuss health and healthy living habits.
        </p>
      </div>
      <hr className="border-[#537FE7] mb-10" />
    </>
  );
}

export default Banner 