import { Loader2 } from "lucide-react";
import { TableBody, TableCell, TableRow } from "../ui/table";

const LoadingState = () => (
  <TableBody>
    <TableRow>
      <TableCell colSpan={4} className="text-center py-10">
        <div className="flex justify-center items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Cargando productos...</span>
        </div>
      </TableCell>
    </TableRow>
  </TableBody>
);

export default LoadingState;
