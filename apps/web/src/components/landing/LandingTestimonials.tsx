import { Container } from "@/components/ui/container";
import { MarketingSectionHeader } from "@/components/ui/MarketingSectionHeader";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { getMessages } from "@/lib/messages/server";


export async function LandingTestimonials() {
  const messages = await getMessages();
  const { testimonials } = messages.landing;

  return (
    <section id="reviews" className="py-24">
      <Container variant="marketing">
        <MarketingSectionHeader
          label={testimonials.label}
          title={testimonials.title}
          subtitle={testimonials.subtitle}
        />
        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {testimonials.items.map((item) => (
            <div key={item.author} className="h-full">
              <TestimonialCard
                quote={item.quote}
                author={item.author}
                meta={item.meta}
                avatarColor={
                  item.avatarColor as "primary" | "secondary" | "primaryLight"
                }
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
