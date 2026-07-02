import { StarIcon } from "@/components/ui/Icons";

interface RatingProps {
  value: number;
}

const positions = [1, 2, 3, 4, 5];

export const Rating = ({ value }: RatingProps) => (
  <div className="flex items-center gap-1.5">
    <div className="flex">
      {positions.map((position) => (
        <StarIcon
          key={position}
          className={`h-3.5 w-3.5 ${position <= Math.round(value) ? "text-amber-400" : "text-slate-300"}`}
        />
      ))}
    </div>
    <span className="text-xs text-slate-500">{value.toFixed(1)}</span>
  </div>
);
