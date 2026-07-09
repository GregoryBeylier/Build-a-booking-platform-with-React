export interface TagListProps {
  items?: string[];
}

export default function TagList({ items }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items?.map((item, index) => (
        <span
          className="py-2 px-4 rounded-[5px] bg-[#F5F5F5] text-xs font-normal text-[#565656]"
          key={index}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
