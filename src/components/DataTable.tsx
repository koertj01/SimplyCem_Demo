import { ReactNode } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T]) => ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  toolbar?: ReactNode;
};

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  toolbar
}: DataTableProps<T>) {
  return (
    <Box>
      <Table>
        <TableHead>
          {toolbar && (
            <TableRow>
              <TableCell colSpan={columns.length}>{toolbar}</TableCell>
            </TableRow>
          )}
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key as string}>{column.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.key as string}>
                  {column.render
                    ? column.render(row[column.key])
                    : String(row[column.key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
