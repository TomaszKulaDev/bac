Oto dokumentacja implementacji pola płci w profilu użytkownika:

1. **Definicja typów** (`src/types/user.ts`):

```typescript
export type Gender = "male" | "female";

export interface UserProfile {
  // ... istniejące pola ...
  gender?: Gender; // Dodane pole gender
}
```

2. **Model MongoDB** (`src/models/User.ts`):
   export interface IUser extends Document {
   // ... istniejące pola ...
   gender?: string; // Dodane pole gender
   }

const userSchema = new mongoose.Schema(
{
// ... istniejące pola ...
gender: {
type: String,
enum: ["male", "female"],
},
}
);

3. API Route (src/app/api/users/update-profile/route.ts):
   const updateProfileSchema = z.object({
   // ... istniejące pola ...
   gender: z.enum(["male", "female"]).optional(),
   });

export async function POST(request: Request) {
// ... istniejący kod ...
const updatedUser = await User.findOneAndUpdate(
{ email: session.user.email },
{
$set: {
// ... istniejące pola ...
gender: validatedData.gender,
},
},
{ new: true }
);

return NextResponse.json({
// ... istniejące pola ...
gender: updatedUser.gender,
});
}

4. **Strona profilu** (`src/app/profile/page.tsx`):

```typescript
interface ProfileFormData {
  // ... istniejące pola ...
  gender?: Gender;
}

export default function ProfilePage() {
  const [formData, setFormData] = useState<ProfileFormData>({
    // ... istniejące pola ...
    gender: userProfile?.gender,
  });

  useEffect(() => {
    if (userProfile && !isEditing) {
      setFormData({
        // ... istniejące pola ...
        gender: userProfile.gender,
      });
    }
  }, [userProfile, isEditing]);

  // Wyświetlanie w trybie podglądu
  <div className="mt-4">
    <h3 className="text-sm font-medium text-gray-700">Płeć</h3>
    <p className="mt-1 text-gray-900">
      {userProfile?.gender === "male"
        ? "Mężczyzna"
        : userProfile?.gender === "female"
        ? "Kobieta"
        : "Nie podano"}
    </p>
  </div>;
}
```

Kluczowe zmiany:

Dodanie typu Gender i pola w interfejsie UserProfile
Dodanie pola w modelu MongoDB z walidacją enum
Dodanie walidacji Zod w API
Aktualizacja formularza i wyświetlania w komponencie profilu
Obsługa aktualizacji w API endpoint
Te zmiany umożliwiają:
Wybór płci w formularzu
Walidację danych
Zapis do bazy danych
Wyświetlanie w profilu
