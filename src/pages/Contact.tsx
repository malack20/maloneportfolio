import { motion } from "framer-motion";
import { MessageSquare, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profile")
        .select("*")
        .single();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  const handleWhatsAppClick = () => {
    const number = profile?.whatsapp_number || "";
    const message = encodeURIComponent("Hi! I'd like to discuss a project with you.");
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6"
          >
            <MessageSquare className="w-10 h-10 text-primary" />
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you have a question, want to collaborate, or just want to say hi,
                I'd love to hear from you!
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {profile?.email && (
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </motion.div>
              )}

              {profile?.whatsapp_number && (
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground">{profile.whatsapp_number}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* WhatsApp CTA */}
            {profile?.whatsapp_number && (
              <Button
                size="lg"
                onClick={handleWhatsAppClick}
                className="w-full group text-lg"
              >
                <MessageSquare className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                Chat on WhatsApp
              </Button>
            )}

            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-cyan-500/10 border border-primary/20"
            >
              <p className="text-lg italic text-muted-foreground">
                "The best way to predict the future is to create it."
              </p>
              <p className="text-sm text-muted-foreground mt-2">— Peter Drucker</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
