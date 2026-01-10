import Image from "next/image";

export const Header = () => {
  return (
    <>
      <Image
        src={'/logo.png'}
        width={300}
        height={300}
        alt="Rick and Morty Logo"
        className="mx-auto w-50 max-h-16"
      />
    </>
  );
};

export default Header;