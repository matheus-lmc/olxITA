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
    <Card className="cursor-pointer hover:bg-yellow-100 hover:rounded-3xl transition-all">
      <CardContent className="flex items-center justify-center p-4">
        <Image src={figure} alt={title} />
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <strong>Eletrônicos</strong>
      </CardFooter>
    </Card>
  );
}
