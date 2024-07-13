"use client"
import { useEffect, useState, useCallback } from "react";
import Nav from "@/components/nav";
import Hero from "@/components/Hero";
import Hero2 from "@/components/Hero2";
import Remaining from "@/components/Remaining";
import Link from "next/link";

const Design = () => {

  const [user, setUser] = useState({
    isAuth: false,
    entriesapi: 0,
    nameapi: '',
    statuses: { one: false, two: false, three: false },
  });

  const [formData, setFormData] = useState({ name: "", phoneNumber: "" });

  useEffect(() => {
    const fetchAuth = async () => {
      const response = await fetch("/api/user", {
        method: "POST", headers: { "Content-Type": "application/json" },  body: JSON.stringify({}),
      });
      
      if (!response.ok) throw new Error("Failed to authenticate");
      
      const data = await response.json();
      setUser({ ...user, isAuth: data.authenticated, ...data });
    };
    
    fetchAuth().catch(console.error);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }, []);

  const handleClick = useCallback(async (actionType) => {
    const response = await fetch("/api/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [actionType]: true }),
    });
    if (!response.ok) throw new Error("Failed to update entries");

    const { entriesapi } = await response.json();
    setUser(prev => ({ ...prev, entriesapi: entriesapi, statuses: { ...prev.statuses, [actionType]: true } }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
      setUser({ ...user, isAuth: data.authenticated, ...data });
    alert(`Name: ${formData.name}, Phone Number: ${formData.phoneNumber}`);
  };

  return (
    <main className="max-w-xl mx-auto bg-[#f2f6f9]">
      <Nav />
      <Hero />
      <section className="w-full px-3">
        <div className="w-full bg-white shadow-2xl flex flex-col gap-3 rounded-md">
          <Remaining entries={user.entriesapi} />
          <Hero2 />
          {user.isAuth ? (
            <h2 className="text-center my-3 font-semibold text-3xl">ನಮಸ್ಕಾರ {user.nameapi}</h2>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-lg max-w-lg mx-auto my-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
              </button>
            </form>
          )}
  
          <section className="w-full bg-slate-100">
            <div className="w-full bg-slate-300 py-2">
              <h2 className="font-semibold text-2xl text-slate-800 text-center">
                Entries
              </h2>
            </div>
            <Link href="https://www.facebook.com/VarshaAssociates/" onClick={() => handleClick('one')} target="_blank">
              <div className="w-full flex justify-between border-b-2">
                <div className="flex gap-3 items-center w-full">
                  <img src="/icons8-facebook-48.png" className="h-full" alt="" />
                  {user.statuses.one ? (<p>Done, complete other tasks</p>) : (<p> Click to Follow our Page</p>)}
                </div>
                <div className="m-2 bg-green-500 flex items-center justify-center text-xl p-2 rounded-md shadow-md">
                  {user.statuses.one ? (<>☑️</>) : (<>+1</>)} 
                </div>
              </div>
            </Link>
            <Link href="https://api.whatsapp.com/send?text=Press%20this%20link%20to%20enter%20Varshaagro%20lottery%20" onClick={() => handleClick('two')} target="_blank">
              <div className="w-full flex justify-between border-b-2">
                <div className="flex gap-3 items-center  w-full">
                  <img src="/icons8-whatsapp-48.png" className="h-full" alt="" />
                  {user.statuses.two ? (<p>Done, complete other tasks</p>) : (<p>Share with your friends</p>)}
                </div>
                <div className="m-2 bg-green-500 flex items-center justify-center text-xl p-2 rounded-md shadow-md">
                  {user.statuses.two ? (<>☑️</>) : (<>+1</>)} 
                </div>
              </div>
            </Link>
            <Link href="/" onClick={() => handleClick('three')} target="_blank">
              <div className="w-full flex justify-between border-b-2">
                <div className="flex gap-3 items-center w-full">
                  <img src="icons8-whatsapp-48.png" className="h-full" alt="" />
                  {user.statuses.three ? (<p>Done, complete other tasks</p>) : (<p>Join our whatsapp group</p>)}
                </div>
                <div className="m-2 bg-green-500 flex items-center justify-center text-xl p-2 rounded-md shadow-md">
                  {user.statuses.three ? (<>☑️</>) : (<>+1</>)} 
                </div>
              </div>
            </Link>
          </section>
        </div>
      </section>
    </main>
  );  
};

export default Design;
