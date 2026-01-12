import Image from "next/image";
import logo from '@/assets/images/logo.png';

export const Header = () => {
  return (
    <div className="py-2">
      <Image
        src={logo}
        width={300}
        height={300}
        preload
        alt="Rick and Morty Logo"
        className="mx-auto w-50 max-h-16"
      />
      <p className="font-mono text-xs text-center">Characters Comparison </p>
      <p className="text-gray-500 font-mono text-center text-base pt-1">
        💥 Select characters to check in what episodes they appeared 💥
      </p>
    </div>
  );
};

export default Header;