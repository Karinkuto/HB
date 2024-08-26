import Month from "@/components/Month";
import Ratings from "@/components/CommentSection";
import Revenue from "@/components/Revenue";
import Sales from "@/components/RecentSales";
import Transactions from "@/components/Transactions";
import Week from "@/components/SalesCard";
import { Container } from "@mui/material";

export default function Dashboard() {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBlock: "2rem",
          width: "100%",
        }}
      >
        <div className="flex w-full gap-4">
          <div className="flex w-full flex-col gap-4">
            <div className="flex gap-4 w-full">
              <div className="w-full">
                <Week />
              </div>
              <div className="w-full">
                <Month />
              </div>
            </div>
            <Sales />
            <Transactions />
          </div>
        </div>
        <div className="w-[60%] flex flex-col gap-4">
          <Revenue />
          <Ratings />
        </div>
      </div>
    </Container>
  );
}