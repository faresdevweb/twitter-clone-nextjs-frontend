import React from 'react'
import Layout from '@/components/Layout'
import Notification from '@/components/Notification'
import { useAuth, useNotifications } from '@/hooks';

const notifications = () => {

  const { isAuthenticated } = useAuth();
  const { notifications } = useNotifications();

  if(!isAuthenticated) return <h1 className='text-center text-4xl'>Loading ... </h1>

  return (
    <Layout>
        <div className='p-5 mt-3 xs:h-[100%] xs:mb-[15%]'>
          <div className='text-left text-2xl font-bold mb-5 p-4'>
            <h1>Notifications</h1>
          </div>
            {
              notifications.map((notification: any) => (
                <Notification 
                  key={notification.id}
                  content={notification.body}  
                />
              ))
            }
        </div>
    </Layout>
  )
}

export default notifications