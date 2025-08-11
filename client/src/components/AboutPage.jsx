import React from 'react';
import { 
  CodeBracketIcon, 
  CpuChipIcon, 
  GlobeAltIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const AboutPage = () => {
  const features = [
    {
      name: 'Modern Tech Stack',
      description: 'Built with React, Node.js, and MongoDB for optimal performance and scalability.',
      icon: CodeBracketIcon,
    },
    {
      name: 'Real-time Updates',
      description: 'Experience seamless real-time updates and live data synchronization.',
      icon: CpuChipIcon,
    },
    {
      name: 'Global Accessibility',
      description: 'Deploy anywhere with our cloud-ready architecture and CDN support.',
      icon: GlobeAltIcon,
    },
    {
      name: 'Enterprise Security',
      description: 'Bank-level security with JWT authentication and rate limiting.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Rapid Development',
      description: 'Get up and running quickly with our comprehensive template and documentation.',
      icon: RocketLaunchIcon,
    },
    {
      name: 'Community Driven',
      description: 'Join our growing community of developers and contributors.',
      icon: UserGroupIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              About Our
              <span className="text-blue-600"> Website Template</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              A modern, full-stack website template designed to accelerate your development process. 
              Built with the latest technologies and best practices.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to build amazing websites
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our template provides all the essential features and components you need to create 
              professional, scalable web applications.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">100%</div>
              <div className="mt-2 text-xl text-blue-100">Open Source</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">24/7</div>
              <div className="mt-2 text-xl text-blue-100">Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-white">1000+</div>
              <div className="mt-2 text-xl text-blue-100">Downloads</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet our team
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We're a passionate team of developers dedicated to creating amazing web experiences.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="h-32 w-32 mx-auto rounded-full bg-gray-300 flex items-center justify-center">
                  <UserGroupIcon className="h-16 w-16 text-gray-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Development Team</h3>
                <p className="mt-2 text-base text-gray-500">
                  Experienced developers focused on creating robust and scalable solutions.
                </p>
              </div>
              <div className="text-center">
                <div className="h-32 w-32 mx-auto rounded-full bg-gray-300 flex items-center justify-center">
                  <ShieldCheckIcon className="h-16 w-16 text-gray-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Security Experts</h3>
                <p className="mt-2 text-base text-gray-500">
                  Security professionals ensuring your applications are safe and secure.
                </p>
              </div>
              <div className="text-center">
                <div className="h-32 w-32 mx-auto rounded-full bg-gray-300 flex items-center justify-center">
                  <RocketLaunchIcon className="h-16 w-16 text-gray-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">DevOps Engineers</h3>
                <p className="mt-2 text-base text-gray-500">
                  DevOps specialists helping you deploy and scale your applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;


