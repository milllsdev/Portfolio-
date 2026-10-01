import Image from "next/image";
export function Portrait() {
  return <figure className="portrait">
    <Image src="/IMG_2300.jpeg" alt="Michel Ayikoe Atayi" width={720} height={900} sizes="(max-width: 760px) 100vw, 33vw" className="portrait-image" unoptimized />
    <figcaption>Michel Ayikoe Atayi <span>Salisbury, NC</span></figcaption>
  </figure>;
}
