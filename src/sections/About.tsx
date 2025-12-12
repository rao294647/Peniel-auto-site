'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

export default function About() {
    return (
        <section className="relative bg-[#0a0a0a] py-24 px-4 overflow-hidden" id="about">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-16"
                >
                    {/* Header */}
                    <div className="text-center md:text-left">
                        <motion.h2 variants={fadeInUp} className="text-5xl md:text-7xl font-serif tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">ABOUT</span>{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fba988] to-[#ff8c69]">US</span>
                        </motion.h2>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-8 text-gray-300 text-lg md:text-xl font-light leading-relaxed max-w-4xl">
                        <motion.p variants={fadeInUp}>
                            Welcome to Peniel, where our passion is to lead individuals into a deeper, face-to-face encounter with God. We are committed to transforming lives through the power of the Gospel and guiding people towards a journey of spiritual growth and maturity.
                        </motion.p>
                        <motion.p variants={fadeInUp}>
                            At Peniel, we believe in equipping and empowering our members to serve and lead in their communities. Our goal is to train and support like-minded individuals, fostering strong leaders and disciples who are grounded in their faith. We provide the tools and encouragement needed for believers to grow, serve, and become impactful leaders who contribute to the church and society.
                        </motion.p>
                        <motion.p variants={fadeInUp}>
                            Through our various ministries and fellowships, we bring people together, building a supportive and uplifting community where everyone can find their place to grow in faith and purpose. Our mission extends beyond the church walls, focusing on honouring and glorifying God through acts of community service and outreach.
                        </motion.p>
                        <motion.p variants={fadeInUp} className="font-normal text-white">
                            Join us as we strive to make a difference in the lives of others, glorify God, and spread His love and message to all.
                        </motion.p>
                    </div>

                    {/* Feature Image */}
                    <motion.div
                        variants={fadeInUp}
                        className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                    >
                        <Image
                            src="https://i.ibb.co/0Rvn7HCG/Save-Clip-App-447915011-1398815000809201-8573036457839986651-n.png"
                            alt="Peniel Church Congregation"
                            fill
                            className="object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </motion.div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-1 gap-12 max-w-4xl mx-auto text-center">
                        <motion.div variants={fadeInUp} className="space-y-4">
                            <h3 className="text-2xl md:text-3xl font-serif">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-semibold">Our Mission:</span>
                            </h3>
                            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                                At Peniel Church, our mission is to lead individuals to a profound encounter with God. We strive to transform lives through the power of the Gospel, nurturing a community where faith flourishes and lives are positively impacted.
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="space-y-4">
                            <h3 className="text-2xl md:text-3xl font-serif">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-semibold">Our Vision:</span>
                            </h3>
                            <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed">
                                We envision a church where every member is empowered to make a difference. Through education, spiritual empowerment, and community engagement, we are building a fellowship that is vibrant, caring, and ready to serve.
                            </p>
                        </motion.div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
