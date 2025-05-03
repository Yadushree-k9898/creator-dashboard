"use client"

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
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Manage Your Creator Journey
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Track your engagement, earn credits, and discover content all in one dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Button asChild size="lg">
                    <Link to="/dashboard/user">
                      Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild size="lg">
                      <Link to="/auth/register">
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild size="lg">
                      <Link to="/auth/login">Login</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Creator Dashboard"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform provides all the tools creators need to manage their online presence effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Creator Journey?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of creators who are already using our platform to grow their online presence.
          </p>
          {!isAuthenticated && (
            <Button asChild size="lg">
              <Link to="/auth/register">
                Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
