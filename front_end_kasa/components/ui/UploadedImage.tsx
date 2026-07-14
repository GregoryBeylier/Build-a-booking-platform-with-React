import Image, { ImageProps } from "next/image";

export default function UploadedImage(props: ImageProps) {
  return (
    <Image {...props} unoptimized={process.env.NODE_ENV === "development"} />
  );
}
