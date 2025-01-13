export function PageHeader({ title }: { title: string }) {
  return (
    <div className="text-center mb-12">
      <h1
        className="text-4xl font-bold bg-gradient-to-r from-amber-500 
                     to-red-500 bg-clip-text text-transparent"
      >
        {title}
      </h1>
    </div>
  );
}
