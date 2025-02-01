import Button from "@/components/buttons/Button";
import Link from "next/link";
import Grid from "@/components/grid/grid";
const Success = async () => {
  return (
    // <div className="flex flex-col items-center justify-center h-screen container mx-auto">
    <Grid container flexWrap="wrap-reverse" spacing={6} >
      <Grid item lg={8} md={8} xs={12} className="flex flex-col items-center justify-center h-screen container mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4 px-4">
          Payment Successful! Continue exploring or head back to the home page
        </h2>
        <Link href="/">
          <Button className="blue-bright mt-4 mx-4 mb-3" variant="contained">
            Home
          </Button>
        </Link>
      </Grid>
    </Grid>
    // </div>
  );
};

export default Success;
