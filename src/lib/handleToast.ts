import { toast } from "@/components/ui/use-toast";

export const CustomToast = {
  success: (message: string) => {
    toast({
      title: "Success",
      description: message,
      className: "bg-green-500 text-white",
    });
  },
  error: (message: string) => {
    toast({
      title: "Error",
      description: message,
      className: "bg-red-500 text-white",
    });
  },
  warning: (message: string) => {
    toast({
      title: "Warning",
      description: message,
      className: "bg-yellow-500 text-white",
    });
  },
  info: (message: string) => {
    toast({
      title: "Info",
      description: message,
      className: "bg-blue-500 text-white",
    });
  },
  default: (message: string) => {
    toast({
      title: "Default",
      description: message,
      className: "bg-gray-500 text-white",
    });
  },
};
