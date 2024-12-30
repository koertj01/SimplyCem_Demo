import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';

const formFields = [
  { name: 'scheduleDate', label: 'Schedule Date', placeholder: 'Enter Schedule Date' },
  { name: 'client', label: 'Client', placeholder: 'Enter Client Name' },
  { name: 'orderNumber', label: 'Order Number', placeholder: 'Enter Order Number' },
  { name: 'status', label: 'Status', placeholder: 'Enter Status' },
  { name: 'price', label: 'Price', placeholder: 'Enter Price' },
  { name: 'location', label: 'Location', placeholder: 'Enter Location' },
  { name: 'scheduledFor', label: 'Scheduled For', placeholder: 'Enter Scheduled For' },
];

type FormValues = {
  scheduleDate: string;
  client: string;
  orderNumber: string;
  status: string;
  price: string;
  location: string;
  scheduledFor: string;
};

export const WorkOrderForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
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
                    helperText={errors[field.name as keyof FormValues]?.message}
                  />
                )}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="flex-end">
              <Grid item>
                <Button variant="outlined" type="button">
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" type="submit">
                  Create
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
