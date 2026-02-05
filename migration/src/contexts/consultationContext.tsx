import { createContext, useContext, useState } from "react";

type ConsultationContextType = {
  consultation: boolean;
  setConsultation: (value: boolean) => void;
};

const ConsultationContext = createContext<ConsultationContextType | undefined>(
  undefined,
);

export const ConsultationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [consultation, setConsultation] = useState(false);

  return (
    <ConsultationContext.Provider value={{ consultation, setConsultation }}>
      {children}
    </ConsultationContext.Provider>
  );
};

export const useConsultation = () => {
  const context = useContext(ConsultationContext);

  if (!context) {
    throw new Error("useConsultation must be used within ConsultationProvider");
  }

  return context;
};
