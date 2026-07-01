import SkeletonCard from "./SkeletonCard";

const SkeletonGrid = ({ count = 8 }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div className="list-none" key={index}>
          <SkeletonCard />
        </div>
      ))}
    </ul>
  );
};

export default SkeletonGrid;
