interface ProfileFieldProps {
  label: string;
  value: string | number | undefined;
}

function ProfileField({label, value }: ProfileFieldProps) {
  return (
    <div className="max-w-sm">
        <p className=" b-2 text-sm font-medium text-gray-500">  {label}  </p>
        <p className="border-b  order-gray-300 pb-2 text-lg font-semibold text-gray-800">  {value}  </p>
    </div>
  )
 }

export default ProfileField