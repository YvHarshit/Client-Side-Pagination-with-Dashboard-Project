interface ProfileFieldProps {
  label: string;
  value: string | number | undefined;
}

function ProfileField({label, value }: ProfileFieldProps) {
  return (
    <div className="max-w-sm">
        <p className="b-2 border-black text-sm text-white font-semibold text-lg">  {label}  </p>
        <p className="border-b  border-gray-300 pb-2 text-lg font-semibold text-lime-500">  {value}  </p>
    </div>
  )
 }

export default ProfileField