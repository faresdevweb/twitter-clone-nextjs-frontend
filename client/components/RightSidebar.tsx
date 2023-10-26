import { SearchInput } from "./Input";
import { Recommend } from "@/components";
import { useState, useEffect } from "react";
import { useUser } from "@/hooks";

const RightSidebar = () => {

  const { users } = useUser();
  const [ randomUsers, setRandomUsers ] = useState(users);

 
  

  useEffect(() => {
    const getRandomUser = (arr: any) => {
      return arr[Math.floor(Math.random() * arr.length)];
    };

    const generateRandomUsers = () => {
      let selectedUsers = [];
      let availableUsers = [...users];

      for (let i = 0; i < Math.min(5, users.length); i++) {
        const randomUser = getRandomUser(availableUsers);
        selectedUsers.push(randomUser);

        // Remove the selected user from availableUsers so we don't select them again
        availableUsers = availableUsers.filter(user => user !== randomUser);
      }
      setRandomUsers(selectedUsers);
    };

    generateRandomUsers();
  }, [users]);

  console.log(randomUsers);
  
   
  return (
    <div className='border border-gray-300 border w-[35%] xs:hidden sm:hidden lg:hidden xl:block p-3 '>
      <SearchInput />
      <div className="font-bold text-2xl mb-4">
        <h1>Who to follow</h1>
      </div>
      {randomUsers.map(user => 
        <Recommend 
          key={user.id} 
          user={user} 
      />)}
    </div>
  );
};

export default RightSidebar;
