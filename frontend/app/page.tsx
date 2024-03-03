"use client"
import { useAppSelector } from '../lib/hooks'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RootState } from '../lib/store'
import { authRoutes } from '../routes'

const Home = () => {
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth)
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push(authRoutes.login)
        }
    }, [isAuthenticated, router])

    return (
        <div>Home</div>
    )
}

export default Home