
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { Button } from "../../components/ui/button"
import { ArrowRight, Award, Users, Rss } from "lucide-react"

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const features = [
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Earn Credits",
      description:
        "Earn points for logging in daily, completing your profile, and interacting with content in your feed.",
    },
    {
      icon: <Rss className="h-10 w-10 text-primary" />,
      title: "Personalized Feed",
      description: "Access content from multiple platforms in one place. Save, share, and report posts easily.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Creator Community",
      description: "Join a community of creators, track your progress, and manage your content engagement.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 py-20 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Manage Your <span className="text-primary">Creator Journey</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Track your engagement, earn credits, and discover content all in one dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Button
                    asChild
                    size="lg"
                    className="group transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                  >
                    <Link to="/dashboard/user">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      asChild
                      size="lg"
                      className="group transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
                    >
                      <Link to="/auth/register">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      size="lg"
                      className="transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]"
                    >
                      <Link to="/auth/login">Login</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center animate-fadeIn" style={{ animationDelay: "0.4s" }}>
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Creator Dashboard"
                className="rounded-lg shadow-lg max-w-full h-auto transition-all duration-500 hover:shadow-xl transform hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 relative inline-block">
              Everything You Need to Succeed
              <span className="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-primary/30 rounded-full"></span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-6">
              Our platform provides all the tools creators need to manage their online presence effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:translate-y-[-5px] hover:bg-gray-100 dark:hover:bg-gray-750 animate-fadeIn"
                style={{ animationDelay: `${0.8 + index * 0.2}s` }}
              >
                <div className="mb-4 text-primary transform transition-transform duration-300 hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-primary/10 dark:from-gray-800 dark:to-gray-850 transition-colors duration-500">
        <div className="container mx-auto px-4 text-center animate-fadeIn" style={{ animationDelay: "1.4s" }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your <span className="text-primary">Creator Journey</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of creators who are already using our platform to grow their online presence.
          </p>
          {!isAuthenticated && (
            <Button
              asChild
              size="lg"
              className="group transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]"
            >
              <Link to="/auth/register">
                Create Your Account
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
