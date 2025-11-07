'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Building,
  User
} from 'lucide-react';
import { getCompanyInfo } from '@/lib/wordpress';
import { useEffect } from 'react';
import { CompanyInfo, ContactForm } from '@/types/product';

export default function ContactPage() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    async function fetchCompanyInfo() {
      const info = await getCompanyInfo();
      setCompanyInfo(info);
    }
    fetchCompanyInfo();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call - replace with actual email service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with SendGrid, EmailJS, or your own backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Building,
      label: 'Office Address',
      value: companyInfo?.address || 'Jeedimetla, Hyderabad, Telangana, India',
      href: '#',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: companyInfo?.phone || '+91 98765 43210',
      href: 'tel:+919876543210',
    },
    {
      icon: Mail,
      label: 'Email',
      value: companyInfo?.email || 'info@noblels.com',
      href: 'mailto:info@noblels.com',
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: 'Mon - Sat: 9:00 AM - 6:00 PM',
      href: '#',
    },
  ];

  const inquiryTypes = [
    'Product Inquiry',
    'Technical Support',
    'Partnership Opportunity',
    'General Information',
    'Other',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Get in Touch
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              We're here to help with your pharmaceutical chemical needs. Reach out to us for inquiries, quotes, or partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <Card key={info.label} className="text-center p-6 hover:shadow-lg transition-shadow">
                    <CardHeader className="space-y-4 pb-4">
                      <div className="h-12 w-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{info.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {info.href.startsWith('tel:') || info.href.startsWith('mailto:') ? (
                        <a 
                          href={info.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{info.value}</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-foreground">Send Us a Message</h2>
                  <p className="text-lg text-muted-foreground">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Contact Form
                    </CardTitle>
                    <CardDescription>
                      Please provide as much detail as possible to help us assist you better.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="inquiry-type" className="text-sm font-medium text-foreground">
                          Inquiry Type
                        </label>
                        <select
                          id="inquiry-type"
                          className="w-full p-3 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select inquiry type</option>
                          {inquiryTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-foreground">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          placeholder="Please describe your requirements, product interests, or any questions you may have..."
                          value={formData.message}
                          onChange={handleInputChange}
                        />
                      </div>

                      {submitStatus === 'success' && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                          <p className="text-sm text-green-800">
                            Thank you for your message! We'll get back to you soon.
                          </p>
                        </div>
                      )}

                      {submitStatus === 'error' && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                          <p className="text-sm text-red-800">
                            Something went wrong. Please try again or contact us directly.
                          </p>
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Map & Additional Info */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-foreground">Visit Our Office</h2>
                  <p className="text-lg text-muted-foreground">
                    Located in the pharmaceutical hub of Hyderabad, we're easily accessible and ready to welcome you.
                  </p>
                </div>

                {/* Map Placeholder */}
                <Card className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src="/office-building.jpg"
                      alt="Noble Life Sciences Office Building"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                      <div className="p-6 text-white text-center w-full">
                        <h3 className="text-xl font-semibold">Hyderabad, India</h3>
                        <p className="text-white/90">Jeedimetla Industrial Area</p>
                        <Button variant="secondary" className="mt-3" asChild>
                          <a 
                            href="https://maps.google.com/?q=Jeedimetla,Hyderabad" 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <MapPin className="h-4 w-4 mr-2" />
                            Open in Google Maps
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Quick Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Contact</CardTitle>
                    <CardDescription>
                      For urgent inquiries, reach out directly
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Sales & General</p>
                        <a href="tel:+919876543210" className="text-sm text-muted-foreground hover:text-primary">
                          +91 98765 43210
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <a href="mailto:info@noblels.com" className="text-sm text-muted-foreground hover:text-primary">
                          info@noblels.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle>Business Hours</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium">9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Quick answers to common questions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What products do you manufacture?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We manufacture API intermediates and trade in high-quality solvents and chemicals for the pharmaceutical industry.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do you ship internationally?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, we serve clients across 15+ countries with reliable international shipping and customs clearance support.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What are your quality standards?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We maintain ISO certification and follow stringent quality control measures to ensure international standards.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How can I request a quote?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Fill out our contact form or call us directly with your requirements. We'll provide a detailed quote within 24 hours.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Separator */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      {/* Spacing before footer */}
      <div className="h-8 bg-background"></div>
    </div>
  );
}