import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Create an Account",
    description: "Sign up to start logging your climbs and saving your progress.",
    link: "/register",
    linkText: "Sign Up",
  },
  {
    title: "Log Your Climbs",
    description: "Record your climbs with details like difficulty, gym, and date.",
    link: "/",
    linkText: "Start Logging",
  },
  {
    title: "Add Notes",
    description: "Jot down tips, beta, or reflections for each climb to improve your skills.",
    link: "/",
    linkText: "Add Your First Note",
  }
]

export default function Features() {
    return (
      <section className='max-w-7xl m-auto my-4 prose'>
        <h2>Core Features</h2>
        <div className='grid lg:grid-cols-3 gap-4'>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>
    );
}
