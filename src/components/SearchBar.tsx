'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search } from 'lucide-react';
import Image from 'next/image';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (query.length > 1) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredProducts);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);
  
  const handleSelect = (productId: string) => {
    router.push(`/products/${productId}`);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-xs">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild className="w-full">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search for a product..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
                {results.length > 0 ? (
                    <div className="py-2">
                        {results.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleSelect(product.id)}
                            className="flex items-center gap-4 px-4 py-2 hover:bg-muted cursor-pointer"
                        >
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="object-contain rounded-md bg-muted"
                                data-ai-hint={product.imageHint}
                            />
                            <div>
                                <p className="font-semibold">{product.name}</p>
                                <p className="text-sm text-muted-foreground">${product.price}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                ) : (
                    query.length > 1 && <p className="p-4 text-sm text-muted-foreground">No results found.</p>
                )}
            </PopoverContent>
        </Popover>
    </div>
  );
}
