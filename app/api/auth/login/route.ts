import { NextResponse } from "next/server"
import { loginSchema } from "@/lib/auth/validation"
import { getUserByEmail } from "@/lib/auth/user"
import { verifyPassword } from "@/lib/auth/password"
import { SignJWT } from "jose"
import { getJwtSecretKey } from "@/lib/auth/config"
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = loginSchema.parse(body)

    const user = await getUserByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 400 }
      )
    }

    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 400 }
      )
    }

    const token = await new SignJWT({ 
      userId: user.id,
      email: user.email,
      role: user.role 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(getJwtSecretKey())

    const cookieStore = await cookies()
    const response = NextResponse.json(
      { 
        success: true, 
        message: "Connexion réussie",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
      { status: 200 }
    );

    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 // 24 heures
    });

    return response;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    return NextResponse.json(
      { error: "Erreur lors de la connexion" },
      { status: 500 }
    )
  }
}