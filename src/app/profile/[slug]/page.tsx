import React from 'react'

export default function PublicProfilePage({ params }: any) {
    const un = params.slug
    return (
        <div className='text-white'>
            Hello {un}
        </div>
    )
}
