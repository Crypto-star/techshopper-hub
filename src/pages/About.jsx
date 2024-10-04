import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const TeamMember = ({ name, role, bio, image }) => (
  <Card className="h-full card-hover">
    <CardHeader className="bg-gray-50 dark:bg-gray-800">
      <img src={image} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4" />
      <CardTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400 text-center">{name}</CardTitle>
      <p className="text-gray-600 dark:text-gray-400 text-center">{role}</p>
    </CardHeader>
    <CardContent>
      <p className="text-gray-700 dark:text-gray-300">{bio}</p>
    </CardContent>
  </Card>
);

const About = () => {
  const teamMembers = [
    { name: "Alice Johnson", role: "Founder & CEO", bio: "With over 20 years of experience in electronics and education, Alice founded TechnoMart to bridge the gap between technology and learning.", image: "/placeholder.svg" },
    { name: "Bob Smith", role: "CTO", bio: "Bob oversees all technical aspects of TechnoMart, ensuring we offer cutting-edge products and services to our customers.", image: "/placeholder.svg" },
    { name: "Carol Davis", role: "Head of Education", bio: "Carol develops our educational resources and STEM programs, making technology accessible to learners of all ages.", image: "/placeholder.svg" },
    { name: "David Lee", role: "Lead Engineer", bio: "David brings his expertise in hardware design and IoT to create innovative products and solutions for our customers.", image: "/placeholder.svg" },
  ];

  const faqItems = [
    { question: "What is TechnoMart's mission?", answer: "Our mission is to make technology accessible to everyone by providing high-quality electronic components, educational resources, and expert support. We aim to inspire curiosity, foster innovation, and empower individuals to bring their ideas to life." },
    { question: "Do you offer services for businesses?", answer: "Yes, we provide a range of services for businesses, including custom PCB design, prototype development, and consulting on IoT and embedded systems projects. We also offer bulk ordering for our products." },
    { question: "How do you support STEM education?", answer: "We actively partner with schools and educational institutions to provide discounted STEM kits, organize workshops, and develop curriculum materials. We also offer internship programs for students interested in electronics and engineering." },
    { question: "What is your return policy?", answer: "We offer a 30-day return policy for most products, provided they are unused and in their original packaging. For electronic components, we offer replacements for any defective items within 90 days of purchase." },
    { question: "Do you ship internationally?", answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary depending on the destination. Please check our shipping page for more details." },
  ];

  return (
    <div className="page-container">
      <h1 className="section-title">About TechnoMart</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">Our Story</h2>
        <Card className="card-hover">
          <CardContent className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              TechnoMart was founded in 2010 with a simple goal: to make technology accessible to everyone. What started as a small online store for electronic components has grown into a comprehensive platform for makers, students, and professionals alike.
            </p>
            <p>
              Our journey has been driven by a passion for innovation and a commitment to education. We believe that by providing high-quality products, resources, and support, we can empower individuals to turn their ideas into reality and contribute to a more technologically literate society.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="text-center">Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">We constantly seek new ways to improve our products and services, staying at the forefront of technological advancements.</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="text-center">Education</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">We believe in the power of knowledge and strive to make learning accessible and engaging for all.</p>
            </CardContent>
          </Card>
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="text-center">Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">We foster a supportive community of makers, learners, and innovators, encouraging collaboration and knowledge sharing.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default About;