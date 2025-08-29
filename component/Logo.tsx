import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src="/shoeShop.png"
      alt="logo"
      width={80}
      height={40}
      className="w-32 md:w-40 lg:w-48 h-auto"
      priority
    />
  );
};

export default Logo;
