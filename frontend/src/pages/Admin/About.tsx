import { ArrowBack } from "@mui/icons-material";
import GroupsIcon from "@mui/icons-material/Groups";
import ShieldIcon from "@mui/icons-material/Shield";
import InsightsIcon from "@mui/icons-material/Insights";
import DevicesIcon from "@mui/icons-material/Devices";
import ApartmentIcon from "@mui/icons-material/Apartment";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const features = [
  {
    title: "Employee Management",
    icon: <GroupsIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Secure Authentication",
    icon: <ShieldIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Analytics Dashboard",
    icon: <InsightsIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Responsive Design",
    icon: <DevicesIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Department Management",
    icon: <ApartmentIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Role Based Access",
    icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />,
  },
];

const stats = [
  { number: "1200+", label: "Employees" },
  { number: "25+", label: "Departments" },
  { number: "98%", label: "Satisfaction" },
  { number: "24/7", label: "Support" },
];

const tech = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "JWT",
  "REST API",
];

const About = () => {
  const navigate = useNavigate();

  return (
  <div>
    <AdminNavbar/> 
    <div className="min-h-screen bg-[#171f11] text-white px-6 py-10 font-serif">
      <div className="mx-9">
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#a8d96c] hover:text-white transition mb-8">
          <ArrowBack /> Back  </button>

        <section className="text-center mb-20">
          <p className="uppercase tracking-[5px] text-[#a8d96c] font-semibold"> About </p>

          <h1 className="text-5xl font-bold mt-4"> Employee Management System  </h1>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto mt-6">
            A modern web application designed to simplify employee
            administration, improve productivity, and provide insightful
            analytics through an intuitive dashboard.
          </p>
        </section>

    

        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-[#232f20] rounded-3xl h-72 flex items-center justify-center border border-[#3a5035]">
            <GroupsIcon sx={{ fontSize: 120, color: "#a8d96c" }} />
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-5"> Our Mission </h2>
            <p className="text-gray-300 leading-8">
              We aim to provide organizations with a secure, scalable,
              and easy-to-use employee management platform that helps
              administrators manage employee information, authentication,
              departments, and analytics from one centralized dashboard.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12"> Why Choose Us </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {features.map((feature) => (
              <div key={feature.title}
                className="bg-[#232f20] rounded-2xl border border-[#3a5035] p-8 text-center hover:-translate-y-2 transition">
                <div className="text-[#a8d96c] mb-5"> {feature.icon} </div>
                <h3 className="text-xl font-semibold"> {feature.title} </h3>
              </div>
            ))}
          </div>
        </section>


        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12"> Our Impact </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item) => (
              <div key={item.label}
                className="bg-[#232f20] border border-[#3a5035] rounded-2xl p-8 text-center">
                <h3 className="text-4xl font-bold text-[#a8d96c]"> {item.number} </h3>
                <p className="text-gray-400 mt-2"> {item.label} </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-10"> Built With </h2>
          <div className="flex flex-wrap justify-center gap-5">

            {tech.map((item) => (
              <span key={item} className="px-6 py-3 rounded-full bg-[#232f20] border border-[#3a5035] text-[#a8d96c] font-md">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="text-center border-t border-[#3a5035] pt-10">
          <h3 className="text-2xl font-semibold"> Thank You </h3>
          <p className="text-gray-400 mt-4">
            Thank you for using the Employee Management System.
            We're committed to making employee management simple,
            secure, and efficient.
          </p>
        </section>
      </div>
    </div>
   </div>  
  );
};

export default About;