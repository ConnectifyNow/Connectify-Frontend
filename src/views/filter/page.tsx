import useUserStore from "@/stores/setUserStore";

export default function FilterPage() {
  const user = useUserStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Hello {user.username}</h1>
      <p>This is where the filter functionality will be implemented.</p>
    </div>
  );
}
