function getRandomColorHash() {
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD",
    "#E74C3C", "#3498DB", "#2ECC71", "#9B59B6", "#F39C12"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default function AvatarFromName(name: string) {
  const initials = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  return <div className="w-full h-full flex items-center justify-center text-white rounded-full"
    style={{ backgroundColor: getRandomColorHash() }}
  >
    {initials}
  </div>;
}


