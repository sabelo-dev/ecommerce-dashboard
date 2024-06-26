import prismadb from "@/lib/prismadb";
import SizeForm from "./components/size-form";

const SizePage = async ({
  params
}: {
  params: { sizeId: string };
}) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId
    }
  });

  
  const sizeData = size
  ? {
      name: size.name,
      value: size.value || "" // Ensure value is not null
    }
  : null;

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={sizeData} />
      </div>
    </div>
  );
};
export default SizePage;
