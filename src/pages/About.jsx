import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TeamMember = ({ name, role, bio }) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      <p className="text-gray-600">{role}</p>
    </CardHeader>
    <CardContent>
      <p>{bio}</p>
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About TechnoMart</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-4">
          At TechnoMart, we're passionate about making technology accessible to everyone. Our mission is to inspire curiosity, foster innovation, and empower individuals to bring their ideas to life through hands-on learning and cutting-edge tools.
        </p>
        <p className="text-gray-700 mb-4">
          We believe that by providing high-quality electronic components, educational resources, and expert support, we can help build a future where technology is a tool for positive change and endless possibilities.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
        <Card>
          <CardContent>
            <p className="text-gray-700 mb-4">
              We are committed to sustainability, ethical sourcing, and supporting STEM education initiatives. TechnoMart actively partners with schools, makerspaces, and community organizations to promote technology literacy and inspire the next generation of innovators.
            </p>
            <p className="text-gray-700">
              Join us in our journey to make technology accessible, education engaging, and innovation limitless.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default About;