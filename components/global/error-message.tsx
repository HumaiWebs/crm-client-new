import { PiWarningCircleThin } from "react-icons/pi";

export default function ErrorMessage({ message, showIcon }: { message: string, showIcon?: boolean }) {

  return <div className="flex gap-1 items-center text-red-600 text-[15px]">
    {showIcon && <PiWarningCircleThin className="text-lg" />}  {message}
  </div>
}
