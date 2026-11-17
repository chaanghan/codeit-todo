export default function CustomLoading({ message }: { message: string }) {
  return (
    <div className="flex flex-1 justify-center items-center">
      <span className="font-bold">{message}</span>
    </div>
  );
}
