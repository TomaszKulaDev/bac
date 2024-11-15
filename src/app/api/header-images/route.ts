import { NextResponse } from "next/server";
import { writeFile, readdir, unlink } from 'fs/promises';
import path from 'path';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { mkdir } from 'fs/promises';

const HEADER_DIR = path.join(process.cwd(), 'public', 'images', 'header');

// Upewnij się, że folder istnieje
async function ensureDirectoryExists() {
  try {
    await mkdir(HEADER_DIR, { recursive: true });
  } catch (error) {
    console.error('Błąd podczas tworzenia katalogu:', error);
  }
}

export async function GET() {
  try {
    await ensureDirectoryExists();
    const files = await readdir(HEADER_DIR);
    
    const headerImages = files
      .filter(file => file.startsWith('header-'))
      .map(file => {
        const position = parseInt(file.split('-')[1]);
        return {
          position,
          imageName: file
        };
      })
      .sort((a, b) => a.position - b.position);

    return NextResponse.json(headerImages);
  } catch (error) {
    console.error('Błąd podczas pobierania zdjęć:', error);
    return NextResponse.json(
      { error: "Nie udało się pobrać zdjęć" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Brak autoryzacji" },
        { status: 401 }
      );
    }

    await ensureDirectoryExists();
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const position = formData.get('position') as string;

    if (!file || !position) {
      return NextResponse.json(
        { error: "Brak wymaganych danych" },
        { status: 400 }
      );
    }

    // Walidacja typu pliku
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: "Dozwolone są tylko pliki obrazów" },
        { status: 400 }
      );
    }

    // Walidacja rozmiaru (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Plik jest za duży (max 5MB)" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Usuń stare zdjęcie dla danej pozycji
    const files = await readdir(HEADER_DIR);
    const oldImage = files.find(file => file.startsWith(`header-${position}-`));
    if (oldImage) {
      await unlink(path.join(HEADER_DIR, oldImage));
    }
    
    const imageName = `header-${position}-${Date.now()}${path.extname(file.name)}`;
    await writeFile(path.join(HEADER_DIR, imageName), buffer);

    return NextResponse.json({
      success: true,
      image: {
        position: parseInt(position),
        imageName
      }
    });
  } catch (error) {
    console.error('Błąd podczas zapisywania zdjęcia:', error);
    return NextResponse.json(
      { error: "Nie udało się zapisać zdjęcia" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Brak autoryzacji" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position');

    if (!position) {
      return NextResponse.json(
        { error: "Nie podano pozycji zdjęcia" },
        { status: 400 }
      );
    }

    await ensureDirectoryExists();
    const files = await readdir(HEADER_DIR);
    const imageToDelete = files.find(file => file.startsWith(`header-${position}-`));

    if (!imageToDelete) {
      return NextResponse.json(
        { error: "Nie znaleziono zdjęcia" },
        { status: 404 }
      );
    }

    await unlink(path.join(HEADER_DIR, imageToDelete));

    return NextResponse.json({
      success: true,
      message: "Zdjęcie zostało usunięte"
    });
  } catch (error) {
    console.error('Błąd podczas usuwania zdjęcia:', error);
    return NextResponse.json(
      { error: "Nie udało się usunąć zdjęcia" },
      { status: 500 }
    );
  }
}