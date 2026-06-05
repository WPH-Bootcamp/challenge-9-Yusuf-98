import LogoLarge from '../../assets/icons/logo-large.png';
import LogoSmall from '../../assets/icons/logo-small.png';
import type { LogoProps } from '../../types/movie';

const Logo = ({ className }: LogoProps) => {
  return (
    <picture className={className}>
      {/* Jika layar md ke atas */}
      <source media="(min-width: 768px)" srcSet={LogoLarge} />

      {/* Gambar default untuk layar mobile */}
      <img src={LogoSmall} alt="Logo" className="block h-full w-full object-contain" />
    </picture>
  );
};

export default Logo;
