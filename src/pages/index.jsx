import Header from "../components/Header/Header";
import Home from "../components/Home/Home";
export default function Index() {
  return (
    <>
      <Header></Header>
      <Home></Home>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600">Landing Page</h1>
      </div>
    </>
  );
}
