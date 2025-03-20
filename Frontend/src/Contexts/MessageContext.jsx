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
        success: (data) =>
          typeof data?.message === "string" ? data.message : JSON.stringify(data?.message),

        error: (err) => {
          const errorMessage = err?.response?.data?.message || err?.message;
          return typeof errorMessage === "string" ? errorMessage : JSON.stringify(errorMessage);
        }
      },
      {
        style: {
          minWidth: '260px',
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