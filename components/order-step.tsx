import Image from "next/image";

interface OrderStepProps {
  index: number;
  image: string;
  title: string;
  description: string;
}

const OrderStep = ({ index, image, title, description }: OrderStepProps) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white font-medium">
        {index}
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center">
          <Image
            src={image}
            alt="Hero Image"
            width={100}
            height={100}
            className="w-[80px] h-[80px] md:[100px] md:h-[100px]"
          />
          <h5 className="font-semibold md:text-lg">{title}</h5>
        </div>
        <p className="text-muted-foreground text-center text-sm md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default OrderStep;
