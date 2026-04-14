import Image from 'next/image'
import ProfileIcon from '../../../../../public/profileIcon.png'
import React from 'react'
export default function ProfileCard({ profile }) {

    return (
        <div key={profile.id} className="flex flex-col items-center gap-3 group">
            <div className="relative w-36 h-36  overflow-hidden border-2 border-transparent ">
                <Image src={ProfileIcon} alt='profile icon' />
            </div>
            <span className="font-semibold text-center text-sm md:text-base">
                {profile.name}
            </span>
        </div>
    )
}
