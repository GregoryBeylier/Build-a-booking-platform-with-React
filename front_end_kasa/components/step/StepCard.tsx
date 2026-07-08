export interface StepProps {
  title: string;
  description: string;
}

export default function StepCard({ title, description }: StepProps) {
  return (
    <div className="flex flex-col gap-[17px] bg-[#842C16] w-[270px] h-[199px] rounded-[10px] pt-11 pb-11 px-[22px]">
      <p className="font-medium text-lg leading-[143%] text-white">{title}</p>
      <p className="font-normal text-xs leading-[143%] text-white">
        {description}
      </p>
    </div>
  );
}
