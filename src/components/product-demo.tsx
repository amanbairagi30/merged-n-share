import React from 'react';
import Image from 'next/image';
import dashboard from '../../public/dashboard.png';

export default function ProductDemo() {
  return (
    <div className="my-6 rounded-xl shadow-xl shadow-primary">
      <Image
        className="aspect-video rounded-xl"
        alt="dashboard"
        src={dashboard}
      />
    </div>
  );
}
