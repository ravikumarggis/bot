import Navbar from "../../components/Navbar";

import Footer from "../../screen/home/footer";
 


export default function DashboardLayout({ children }) {
  return (
  
<div className="min-h-screen w-full  bg-gray-900 text-white">
       
       <Navbar />
  {children}
       <Footer />
</div>

  
  );
}
