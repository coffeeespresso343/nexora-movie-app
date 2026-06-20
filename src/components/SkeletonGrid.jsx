import SkeletonCard from "./SkeletonCard";

const SkeletonGrid = ({ count = 8 }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <SkeletonCard />
        </li>
      ))}
    </ul>
  );
};

export default SkeletonGrid;
