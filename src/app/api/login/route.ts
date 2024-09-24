 //src/app/api/login/route.ts
 
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { z } from "zod";

// Schemat walidacji danych logowania
const loginSchema = z.object({
  email: z.string().email("Nieprawidłowy adres email"),
  password: z.string().min(1, "Hasło jest wymagane"),
});

// Główna funkcja obsługująca żądanie logowania
export async function POST(request: Request) {
  console.log("Received POST request");

  try {
    // Łączenie z bazą danych
    await connectToDatabase();
    console.log("Connected to database");
  } catch (dbError) {
    console.error("Database connection error: ", dbError);
    return NextResponse.json(
      { message: "Database connection failed", error: dbError },
      { status: 500 }
    );
  }

  // Pobieranie danych z ciała żądania
  const { email, password } = await request.json();
  console.log("Request body:", { email, password });

  // Walidacja danych logowania
  const validationResult = loginSchema.safeParse({ email, password });
  if (!validationResult.success) {
    return NextResponse.json(
      { message: validationResult.error.errors[0].message },
      { status: 400 }
    );
  }

  // Sprawdzanie, czy email i hasło zostały podane
  if (!email || !password) {
    console.log("Missing email or password");
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    // Wyszukiwanie użytkownika na podstawie adresu email
    const user = await User.findOne({ email });
    console.log("Te dane są pobierane z bazy danych MongoDB:");
    console.log("Found user:", user);
    console.log("User role from database:", user?.role);

    // Sprawdzanie, czy użytkownik został znaleziony
    if (!user) {
      console.log("No user found with this email");
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    // Sprawdzanie, czy użytkownik jest zweryfikowany
    if (!user.isVerified) {
      console.log("User is not verified");
      return NextResponse.json(
        { message: "You need to verify your email before logging in" },
        { status: 403 }
      );
    }

    // Porównywanie hasła z hasłem zapisanym w bazie danych
    console.log("Comparing passwords");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password valid:", isPasswordValid);

    // Sprawdzanie, czy hasło jest prawidłowe
    if (!isPasswordValid) {
      console.log("Password is not valid");
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }

    // Generowanie tokena JWT
    console.log("Generating JWT token");
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    console.log("JWT token payload:", { id: user._id, email: user.email, role: user.role });
    console.log("JWT token generated:", token);
    console.log("Sending response with user:", { id: user._id, email: user.email, name: user.name, role: user.role });

    // Wysyłanie odpowiedzi z tokenem JWT i danymi użytkownika
    return NextResponse.json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    }, { status: 200 });
  } catch (error) {
    console.error("Login error: ", error);
    return NextResponse.json({ message: "Login failed", error }, { status: 500 });
  }
}
