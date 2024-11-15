import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export async function GET() {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'header');
    const files = await fs.readdir(imagesDir);
    
    const images = files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map(file => {
        const [position] = file.split('_');
        return {
          position: parseInt(position),
          imageName: file
        };
      })
      .sort((a, b) => a.position - b.position);

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json(
      { message: 'Błąd podczas pobierania zdjęć' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { message: 'Brak autoryzacji' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const position = formData.get('position') as string;

    if (!file || !position) {
      return NextResponse.json(
        { message: 'Brak wymaganych danych' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${position}_${Date.now()}.webp`;
    const imagesDir = path.join(process.cwd(), 'public', 'images', 'header');

    // Optymalizacja obrazu
    await sharp(buffer)
      .resize(1200, 800, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(path.join(imagesDir, fileName));

    return NextResponse.json({ message: 'Zdjęcie zostało dodane' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Błąd podczas dodawania zdjęcia' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json(
        { message: 'Brak autoryzacji' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position');

    if (!position) {
      return NextResponse.json(
        { message: 'Brak pozycji zdjęcia' },
        { status: 400 }
      );
    }

    const imagesDir = path.join(process.cwd(), 'public', 'images', 'header');
    const files = await fs.readdir(imagesDir);
    
    const imageToDelete = files.find(file => file.startsWith(`${position}_`));
    if (imageToDelete) {
      await fs.unlink(path.join(imagesDir, imageToDelete));
    }

    return NextResponse.json({ message: 'Zdjęcie zostało usunięte' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Błąd podczas usuwania zdjęcia' },
      { status: 500 }
    );
  }
}