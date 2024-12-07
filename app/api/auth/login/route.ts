import { NextResponse } from "next/server"
import { loginSchema } from "@/lib/auth/validation"
import { getUserByEmail } from "@/lib/auth/user"
import { verifyPassword } from "@/lib/auth/password"
import { SignJWT } from "jose"
import { cookies } from "next/headers"

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-at-least-32-characters"
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = loginSchema.parse(body)

    const user = await getUserByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      )
    }

    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret)

    // Set cookie
    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
      },
    })
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return NextResponse.json(
      { error: "Erreur lors de la connexion" },
      { status: 500 }
    )
  }
}