import { TableBody, TableCell, TableRow } from "../ui/table";

const EmptyState = () => (
  <TableBody>
    <TableRow>
      <TableCell colSpan={4} className="text-center py-10">
        No se encontraron productos
      </TableCell>
    </TableRow>
  </TableBody>
);

export default EmptyState;
