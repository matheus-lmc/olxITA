import Image from "next/image";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function TypeCard({
  figure,
  title,
}: {
  figure: any;
  title: string;
}) {
  return (
    <Card className="cursor-pointer hover:bg-yellow-100 hover:rounded-3xl transition-all justify-between flex flex-col">
      <CardContent className="flex items-center justify-center pt-4 w-full h-2/3">
        <Image src={figure} alt={title} className="h-5/6" />
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <strong>{title}</strong>
      </CardFooter>
    </Card>
  );
}
