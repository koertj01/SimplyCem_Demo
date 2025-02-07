import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Popover,
  Toolbar,
  Stack,
  Box,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import DataTable from "../DataTable";
import { createToolbar } from "./WorkOrderToolbar";

const columns = [
  { key: "scheduleDate", header: "Schedule Date" },
  {
    key: "client",
    header: "Client",
    render: (value: string) => <a href={`mailto:${value}`}>{value}</a>,
  },
  { key: "orderNumber", header: "Order Number" },
  { key: "status", header: "Status" },
  { key: "price", header: "Price" },
  { key: "location", header: "Location" },
  { key: "scheduledFor", header: "Scheduled For" },
  { key: "wo_request", header: "Work Order Request" },
];

const dummyData = [
  {
    scheduleDate: "2025-01-24",
    client: "Tara Bass",
    orderNumber: "ORD86681",
    status: "Completed",
    price: "$1116.30",
    location: "Port Mariaview",
    scheduledFor: "2025-02-19",
    wo_request: "Request #77",
  },
];

const formFields = [
  {
    name: "scheduleDate",
    label: "Schedule Date",
    placeholder: "Enter Schedule Date",
  },
  { name: "client", label: "Client", placeholder: "Enter Client Name" },
  {
    name: "orderNumber",
    label: "Order Number",
    placeholder: "Enter Order Number",
  },
  { name: "status", label: "Status", placeholder: "Enter Status" },
  { name: "price", label: "Price", placeholder: "Enter Price" },
  { name: "location", label: "Location", placeholder: "Enter Location" },
  {
    name: "scheduledFor",
    label: "Scheduled For",
    placeholder: "Enter Scheduled For",
  },
  {
    name: "wo_request",
    label: "Work requested",
    placeholder: "Enter Requested Work Notes",
  },
];

type FormValues = {
  scheduleDate: string;
  client: string;
  orderNumber: string;
  status: string;
  price: string;
  location: string;
  scheduledFor: string;
  wo_request: string;
};

const tabConfig = [
  { label: "All Orders", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
];

export const WorkOrderForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [filters, setFilters] = React.useState({
    startDate: "",
    endDate: "",
    selectedTab: "all",
  });

  const handleFilterChange = (updates: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Data:", data);
    handleClose();
  };

  return (
    <>
      <Stack alignItems={"Center"}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClick}
          >
            Create new Work Order
          </Button>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete Work Order
          </Button>
        </Toolbar>

        <Container>
          <DataTable
            data={dummyData}
            columns={columns}
            toolbar={createToolbar({
              tabConfig,
              selectedTab: filters.selectedTab,
              startDate: filters.startDate,
              endDate: filters.endDate,
              onChange: handleFilterChange,
            })}
          />
        </Container>
      </Stack>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Box maxWidth="sm" p={2}>
          <Typography variant="h4" gutterBottom>
            Create Work Order
          </Typography>
          <Typography variant="body1" gutterBottom>
            Fill in the details below to create a new work order
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {formFields.map((field) => (
                <Grid item xs={12} key={field.name}>
                  <Controller
                    name={field.name as keyof FormValues}
                    control={control}
                    rules={{ required: `${field.label} is required` }}
                    render={({ field: controllerField }) => (
                      <TextField
                        {...controllerField}
                        fullWidth
                        label={field.label}
                        placeholder={field.placeholder}
                        error={!!errors[field.name as keyof FormValues]}
                        helperText={
                          errors[field.name as keyof FormValues]?.message
                        }
                      />
                    )}
                  />
                </Grid>
              ))}
              <Grid
                item
                xs={12}
                container
                spacing={2}
                justifyContent="flex-end"
              >
                <Grid item>
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Popover>
    </>
  );
};
