import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
export function Portrait() {
  const hasPortrait = existsSync(join(process.cwd(), "public", "portrait.jpg"));
  return <figure className="portrait">
    {hasPortrait ? <Image src="/portrait.jpg" alt="Michel Ayikoe Atayi" width={720} height={900} sizes="(max-width: 760px) 100vw, 33vw" className="portrait-image" /> : <div className="portrait-placeholder" aria-label="Personal portrait location"><span className="eyebrow">The person behind the work</span><span className="portrait-monogram" aria-hidden="true">M<span>.</span></span><span className="portrait-note">Personal portrait<br />Coming soon</span></div>}
    <figcaption>Michel Ayikoe Atayi <span>Salisbury, NC</span></figcaption>
  </figure>;
}
