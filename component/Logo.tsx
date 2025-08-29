import Image from "next/image";

const Logo = () => {
  return (
    <>
      <Image src="/shoeShop.png" alt="logo" width={60} height={35} priority/>
    </>
  );
};
 export default Logo;