import { FC } from "react";
import Link from "next/link";

const HomePage: FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#D20653] to-[#FF951D] text-white gap-6 p-2">
      <header className="text-center flex flex-col items-center gap-2 md:gap-4">
        <h1 className="text-xl md:text-2xl lg:text-5xl font-semibold md:font-bold lg:font-extrabold mb-4" aria-label="Technical Task Overview">Technical Task Overview</h1>
      </header>

      <main className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">

        <div className="max-w-sm bg-white text-black rounded-xl shadow-2xl p-4 md:p-8 transform transition-transform md:hover:scale-110 flex flex-col gap-4 items-start">
          <h2 className="text-base md:text-2xl font-bold" aria-label="Static Page Design">Static Page Design</h2>
          <p className="text-sm md:text-base" aria-label="Static Page Description">Create a visually stunning static page design that captivates users.</p>
          <Link
            href="/static-design"
            className="text-sm md:text-base bg-[#D20653] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#FF951D] transition-all font-medium md:font-semibold"
            aria-label="Link to Static Page Task"
          >
            View Static Design Task
          </Link>
        </div>
        <div className="max-w-sm bg-white text-black rounded-xl shadow-2xl p-4 md:p-8 transform transition-transform md:hover:scale-110 flex flex-col gap-4 items-start">
          <h2 className="text-base md:text-2xl font-bold" aria-label="Categories Form">Categories Form</h2>
          <p className="text-sm md:text-base" aria-label="Categories Form Description">Build a dynamic form to manage and navigate categories seamlessly.</p>
          <Link
            href="/categories"
            className="text-sm md:text-base bg-[#D20653] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#FF951D] transition-all font-medium md:font-semibold"
            aria-label="Link to Categories Form Task"
          >
            Explore Categories Task
          </Link>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
