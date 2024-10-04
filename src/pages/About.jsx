import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TeamMember = ({ name, role, bio }) => (
  <Card className="h-full card-hover">
    <CardHeader className="bg-gray-50 dark:bg-gray-800">
      <CardTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400">{name}</CardTitle>
      <p className="text-gray-600 dark:text-gray-400">{role}</p>
    </CardHeader>
    <CardContent>
      <p className="text-gray-700 dark:text-gray-300">{bio}</p>
    </CardContent>
  </Card>
);

const About = () => {
  const teamMembers = [
    { name: "Alice Johnson", role: "Founder & CEO", bio: "With over 20 years of experience in electronics and education, Alice founded TechnoMart to bridge the gap between technology and learning." },
    { name: "Bob Smith", role: "CTO", bio: "Bob oversees all technical aspects of TechnoMart, ensuring we offer cutting-edge products and services to our customers." },
    { name: "Carol Davis", role: "Head of Education", bio: "Carol develops our educational resources and STEM programs, making technology accessible to learners of all ages." },
  ];

  return (
    <div className="page-container">
      <h1 className="section-title">About TechnoMart</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">Our Mission</h2>
        <Card className="card-hover">
          <CardContent className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              At TechnoMart, we're passionate about making technology accessible to everyone. Our mission is to inspire curiosity, foster innovation, and empower individuals to bring their ideas to life through hands-on learning and cutting-edge tools.
            </p>
            <p>
              We believe that by providing high-quality electronic components, educational resources, and expert support, we can help build a future where technology is a tool for positive change and endless possibilities.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">Our Commitment</h2>
        <Card className="card-hover">
          <CardContent className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              We are committed to sustainability, ethical sourcing, and supporting STEM education initiatives. TechnoMart actively partners with schools, makerspaces, and community organizations to promote technology literacy and inspire the next generation of innovators.
            </p>
            <p>
              Join us in our journey to make technology accessible, education engaging, and innovation limitless.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default About;