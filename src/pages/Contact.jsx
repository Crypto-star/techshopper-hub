import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <div className="page-container">
      <h1 className="section-title">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <Input type="text" id="name" name="name" required className="mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <Input type="email" id="email" name="email" required className="mt-1" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <Textarea id="message" name="message" rows={4} required className="mt-1" />
                </div>
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-blue-600 dark:text-blue-400">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p className="mb-2"><strong>Address:</strong> 123 Tech Street, Innovation City, TC 12345</p>
              <p className="mb-2"><strong>Email:</strong> info@technomart.com</p>
              <p className="mb-2"><strong>Phone:</strong> (123) 456-7890</p>
              <p className="mb-4"><strong>Hours:</strong> Monday - Friday, 9am - 5pm</p>
              <p>Follow us on social media for the latest updates and tech tips!</p>
              {/* Add social media icons/links here */}
            </CardContent>
          </Card>
        </section>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">Frequently Asked Questions</h2>
        <Card className="card-hover">
          <CardContent className="prose dark:prose-invert max-w-none">
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold">What are your shipping options?</dt>
                <dd>We offer standard and express shipping options. Delivery times vary depending on your location.</dd>
              </div>
              <div>
                <dt className="font-semibold">Do you offer international shipping?</dt>
                <dd>Yes, we ship to most countries worldwide. Additional fees may apply.</dd>
              </div>
              <div>
                <dt className="font-semibold">What is your return policy?</dt>
                <dd>We accept returns within 30 days of purchase. Items must be unused and in original packaging.</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Contact;