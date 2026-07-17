import Image, { ImageProps } from "next/image";

/**
 * Image basée sur next/image, avec l'optimisation désactivée en
 * développement pour pouvoir afficher les images uploadées en local.
 * @param props - les propriétés acceptées par le composant Image de next/image
 * @returns l'image
 */
export default function UploadedImage(props: ImageProps) {
  return (
    <Image {...props} unoptimized={process.env.NODE_ENV === "development"} />
  );
}
