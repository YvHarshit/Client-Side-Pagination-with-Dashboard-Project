import FormatQuoteRoundedIcon from "@mui/icons-material/FormatQuoteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import PersonIcon from "@mui/icons-material/Person";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    name: "Harsh Sharma",
    role: "Frontend Developer",
    rating: 5,
    message:
      "The work culture is amazing. I learned React, TypeScript and modern frontend development while working on real-world projects.",
  },
  {
    id: 2,
    name: "Priya Singh",
    role: "UI/UX Designer",
    rating: 4,
    message:
      "The team is supportive and encourages learning. Every project helped me improve my design skills.",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Backend Developer",
    rating: 5,
    message:
      "Excellent mentorship and a collaborative environment. Working here has accelerated my professional growth.",
  },
];

const Testimonials = () => {
  const navigate = useNavigate();

  return (
   <div className="min-h-screen bg-[#171f11] py-10 px-6 text-white">
    <div className="max-w-7xl mx-auto">

    <button onClick={() => navigate(-1)}
     className="flex items-center gap-2 text-[#a8d96c] hover:text-white transition mb-8">
     <ArrowBack />  Back
     </button>

   <div className="mb-10">
    <h1 className="text-5xl font-bold">  Employee Testimonials  </h1>
    <p className="text-gray-400 mt-3 text-lg">  Hear what our employees say about working with our company. </p>
   </div>

   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {testimonials.map((item) => (
     <div key={item.id}
      className="bg-[#232f20] border border-[#3a5035] rounded-3xl p-7 hover:-translate-y-2 transition-all duration-300">
       <FormatQuoteRoundedIcon sx={{ fontSize: 45, color: "#a8d96c" }} />

      <p className="text-gray-300 mt-4 leading-7"> "{item.message}" </p>
      <div className="flex mt-6">
      {[...Array(item.rating)].map((_, i) => (
      <StarRoundedIcon key={i} sx={{ color: "#FFD700" }} />
      ))}
   </div>

  <div className="flex items-center gap-4 mt-8">
   <div className="w-14 h-14 rounded-full bg-[#a8d96c] flex items-center justify-center">
    <PersonIcon sx={{color: "#171f11", fontSize: 30 }}/>
   </div>
    <div>
     <h3 className="font-bold text-lg"> {item.name} </h3>
     <p className="text-sm text-gray-400"> {item.role} </p>
    </div>
    </div>
  </div>
   ))}
  </div>
  </div>
</div>
  );
};

export default Testimonials;