import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Monthly Pass",
        price: "$19",
        period: "/month",
        description: "Perfect for trying things out. Access all content for a full month.",
        features: [
            "Unlimited access to all content",
            "Early access to new releases",
            "Exclusive community access",
            "Cancel anytime",
        ],
        isPopular: false,
    },
    {
        name: "Annual Pass",
        price: "$199",
        period: "/year",
        description: "The best value. Get two months free and enjoy a full year of content.",
        features: [
            "All features from Monthly Pass",
            "Save 15% compared to monthly",
            "Priority support",
            "Annual content summary",
        ],
        isPopular: true,
    },
    {
        name: "Lifetime Access",
        price: "$499",
        period: "one-time",
        description: "One payment, endless content. Never worry about subscriptions again.",
        features: [
            "All features from Annual Pass",
            "Pay once, own forever",
            "Access to all future content",
            "Special founder badge",
        ],
        isPopular: false,
    },
];

export default function SubscriptionsPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl text-primary">
          Choose Your Plan
        </h1>
        <p className="mx-auto max-w-2xl mt-4 text-lg text-muted-foreground">
          Unlock unlimited access to our growing library of exclusive content.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col shadow-lg transition-transform hover:scale-105 ${plan.isPopular ? 'border-primary border-2' : ''}`}>
            {plan.isPopular && <div className="text-center py-1 bg-primary text-primary-foreground font-semibold rounded-t-md text-sm">Most Popular</div>}
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className={`w-full ${plan.isPopular ? 'bg-accent hover:bg-accent/90' : ''}`} size="lg">
                Subscribe to {plan.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
