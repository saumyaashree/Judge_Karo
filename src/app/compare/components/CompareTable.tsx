import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Product, ProductScores, SpecGroup } from "@/lib/types";
import { CheckCircle2, XCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type ProductWithScores = {
    product: Product;
    scores?: ProductScores;
}

function renderSpecValue(value: any) {
    if (typeof value === 'boolean') {
        return value ? <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-red-500 mx-auto" />;
    }
    if (Array.isArray(value)) {
        return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
        return <pre className="text-xs">{JSON.stringify(value, null, 2)}</pre>;
    }
    return value || '-';
}


export default function CompareTable({ productsWithScores }: { productsWithScores: ProductWithScores[] }) {
    
    // Create a master list of all spec groups and individual specs across all products
    const specMasterList: { [group: string]: Set<string> } = {};
    const allSpecGroups = new Set<string>();

    productsWithScores.forEach(({ product }) => {
        Object.entries(product.specs).forEach(([groupName, groupSpecs]) => {
            allSpecGroups.add(groupName);
            if (!specMasterList[groupName]) {
                specMasterList[groupName] = new Set();
            }
            Object.keys(groupSpecs).forEach(specKey => {
                specMasterList[groupName].add(specKey);
            });
        });
    });

    const sortedSpecGroups = Array.from(allSpecGroups);

    return (
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto relative">
                    <Table className="min-w-full">
                        <TableHeader>
                            <TableRow className="hover:bg-muted/50">
                                <TableHead className="w-[200px] font-semibold text-base sticky left-0 bg-background z-20">Feature</TableHead>
                                {productsWithScores.map(({ product }) => (
                                    <TableHead key={product.id} className="min-w-[250px] w-[250px] p-4 text-center sticky top-0 bg-background z-10">
                                        <div className="flex flex-col items-center">
                                            <Link href={`/products/${product.id}`} className="block">
                                                <Image 
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    width={150}
                                                    height={150}
                                                    className="object-contain h-[150px] mx-auto mb-2 rounded-md"
                                                    data-ai-hint={product.imageHint}
                                                />
                                                <p className="font-bold text-foreground">{product.name}</p>
                                                <p className="text-sm text-accent font-semibold">${product.price}</p>
                                            </Link>
                                             <Button asChild className="mt-2 w-full">
                                                <Link href={`/products/${product.id}`}>View Product</Link>
                                            </Button>
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <Accordion type="multiple" defaultValue={["Real-World Scores", ...sortedSpecGroups]} className="w-full contents">
                                
                                {/* Real World Scores */}
                                <AccordionItem value="Real-World Scores" className="contents">
                                    <AccordionTrigger className="contents">
                                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                                            <TableHead colSpan={productsWithScores.length + 1} className="font-bold text-accent sticky left-0 bg-muted/50 z-10 py-3 text-base">
                                                Real-World Scores
                                            </TableHead>
                                        </TableRow>
                                    </AccordionTrigger>
                                    <AccordionContent asChild>
                                        <>
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
                                        </>
                                    </AccordionContent>
                                </AccordionItem>

                                {/* Dynamic Spec Groups */}
                                {sortedSpecGroups.map(groupName => (
                                     <AccordionItem value={groupName} key={groupName} className="contents">
                                        <AccordionTrigger className="contents">
                                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                                <TableHead colSpan={productsWithScores.length + 1} className="font-bold text-accent sticky left-0 bg-muted/50 z-10 py-3 text-base">
                                                    {groupName}
                                                </TableHead>
                                            </TableRow>
                                        </AccordionTrigger>
                                         <AccordionContent asChild>
                                            <>
                                                {Array.from(specMasterList[groupName]).map(specKey => (
                                                    <TableRow key={specKey}>
                                                        <TableHead className="font-semibold sticky left-0 bg-background z-10">{specKey}</TableHead>
                                                        {productsWithScores.map(({ product }) => {
                                                            const specGroup = product.specs[groupName] as SpecGroup | undefined;
                                                            const specValue = specGroup ? specGroup[specKey] : undefined;
                                                            return (
                                                                <TableCell key={product.id} className="text-center">
                                                                     {renderSpecValue(specValue)}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                ))}
                                            </>
                                         </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}