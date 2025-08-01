import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram } from "lucide-react";

export function SocialShareButtons() {
    return (
        <div className="space-y-2">
            <h3 className="font-headline text-lg">Share this content</h3>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" aria-label="Share on Facebook">
                    <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Share on Twitter">
                    <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Share on Instagram">
                    <Instagram className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
