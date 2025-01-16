import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Users, MessageSquare, UserCheck } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function OnBoarding() {
  const aboutRef = useRef<HTMLElement | null>(null);
  const router = useNavigate();

  const handleLearnMoreClick = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center">
      {}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
              Connect, Collaborate, and Make a Difference
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
              Connectify brings together organizations in need and skilled
              volunteers ready to help. Join our community and start making an
              impact today.
            </p>
            <div className="space-x-4">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-blue-50"
                onClick={() => router("/signin")}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-primary text-white border-white hover:bg-primary-foreground"
                onClick={handleLearnMoreClick}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        className="w-full py-2 md:py-24 lg:py-32"
        id="about"
        ref={aboutRef}
      >
        <div className="px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
            About The Platform
          </h2>
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <p className="mx-auto max-w-[700px] md:text-xl">
                Connectify bridges the gap between organizations in need and
                volunteers eager to help. Our platform makes it easy to connect,
                collaborate, and create meaningful impact. Whether you're
                seeking support or offering it, Connectify is where compassion
                meets action.
              </p>
              <div className="space-x-4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
        <div className="px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
            How Connectify Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Connect</CardTitle>
                <CardDescription>
                  Find associations or volunteers that match your needs and
                  interests.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <MessageSquare className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Collaborate</CardTitle>
                <CardDescription>
                  Communicate and plan your projects through our integrated chat
                  system.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <UserCheck className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Contribute</CardTitle>
                <CardDescription>
                  Make a real difference by sharing your skills and time with
                  those who need it most.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to Make a Difference?
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join Connectify today and start your journey of meaningful
              collaboration and impact.
            </p>
            <Button
              size="lg"
              className="mt-4"
              onClick={() => router("/signup")}
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
