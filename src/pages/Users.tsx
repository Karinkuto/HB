import React from 'react';
import useProductStore from './ProductStore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Container } from "@mui/material";

const Users = () => {
  const { users } = useProductStore();

  return (
    <Container>
      <h1>Users Management</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Admin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.isAdmin ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Users;