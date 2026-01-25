export default function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center">
      <label className="font-bold w-20">{label}</label>
      {children}
    </div>
  );
}
