import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
    // const usdcBuffer = await fetch(new URL('../../../../public/usdc.svg', import.meta.url)).then(
    //     (res) => res.arrayBuffer()
    // );
    // const usdcBase64 = Buffer.from(usdcBuffer).toString('base64');
    // // ------------
    // const usdtBuffer = await fetch(new URL('../../../../public/usdt.svg', import.meta.url)).then(
    //     (res) => res.arrayBuffer()
    // );
    // const usdtBase64 = Buffer.from(usdtBuffer).toString('base64');
    // // ------------

    // const solBuffer = await fetch(new URL('../../../../public/sol.svg', import.meta.url)).then(
    //     (res) => res.arrayBuffer()
    // );
    // const solBase64 = Buffer.from(solBuffer).toString('base64');
    // // ------------

    // const usdc = `data:image/svg+xml;base64,${usdcBase64}`;
    // const usdt = `data:image/svg+xml;base64,${usdtBase64}`;
    // const sol = `data:image/svg+xml;base64,${solBase64}`;

    const fontData = await fetch(
        new URL("../../../fonts/main-font.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const fontDataSecondary = await fetch(
        new URL("../../../fonts/CircularStd-Bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div tw=' bg-white w-full p-4 h-full flex items-center justify-center flex-col'>
                <div tw="flex mt-4 justify-center w-full">
                    <div style={{ fontFamily: 'main' }} tw="font-bold text-2xl flex items-center">Merged<span tw="text-yellow-500">&</span>Share</div>
                </div>
                <div tw="mt-8 flex flex-col items-center justify-center w-full">
                    <div style={{ fontFamily: 'main' }} tw="text-6xl w-[70%] flex flex-col items-center font-bold text-center">Showcase your open source contributions as your <span tw='text-yellow-400'>Proof of Work</span></div>
                    <div style={{ fontFamily: 'secondary' }} tw="w-[50%] text-center mt-6">Highlight your merged pull requests and share your impact on the open source community with the world.</div>
                </div>

                <div tw="mt-8 flex max-w-7xl mx-auto">
                    <div tw="border border-[#fff] h-[4rem] flex items-center justify-center shadow-xl border-black w-[30%] rounded-full p-2 ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-share-2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" /></svg>
                        <span tw='ml-2'>Share profile with others</span>
                    </div>
                    <div tw="border border-[#fff] h-[4rem] flex items-center justify-center shadow-xl border-black w-[30%] rounded-full p-2 ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-code"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                        <span tw='ml-2'>Embed PRs to websites</span>
                    </div>
                    <div tw="border border-[#fff] h-[4rem] flex items-center justify-center shadow-xl border-black w-[30%] rounded-full p-2 ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chart-line"><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="m19 9-5 5-4-4-3 3" /></svg>
                        <span tw='ml-2'>See Analytics of profile page</span>
                    </div>
                </div>
                <div tw="mt-4 flex max-w-7xl mx-auto">
                    <div tw="border border-[#fff] h-[4rem] flex items-center justify-center shadow-xl border-black w-[30%] rounded-full p-2 ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trophy"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
                        <span tw='ml-2'>Explore Leaderboards</span>
                    </div>
                    <div tw="border border-[#fff] h-[4rem] flex items-center justify-center shadow-xl border-black w-[30%] rounded-full p-2 ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-globe"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
                        <span tw='ml-2'>Cross-Organisations Support</span>
                    </div>
                </div>

                {/* <div tw="mt-8 relative flex max-w-7xl mx-auto">
                            <img src={usdc} style={{ width: '8rem', height: '8rem', objectFit: 'contain' }} tw="flex items-center justify-center border-black w-[30%] rounded-full  p-4 ml-8" />
                            <img src={sol} style={{ width: '8rem', height: '8rem', objectFit: 'contain' }} tw="flex items-center justify-center border-black w-[30%]  p-4 ml-8" />
                            <img src={usdt} style={{ width: '8rem', height: '8rem', objectFit: 'contain' }} tw="flex items-center justify-center border-black w-[30%]  p-4 ml-8" />
                        </div> */}

                <div
                    style={{
                        background: 'linear-gradient(135deg, #facc15 0%, #bf9900 40%)',
                        width: '20rem',
                        height: '20rem',
                        filter: 'blur(180px)',
                        borderRadius: '50%',
                        display: 'flex',
                        position: 'absolute',
                        bottom: '-100px',
                        left: '-40px',
                        opacity: "0.3",
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'main',
                    }}
                >

                </div>
                <div
                    style={{
                        background: 'linear-gradient(135deg, #facc15 0%, #facc15 40%)',
                        width: '20rem',
                        height: '20rem',
                        filter: 'blur(180px)',
                        borderRadius: '50%',
                        display: 'flex',
                        position: 'absolute',
                        top: '-100px',
                        right: '-40px',
                        opacity: "0.6",
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'main',
                    }}
                >

                </div>

                <div tw='mt-14 flex flex-col gap-1 items-center mx-auto max-w-7xl'>
                    <span style={{ fontFamily: 'secondary' }}>Visit & Explore</span>
                    <span style={{ fontFamily: 'secondary' }}>mergedandshare.in</span>
                </div>

                {/* <div
                            style={{
                                background: 'linear-gradient(135deg, #2775ca 0%, #094c94 40%)',
                                width: '20rem',
                                height: '20rem',
                                filter: 'blur(180px)',
                                borderRadius: '50%',
                                display: 'flex',
                                position: 'absolute',
                                top: '-100px',
                                left: '-40px',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'main',
                            }}
                        >
        
                        </div>
        
        
                        <div
                            style={{
                                background: 'linear-gradient(135deg, #2775ca 0%, #094c94 40%)',
                                width: '20rem',
                                height: '20rem',
                                filter: 'blur(180px)',
                                borderRadius: '50%',
                                display: 'flex',
                                position: 'absolute',
                                bottom: '-100px',
                                right: '-40px',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'main',
                            }}
                        >
        
                        </div> */}

            </div>
        ), {
        fonts: [
            {
                name: 'main',
                data: fontData,
                style: 'normal'
            },
            {
                name: 'secondary',
                data: fontDataSecondary,
                style: 'normal'
            },

        ]
    }
    );
}