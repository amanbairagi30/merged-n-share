import React from "react";
import Image from "next/image";
import dashboard from "../../public/dashboard.png";

export default function ProductDemo() {
    return (
        <div className="shadow-xl shadow-primary rounded-xl my-6">
            <Image
                className="aspect-video rounded-xl"
                alt="dashboard"
                src={dashboard}
            />
        </div>
    )
}
