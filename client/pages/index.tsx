import { useState } from "react";
import { LoginForm, RegisterForm } from "@/components/Form";

const Index = () => {
  const [isMember, setIsMember] = useState(false);

  return (
    <div className="relative">
      {isMember ? <LoginForm /> : <RegisterForm />}
      <div className="flex justify-center mt-5">
        {isMember ? (
          <p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsMember(false)}
            >
              Register
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => setIsMember(true)}
            >
              Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Index;
