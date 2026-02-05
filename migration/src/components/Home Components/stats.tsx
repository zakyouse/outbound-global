import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  FaFileAlt,
  FaIdCard,
  FaGlobe,
  FaUsers,
  FaBriefcase,
} from "react-icons/fa";

const stats = [
  {
    title: "Cases Handled",
    value: 400,
    suffix: "+",
    icon: <FaFileAlt size={32} />,
  },
  {
    title: "Green Cards Approved",
    value: 250,
    suffix: "+",
    icon: <FaIdCard size={32} />,
  },
  {
    title: "Countries",
    value: 30,
    suffix: "+",
    icon: <FaGlobe size={32} />,
  },
  {
    title: "Families Reunited",
    value: 180,
    suffix: "+",
    icon: <FaUsers size={32} />,
  },
  {
    title: "Years of Experience",
    value: 10,
    suffix: "+",
    icon: <FaBriefcase size={32} />,
  },
];

const ImpactStats = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section ref={ref} className="my-16 px-6 md:px-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
        Making Immigration Pathways Clearer
      </h2>

      <p className="text-gray-700 max-w-3xl mx-auto mb-12">
        Through structured immigration consulting and administrative support,
        Outbound Global Pathways has helped individuals and families navigate
        complex immigration processes with clarity and confidence.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-blue-50 rounded-xl p-6 flex flex-col items-center justify-center shadow-sm"
          >
            <div className="text-mygreen mb-3">{stat.icon}</div>

            <div className="text-3xl font-bold text-gray-900">
              {inView ? (
                <CountUp duration={2} end={stat.value} suffix={stat.suffix} />
              ) : (
                `0${stat.suffix}`
              )}
            </div>

            <p className="mt-2 text-sm font-medium text-gray-700 text-center">
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactStats;
