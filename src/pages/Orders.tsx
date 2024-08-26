import OrderComponent from "@/components/OrderComponent";
import Reciept from "@/components/Reciept";
import { Container } from "@mui/material";
import { useState } from "react";

export default function Orders() {
  const [see, setSee] = useState(true);
  return (
    <>
      <Container style={{ display: "flex", justifyContent: "space-between", gap: see ? "1rem" : "0", marginBlock: "2rem" }}>
        <div className="w-full">
        <OrderComponent setSee={setSee} see={see}/>
        </div>

        <Reciept setSee={setSee} see={see} />
      </Container>
    </>
  );
}