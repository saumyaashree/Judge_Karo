import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Product, ProductScores } from "@/lib/types";
import { CheckCircle2, Star, TrendingUp, XCircle } from "lucide-react";

type ProductWithScores = {
    product: Product;
    scores?: ProductScores;
}

export default function CompareTable({ productsWithScores }: { productsWithScores: ProductWithScores[] }) {
    
    const allSpecs = Array.from(new Set(productsWithScores.flatMap(p => Object.keys(p.product.specs))));
    const allGoodFor = Array.from(new Set(productsWithScores.flatMap(p => p.product.goodFor)));
    const allNotGoodFor = Array.from(new Set(productsWithScores.flatMap(p => p.product.notGoodFor)));

    return (
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table className="min-w-full">
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="min-w-[200px] font-semibold text-base sticky left-0 bg-muted/50 z-10">Feature</TableHead>
                                {productsWithScores.map(({ product }) => (
                                    <TableHead key={product.id} className="min-w-[250px] p-4 text-center">
                                        <Link href={`/products/${product.id}`} className="block">
                                            <Image 
                                                src={product.imageUrl}
                                                alt={product.name}
                                                width={150}
                                                height={150}
                                                className="object-contain mx-auto mb-2 rounded-md"
                                                data-ai-hint={product.imageHint}
                                            />
                                            <p className="font-bold text-foreground">{product.name}</p>
                                            <p className="text-sm text-accent font-semibold">${product.price}</p>
                                        </Link>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableHead className="font-semibold sticky left-0 bg-background z-10">Brand</TableHead>
                                {productsWithScores.map(({ product }) => (
                                    <TableCell key={product.id} className="text-center">{product.brand}</TableCell>
                                ))}
                            </TableRow>

                            <TableRow className="bg-muted/20">
                                <TableHead colSpan={productsWithScores.length + 1} className="font-bold text-accent sticky left-0 bg-muted/20 z-10">
                                    Technical Specs
                                </TableHead>
                            </TableRow>

                            {allSpecs.map(specKey => (
                                <TableRow key={specKey}>
                                    <TableHead className="font-semibold sticky left-0 bg-background z-10">{specKey}</TableHead>
                                    {productsWithScores.map(({ product }) => (
                                        <TableCell key={product.id} className="text-center">
                                            {product.specs[specKey] || '-'}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                            
                             <TableRow className="bg-muted/20">
                                <TableHead colSpan={productsWithScores.length + 1} className="font-bold text-accent sticky left-0 bg-muted/20 z-10">
                                    Real-World Scores
                                </TableHead>
                            </TableRow>
                            
                            <TableRow>
                                <TableHead className="font-semibold sticky left-0 bg-background z-10">Comfort</TableHead>
                                {productsWithScores.map(({ product, scores }) => (
                                    <TableCell key={product.id} className="text-center">{scores?.comfort ? `${scores.comfort} / 10` : '-'}</TableCell>
                                ))}
                            </TableRow>
                             <TableRow>
                                <TableHead className="font-semibold sticky left-0 bg-background z-10">Reliability</TableHead>
                                {productsWithScores.map(({ product, scores }) => (
                                    <TableCell key={product.id} className="text-center">{scores?.reliability ? `${scores.reliability} / 10` : '-'}</TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableHead className="font-semibold sticky left-0 bg-background z-10">Repurchase Intent</TableHead>
                                {productsWithScores.map(({ product, scores }) => (
                                    <TableCell key={product.id} className="text-center">{scores?.repurchaseIntent ? `${scores.repurchaseIntent}%` : '-'}</TableCell>
                                ))}
                            </TableRow>
                             <TableRow>
                                <TableHead className="font-semibold sticky left-0 bg-background z-10">Longevity</TableHead>
                                {productsWithScores.map(({ product, scores }) => (
                                    <TableCell key={product.id} className="text-center">{scores?.longevity ? `${scores.longevity} years` : '-'}</TableCell>
                                ))}
                            </TableRow>


                            <TableRow className="bg-muted/20">
                                <TableHead colSpan={productsWithScores.length + 1} className="font-bold text-accent sticky left-0 bg-muted/20 z-10">
                                    Good For
                                </TableHead>
                            </TableRow>

                             {allGoodFor.map(item => (
                                <TableRow key={item}>
                                    <TableHead className="font-semibold sticky left-0 bg-background z-10">{item}</TableHead>
                                    {productsWithScores.map(({ product }) => (
                                        <TableCell key={product.id} className="text-center">
                                            {product.goodFor.includes(item) ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-red-500 mx-auto" />}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                         <TableRow>
                                <TableHead className="sticky left-0 bg-background z-10"></TableHead>
                                {productsWithScores.map(({ product }) => (
                                    <TableCell key={product.id} className="text-center p-4">
                                        <Button asChild>
                                            <Link href={`/products/${product.id}`}>View Product</Link>
                                        </Button>
                                    </TableCell>
                                ))}
                            </TableRow>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
