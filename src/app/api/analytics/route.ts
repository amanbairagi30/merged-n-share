import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import prisma from '@/lib/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const COOLDOWN_PERIOD = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json()
        const headersList = headers()
        const forwardedFor = headersList.get('x-forwarded-for')
        const viewerIp = forwardedFor ? forwardedFor.split(',')[0] : 'Unknown'

        const now = new Date()

        // Check if a view from this IP already exists for this user
        const existingView = await prisma.profileView.findUnique({
            where: {
                userId_viewerIp: {
                    userId: userId,
                    viewerIp: viewerIp,
                },
            },
        })

        if (existingView) {
            const timeSinceLastView = now.getTime() - existingView.lastViewedAt.getTime()

            if (timeSinceLastView < COOLDOWN_PERIOD) {
                // If the cooldown period hasn't passed, don't update the view count
                return NextResponse.json({ message: 'View recorded recently', isNewView: false }, { status: 200 })
            }

            // Update the existing view's timestamp and increment the view count
            await prisma.profileView.update({
                where: { id: existingView.id },
                data: {
                    lastViewedAt: now,
                    viewCount: { increment: 1 }
                },
            })
            return NextResponse.json({ message: 'View updated successfully', isNewView: false }, { status: 200 })
        } else {
            // Create a new view
            await prisma.profileView.create({
                data: {
                    userId,
                    viewerIp,
                    lastViewedAt: now,
                },
            })
            return NextResponse.json({ message: 'New view recorded successfully', isNewView: true }, { status: 200 })
        }
    } catch (error) {
        console.error('Error recording view:', error)
        return NextResponse.json({ message: 'Error recording view' }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url)
    const userId = session?.user?.id;
    const range = searchParams.get('range') || '7d' // Default to 7 days
    console.log(range)

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const now = new Date()
    let startDate: Date

    switch (range) {
        case '24h':
            startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
            break
        case '7d':
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            break
        case '30d':
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
            break
        default:
            return NextResponse.json({ error: 'Invalid range' }, { status: 400 })
    }

    try {
        const views = await prisma.profileView.findMany({
            where: {
                userId: userId,
                lastViewedAt: {
                    gte: startDate,
                },
            },
            orderBy: {
                lastViewedAt: 'asc',
            },
        })

        const groupedViews = views.reduce((acc, view) => {
            const date = view.lastViewedAt.toISOString().split('T')[0]
            acc[date] = (acc[date] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        const formattedData = Object.entries(groupedViews).map(([date, count]) => ({
            date,
            views: count,
        }))

        return NextResponse.json(formattedData)
    } catch (error) {
        console.error('Error fetching profile views:', error)
        return NextResponse.json({ error: 'Error fetching profile views' }, { status: 500 })
    }
}