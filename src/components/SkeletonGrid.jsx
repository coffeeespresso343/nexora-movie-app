import SkeletonCard from "./SkeletonCard";

const SkeletonGrid = ({ count = 8 }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div className="list-none" key={index}>
          <SkeletonCard />
        </div>
      ))}
    </ul>
  );
};

export default SkeletonGrid;
