interface cardData {
  url: string;
  title: string;
  price: string;
}

const TopDeals = ({ url, title, price }: cardData) => {
  return (
    <div className="flex flex-col border border-zinc-400 rounded-md min-w-[250px] justify-center items-center">
      <img src={url} alt="" className="h-[150px] w-[250px]" />
      <div className="w-full flex flex-col justify-center items-center gap-0">
        <p className="text-center">{title}</p>
        <p className="font-medium">{price} </p>
      </div>
    </div>
  );
};

export default TopDeals;
