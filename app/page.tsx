import { auth } from "@clerk/nextjs/server";

export default async function HomePage() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      {userId && (
        <p className="text-gray-700 text-lg mt-8 text-center">
          Find deals through the navbar!
        </p>
      )}
    </div>
  );
}
