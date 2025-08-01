import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Share2 } from "lucide-react";

export function SocialShareButtons() {
    return (
        <div className="space-y-2">
            <h3 className="font-headline text-lg flex items-center gap-2">
                <Share2 className="h-5 w-5" /> Compartilhe essa delícia
            </h3>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" aria-label="Compartilhar no Facebook">
                    <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Compartilhar no Twitter">
                    <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Compartilhar no Instagram">
                    <Instagram className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
