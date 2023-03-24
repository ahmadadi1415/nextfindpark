import { getToken } from "next-auth/jwt"
import { getSession } from "next-auth/react"
import { NextRequest, NextResponse } from "next/server"
import { Role } from "nextauth"

const secret = process.env.NEXTAUTH_SECRET

export default async function middleware(req: NextRequest) {
    const adminPath = ["/admin"]
    const operatorPath = ["/operator"]
    const autoRedirectLogin = ["/login", "/registration"]
    const { pathname } = req.nextUrl

    if (adminPath.some((path) => pathname.startsWith(path))) {
        const token = await getToken({ req })

        if (!token) {
            const url = new URL(`/login`, req.url)
            url.searchParams.set("callbackUrl", encodeURI(req.url))
            return NextResponse.redirect(url)
        }

        if (token.role !== "admin") {
            const url = new URL(`/`, req.url)

            return NextResponse.redirect(url)
        }

    }

    if (operatorPath.some((path) => pathname.startsWith(path))) {
        const token = await getToken({ req })

        if (!token) {
            const url = new URL(`/login`, req.url)
            url.searchParams.set("callbackUrl", encodeURI(req.url))
            return NextResponse.redirect(url)
        }

        if (token.role !== "operator") {
            const url = new URL(`/`, req.url)

            return NextResponse.redirect(url)
        }
    }

    if (autoRedirectLogin.some((path) => pathname.startsWith(path))) {
        const token = await getToken({ req })

        if (token) {
            const url = new URL(`/`, req.url)
            return NextResponse.redirect(url)
        }
    }
}