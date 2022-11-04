import React from "react";
import {
  Button,
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { api_cribs_delete } from "../store/common/commonApi";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../store/common/commonSlice";

export default function CribsTable({
  cribs_data,
  cribs_meta,
  setCribsMeta,
  cribs_data_loading,
  cribs_data_count,
  getCribsData,
  edit,
}) {
  const dispatch = useDispatch();
  const handlePerPageChange = (val) => {
    setCribsMeta({ meta: { perPage: val } });
  };

  const handlePageChange = (val) => {
    setCribsMeta({ meta: { page: val } });
  };

  const handleDelete = async (id) => {
    let res = await api_cribs_delete(id);
    if (res.success) {
      dispatch(
        setSnackBar({
          open: true,
          message: res.message,
          severity: "info",
        })
      );
      getCribsData();
    }
  };

  console.log(cribs_data, "cribs_data");

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Location</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cribs_data_loading ? (
            <CircularProgress />
          ) : (
            cribs_data.map((val, key) => (
              <TableRow key={key}>
                <TableCell>{val.name}</TableCell>
                <TableCell>
                  <img src={val.img} alt={`${val.name}`} width="100" />
                </TableCell>
                <TableCell>{val.location}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => edit(val.cribs_id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(val.cribs_id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        onPageChange={(e, val) => handlePageChange(val)}
        page={cribs_meta.page}
        count={cribs_data_count}
        rowsPerPage={cribs_meta.perPage}
        onRowsPerPageChange={(e) => handlePerPageChange(e.target.value)}
      />
    </Card>
  );
}
