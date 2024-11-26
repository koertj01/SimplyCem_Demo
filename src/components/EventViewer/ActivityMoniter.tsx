import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

// Initialize Supabase client
// const supabaseUrl = 'https://<your-supabase-url>'; // Replace with your Supabase URL
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseUrl="https://ybyuhqcpthhxovgfiusi.supabase.co"
const supabaseKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlieXVocWNwdGhoeG92Z2ZpdXNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwMDk3MzAsImV4cCI6MjA0NjU4NTczMH0.b9bEp1sMu1If7sI30I1JBmirwqqZkd-54BIbRkM9N2o"
            
// const supabaseKey = '<your-supabase-key>';         // Replace with your Supabase Anon/Public Key
const supabase = createClient(supabaseUrl, supabaseKey);

console.log("URL: ", supabaseUrl)

interface ActivityLog {
    activity_id: number;
    created_date: string;
    update_date: string;
    record_id: number;
    record_type: string;
    field_modified: string;
    old_value: string | null;
    new_value: string | null;
    modifying_user_id: number;
    approval_user_id: number | null;
  }

export const ActivityLogComponent = () => {
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  
    useEffect(() => {
      const fetchActivityLogs = async () => {
        const { data, error } = await supabase
          .from('activity_log')
          .select('*');
  
        if (error) {
          console.error('Error fetching activity logs:', error);
        } else {
          setActivityLogs(data || []); // This now works because data is typed as ActivityLog[]
        }
      };
  
      fetchActivityLogs();
    }, []);
  
    return (
      <div>
        <span>SOME FUCKING SPAM</span>
        {activityLogs.map((log) => (
          <div key={log.activity_id}>
            {log.record_type}: {log.field_modified} changed from {log.old_value} to {log.new_value}
          </div>
        ))}
      </div>
    );
  };
  
// const ActivityLog = () => {
//   const [activityLogs, setActivityLogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch data from Supabase
//   useEffect(() => {
//     const fetchActivityLogs = async () => {
//       const { data, error } = await supabase
//         .from('activity_log') // Table name
//         .select('*'); // Fetch all columns

//       if (error) {
//         console.error('Error fetching activity logs:', error);
//       } else {
//         setActivityLogs(data || []);
//       }
//       setLoading(false);
//     };

//     fetchActivityLogs();
//   }, []);

//   if (loading) {
//     return <Typography variant="h6">Loading activity logs...</Typography>;
//   }

//   return (
//     <TableContainer component={Paper} sx={{ mt: 2 }}>
//       <Typography variant="h5" gutterBottom sx={{ p: 2 }}>
//         Activity Log
//       </Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell><strong>ID</strong></TableCell>
//             <TableCell><strong>Created Date</strong></TableCell>
//             <TableCell><strong>Updated Date</strong></TableCell>
//             <TableCell><strong>Record ID</strong></TableCell>
//             <TableCell><strong>Record Type</strong></TableCell>
//             <TableCell><strong>Field Modified</strong></TableCell>
//             <TableCell><strong>Old Value</strong></TableCell>
//             <TableCell><strong>New Value</strong></TableCell>
//             <TableCell><strong>Modifying User ID</strong></TableCell>
//             <TableCell><strong>Approval User ID</strong></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {activityLogs.map((log) => (
//             <TableRow key={log.activity_id}>
//               <TableCell>{log.activity_id}</TableCell>
//               <TableCell>{new Date(log.created_date).toLocaleString()}</TableCell>
//               <TableCell>{new Date(log.update_date).toLocaleString()}</TableCell>
//               <TableCell>{log.record_id}</TableCell>
//               <TableCell>{log.record_type}</TableCell>
//               <TableCell>{log.field_modified}</TableCell>
//               <TableCell>{log.old_value}</TableCell>
//               <TableCell>{log.new_value}</TableCell>
//               <TableCell>{log.modifying_user_id}</TableCell>
//               <TableCell>{log.approval_user_id}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default ActivityLog;
