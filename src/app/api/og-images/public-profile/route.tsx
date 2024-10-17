import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(req: Request) {
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

    const { searchParams } = new URL(req.url);

    const hasUserName = searchParams.has("username");
    const hasName = searchParams.has("name");
    const hasOrg = searchParams.has("org");
    const hasPR = searchParams.has("pr");

    const userName = hasUserName ? searchParams.get("username") : "JohnDoe"
    const name = hasName ? searchParams.get("name") : "Jon Doe"
    const org = hasOrg ? searchParams.get("org") : "0"
    const pr = hasPR ? searchParams.get("pr") : "0"

    console.log(userName);
    console.log(name);

    const fontData = await fetch(
        new URL("../../../fonts/main-font.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    const fontDataSecondary = await fetch(
        new URL("../../../fonts/CircularStd-Bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <div tw=' bg-white w-full p-8  h-full flex items-start justify-center flex-col'>

                <div tw="flex items-center mt-4 justify-start w-full">
                    <img tw='w-32 h-32 mb-4 rounded-xl' src={`https://github.com/${userName}.png`} /> 
                    <span style={{ fontFamily: 'secondary' }} tw='mx-6 text-4xl border-r-2 h-12  border-[#202020]'></span> 
                    <div style={{ fontFamily: 'main' }} tw="font-bold text-3xl flex items-center">Merged<span tw="text-yellow-500">&</span>Share </div>
                </div>
                <div tw='flex flex-col'>
                    <p tw='text-5xl'>{name}</p>
                    <p tw='mt-[-1rem]'>github.com/{userName}</p>
                </div>

                <div tw='w-[50%] mt-8 flex items-center flex-warp border-2'>
                    <div tw=' w-38 flex flex-col border-black mr-2 min-h-10 max-h-fit'>
                        <span tw='text-xl' style={{ fontFamily: 'secondary' }}>Merged PRs</span>
                        <span tw='text-5xl' style={{ fontFamily: 'secondary' }}>{pr}</span>
                    </div>
                    <div tw=' w-full flex flex-col border-black mr-2 min-h-10 max-h-fit'>
                        <span tw='text-xl' style={{ fontFamily: 'secondary' }}>Organisation Contributed</span>
                        <span tw='text-5xl' style={{ fontFamily: 'secondary' }}>{org}</span>
                    </div>
                </div>


                <div
                    style={{
                        background: 'linear-gradient(135deg, #facc15 0%, #bf9900 40%)',
                        width: '100rem',
                        height: '100rem',
                        filter: 'blur(100px)',
                        borderRadius: '50%',
                        display: 'flex',
                        position: 'absolute',
                        top: '-100px',
                        left: '50%',
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
                        display: 'flex',
                        position: 'absolute',
                        bottom: '20px',
                        right: '20px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'main',
                    }}
                    tw='text-5xl'
                >
                    M <span tw='text-yellow-500'>&</span>S.
                </div>
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