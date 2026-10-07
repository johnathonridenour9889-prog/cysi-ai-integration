"use client";

import Image from "next/image";

export function SiteBoot() {
  return (
    <div className="site-boot" aria-hidden="true">
      <div className="site-boot__inner site-boot__inner--cysi">
        <Image
          src="/cysi-header-logo.png"
          alt=""
          width={205}
          height={48}
          priority
          className="site-boot__cysi-logo"
        />
      </div>
    </div>
  );
}
