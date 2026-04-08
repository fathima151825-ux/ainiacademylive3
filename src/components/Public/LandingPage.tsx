import { Phone, Mail, MapPin, Clock, Users, BookOpen, Award, ArrowRight, GraduationCap, Sparkles, Zap, Target, Brain, Network, Code, Cpu, Layers, Rocket } from 'lucide-react';

export function LandingPage() {
  const whatsappNumber = '919840325253';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi,%20I%20want%20to%20register%20for%20AI%20+%20NI%20Academy`;

  const courses = [
    {
      title: 'Artificial Intelligence',
      description: 'Master cutting-edge AI technologies, machine learning, deep learning, and neural networks',
      icon: Sparkles,
      features: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'AI Applications']
    },
    {
      title: 'Natural Intelligence',
      description: 'Develop critical thinking, problem-solving, and advanced cognitive skills',
      icon: Target,
      features: ['Critical Thinking', 'Problem Solving', 'Cognitive Development', 'Analytical Skills']
    }
  ];

  const benefits = [
    { icon: Users, title: 'Expert Instructors', description: 'Learn from industry professionals' },
    { icon: Clock, title: 'Flexible Timings', description: 'Multiple batch options available' },
    { icon: GraduationCap, title: 'Certification', description: 'Industry-recognized certificate' },
    { icon: Zap, title: 'Premium Curriculum', description: 'Best-in-class course content' }
  ];

  return (
    <div className="min-h-screen bg-[#0b0f1a]">
      <header className="bg-[#0b0f1a]/80 backdrop-blur-xl border-b border-white/5 text-white sticky top-0 z-50">
        <div className="max-w-[1380px] mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-xl opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <img
                  src="/AINI_LOGO.png"
                  alt="AI + NI Academy Logo"
                  className="relative w-32 h-32 object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.6)] group-hover:drop-shadow-[0_0_35px_rgba(59,130,246,0.8)] transition-all duration-500"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  AI + NI Academy
                </h1>
                <p className="text-sm text-gray-400">Empowering Future Minds</p>
              </div>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
            >
              Register Now
            </a>
          </div>
        </div>
      </header>

      <section className="relative min-h-screen flex items-center px-6 sm:px-8 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f1a] via-[#0d1117] via-[#1a0d1f] to-[#0b0f1a] animate-gradientShift"></div>

        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-blue-600 opacity-10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-500 opacity-5 rounded-full blur-[100px] animate-float"></div>
          <div className="absolute bottom-1/3 left-1/4 w-[350px] h-[350px] bg-blue-400 opacity-5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-500/5 via-transparent to-blue-600/5"></div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>

          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-20 left-1/4 animate-floatSlow">
              <Brain className="w-64 h-64 text-blue-500" />
            </div>
            <div className="absolute top-1/3 right-1/4 animate-floatSlow" style={{ animationDelay: '2s' }}>
              <Network className="w-56 h-56 text-blue-400" />
            </div>
            <div className="absolute bottom-1/4 left-1/3 animate-floatSlow" style={{ animationDelay: '4s' }}>
              <Cpu className="w-72 h-72 text-blue-500" />
            </div>
            <div className="absolute top-1/2 right-1/3 animate-floatSlow" style={{ animationDelay: '3s' }}>
              <Rocket className="w-48 h-48 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="max-w-[1380px] mx-auto relative w-full py-20 z-10">
          <div className="text-center mb-24">
            <div className="inline-block mb-8 animate-fadeIn">
              <span className="px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 text-base font-semibold tracking-wide backdrop-blur-sm shadow-lg shadow-blue-500/20">
                Premium AI Training Program
              </span>
            </div>

            <div className="relative inline-block animate-fadeInScale" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <div className="absolute -inset-8 bg-gradient-to-r from-blue-400/30 via-blue-500/20 to-blue-600/30 blur-[60px] opacity-60 animate-textGlow"></div>
              <div className="absolute -inset-12 bg-gradient-to-r from-blue-400/10 via-transparent to-blue-600/10 blur-[80px]"></div>

              <h2 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-12 leading-[1.1] tracking-tight px-4">
                <span className="drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">Master the</span><br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent animate-gradient drop-shadow-[0_0_40px_rgba(59,130,246,0.5)]">
                  Future of AI
                </span>
              </h2>
            </div>

            <p className="text-xl sm:text-2xl md:text-3xl text-gray-400 max-w-5xl mx-auto mb-16 leading-relaxed font-light px-4 animate-fadeInScale drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              Transform your career with our comprehensive programs in Artificial Intelligence and Natural Intelligence.
              <span className="block mt-4 text-gray-500">Join the next generation of AI pioneers.</span>
            </p>
            <div className="flex flex-col items-center gap-6 mt-16 animate-fadeInScale" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 blur-2xl opacity-40 animate-pulse"></div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 hover:from-blue-600 hover:via-blue-500 hover:to-blue-600 text-white px-16 py-8 rounded-2xl text-2xl font-black uppercase tracking-wide transition-all duration-500 transform hover:scale-110 overflow-hidden animate-pulseGlow bg-[length:200%_100%] animate-gradient shadow-2xl shadow-blue-500/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
                  <Phone className="w-9 h-9 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10 drop-shadow-lg">Register Now</span>
                  <ArrowRight className="w-8 h-8 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </div>
              <a
                href="/register"
                className="text-gray-400 hover:text-white font-medium text-lg transition-colors duration-300 underline underline-offset-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
              >
                Or complete registration form
              </a>
            </div>
          </div>

          <div className="relative mt-32 group animate-fadeInScale" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-500/20 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10">
              <div className="aspect-video flex items-center justify-center p-16 bg-gradient-to-br from-blue-500/5 to-blue-600/5 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden opacity-10">
                  <div className="absolute top-10 left-10 animate-float">
                    <Network className="w-24 h-24 text-blue-500" />
                  </div>
                  <div className="absolute top-20 right-20 animate-float" style={{ animationDelay: '1s' }}>
                    <Cpu className="w-32 h-32 text-blue-500" />
                  </div>
                  <div className="absolute bottom-20 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
                    <Brain className="w-28 h-28 text-blue-500" />
                  </div>
                  <div className="absolute bottom-10 right-1/3 animate-float" style={{ animationDelay: '1.5s' }}>
                    <Code className="w-20 h-20 text-blue-400" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '0.5s' }}>
                    <Layers className="w-36 h-36 text-blue-500/50" />
                  </div>
                </div>
                <div className="text-center relative z-10">
                  <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-50 animate-pulse"></div>
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-blue-600 blur-2xl opacity-30"></div>
                    <GraduationCap className="w-32 h-32 text-blue-500 mx-auto relative drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]" />
                  </div>
                  <h3 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-[0_2px_20px_rgba(255,255,255,0.2)]">Shape Your Future</h3>
                  <p className="text-gray-400 text-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">Join elite students building tomorrow's technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-[#0b0f1a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>

        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-10 animate-float">
            <Rocket className="w-48 h-48 text-blue-500" />
          </div>
          <div className="absolute top-1/3 right-20 animate-float" style={{ animationDelay: '1.5s' }}>
            <Code className="w-56 h-56 text-blue-500" />
          </div>
        </div>

        <div className="max-w-[1380px] mx-auto relative">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center text-white mb-24 px-4">
            Why Choose <span className="text-blue-500">Us?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] p-10 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 rounded-2xl transition-all duration-300"></div>
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-xl flex items-center justify-center mb-8 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                      <Icon className="w-10 h-10 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#0b0f1a] to-[#0d1117] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

        <div className="absolute top-20 right-10 opacity-5 animate-float">
          <Brain className="w-96 h-96 text-blue-500" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-5 animate-float" style={{ animationDelay: '2s' }}>
          <Network className="w-80 h-80 text-blue-500" />
        </div>

        <div className="max-w-[1380px] mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 px-4">
              Our <span className="text-blue-500">Premium</span> Courses
            </h2>
            <p className="text-gray-400 text-xl sm:text-2xl max-w-4xl mx-auto leading-relaxed px-4">
              Elite programs designed to transform you into an industry leader
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] rounded-3xl p-12 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:transform hover:scale-[1.02] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 rounded-3xl transition-all duration-500"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>

                  <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    {index === 0 ? (
                      <Cpu className="w-64 h-64 text-blue-500 animate-float" />
                    ) : (
                      <Brain className="w-64 h-64 text-blue-500 animate-float" />
                    )}
                  </div>

                  <div className="relative">
                    <div className="flex items-start gap-6 mb-10">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-4xl font-bold text-white mb-4">{course.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-xl">{course.description}</p>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <p className="font-bold text-white text-xl">What you'll master:</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {course.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-gray-300">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/50"></div>
                            <span className="font-medium text-lg">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-40 px-6 sm:px-8 lg:px-12 bg-[#0b0f1a] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 opacity-20 rounded-full blur-[150px]"></div>
        </div>

        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 animate-float">
            <Network className="w-72 h-72 text-blue-500" />
          </div>
          <div className="absolute bottom-20 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
            <Layers className="w-80 h-80 text-blue-500" />
          </div>
          <div className="absolute top-1/2 left-10 animate-float" style={{ animationDelay: '2s' }}>
            <Brain className="w-56 h-56 text-blue-500" />
          </div>
          <div className="absolute top-1/3 right-10 animate-float" style={{ animationDelay: '1.5s' }}>
            <Rocket className="w-64 h-64 text-blue-400" />
          </div>
        </div>

        <div className="max-w-[1380px] mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-10 px-4">
            Ready to Start Your <span className="text-blue-500">Journey?</span>
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-400 mb-16 font-light max-w-4xl mx-auto leading-relaxed px-4">
            Join AI + NI Academy today and unlock your potential
          </p>
          <div className="flex flex-col items-center gap-6">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-5 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 hover:from-blue-600 hover:via-blue-500 hover:to-blue-600 text-white px-16 py-8 rounded-2xl text-2xl font-black uppercase tracking-wide transition-all duration-500 transform hover:scale-110 relative overflow-hidden animate-pulseGlow bg-[length:200%_100%] animate-gradient shadow-2xl shadow-blue-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              <Phone className="w-9 h-9 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10 drop-shadow-lg">Register Now</span>
              <ArrowRight className="w-8 h-8 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            </a>
            <a
              href="/register"
              className="text-gray-400 hover:text-white font-medium text-lg transition-colors duration-300 underline underline-offset-4"
            >
              Or complete registration form
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-[#0a0d14] border-t border-white/5 text-white py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-[1380px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/AINI_LOGO.png"
                  alt="AI + NI Academy Logo"
                  className="w-24 h-24 object-contain"
                />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  AI + NI Academy
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                Empowering the next generation with cutting-edge knowledge in Artificial and Natural Intelligence
              </p>
              <p className="text-sm text-gray-500">
                A Novamax Studios Initiative
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
              <div className="space-y-4">
                <a
                  href={`tel:+${whatsappNumber}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-blue-500 transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  +91 98403 25253
                </a>
                <a
                  href="mailto:info@ainiacademy.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-blue-500 transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  info@ainiacademy.com
                </a>
                <div className="flex items-start gap-3 text-gray-400">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span>AI + NI Academy<br />Chennai, Tamil Nadu</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
              <div className="space-y-4">
                <a
                  href="#courses"
                  className="block text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Our Courses
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Register Now
                </a>
                <a
                  href="/terms"
                  className="block text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Terms & Conditions
                </a>
                <a
                  href="/admin"
                  className="block text-gray-400 hover:text-blue-500 transition-colors"
                >
                  Admin Portal
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-center">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} Novamax Studios. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
