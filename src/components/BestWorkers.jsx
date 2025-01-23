import Container from "./Container";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { Award, Sparkles } from 'lucide-react';

export default function BestWorkers() {
  const axiosPublic = useAxiosPublic();

  const {
    data: topWorkers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["topWorkers"],
    queryFn: async () => {
      const response = await axiosPublic.get("/topWorkers");
      return response.data;
    },
  });

  console.log(topWorkers);
  

  if (isLoading) return <Loading />;
  if (isError) return <h1>Error: {error.message}</h1>;

  return (
    <Container>
       <div className="bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Top Performers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Celebrating the most dedicated and skilled professionals on our platform
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {topWorkers.map((worker, index) => (
            <div 
              key={index}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl opacity-75 group-hover:opacity-100 transition duration-300 blur-sm group-hover:blur-md"></div>
              
              <div className="relative bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={worker.image}
                    alt={worker.name}
                    className="w-full h-48 object-cover object-center filter brightness-90 group-hover:brightness-100 transition-all"
                  />
                  
                  {index < 3 && (
                    <div className="absolute top-2 left-2">
                      {index === 0 && (
                        <Award className="w-8 h-8 text-yellow-400 fill-yellow-200" />
                      )}
                      {index === 1 && (
                        <Award className="w-8 h-8 text-gray-400 fill-gray-200" />
                      )}
                      {index === 2 && (
                        <Award className="w-8 h-8 text-bronze-400 fill-bronze-200" />
                      )}
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 text-sm rounded-full flex items-center">
                    <Sparkles className="w-4 h-4 mr-1 text-yellow-300" />
                    {worker.coin} Coins
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                      {worker.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Available Coins</span>
                    <span className="font-bold text-lg text-blue-600">
                      {worker.coin}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Container>
  );
}
