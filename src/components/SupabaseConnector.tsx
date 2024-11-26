// import { createClient, SupabaseClient } from '@supabase/supabase-js';

// // Define types for the environment variables
// interface EnvVars {
//   SUPABASE_URL: string;
//   SUPABASE_KEY: string;
// }

// // Load environment variables with type assertion
// // const { SUPABASE_URL, SUPABASE_KEY } = process.env as unknown as EnvVars;
// const SUPABASE_URL = process.env.SUPABASE_URL;
// const SUPABASE_KEY = process.env.SUPABASE_KEY;

// // Validate that environment variables are set
// if (!SUPABASE_URL || !SUPABASE_KEY) {
//   throw new Error('Missing Supabase URL or Key!');
// } else {
//   console.log('Successfully connected to Supabase!');
// }

// // Create a Supabase client instance
// const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// // Function to fetch data from Supabase (example)
// export default function Connector() {
//   // Log the connection to check if the client is working
//   supabase
//     .from('your_table_name') // Replace with your actual table name
//     .select('*')
//     .then(({ data, error }) => {
//       if (error) {
//         console.error('Error fetching data:', error);
//       } else {
//         console.log('Supabase connection successful. Data:', data);
//       }
//     });
//     // .catch((err) => {
//     //   console.error('Error in Supabase query:', err);
//     // });

//   return supabase;
// }
