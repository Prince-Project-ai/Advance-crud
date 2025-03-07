import { createContext, useContext } from "react";
import toast, { Toaster } from 'react-hot-toast';

export const MessageContext = createContext();

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) throw new Error("Message Provider must be use in Message Context.");
  return context;
}

const MessageProvider = ({ children }) => {

  const showToast = (promise) => {
    toast.promise(
      promise,
      {
        loading: 'Loading',
        success: (data) => ` ${(typeof data?.message !== "string") ? JSON.stringify(data?.message) : data?.message}`,
        error: (err) => `${(typeof err?.response?.data?.message || err?.message !== "string") ? JSON.stringify(err?.response?.data?.message || err?.message) : err?.response?.data?.message || err?.message}`,
      },
      {
        style: {
          minWidth: '270px',
        },
        success: {
          duration: 3000,
          icon: '🔥',
        },
      }
    );
  }

  const contextValue = {
    showToast,
  }

  return (
    <MessageContext.Provider value={contextValue}>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      {children}
    </MessageContext.Provider>
  )
}

export default MessageProvider;

/* 

code structure phase
showToast(messge,type);

showToast("HelloWorld","success")
showToast("Error","error")


*/


/* 
toast.promise(
    myPromise,
    {
      loading: 'Loading',
      success: (data) => `Successfully saved ${ data.name }`,
      error: (err) => `This just happened: ${ err.toString() }`,
    },
    {
      style: {
        minWidth: '250px',
      },
      success: {
        duration: 5000,
        icon: '🔥',
      },
    }
  );
   */