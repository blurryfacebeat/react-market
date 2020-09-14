// import React from 'react';
// import axios from 'axios';
// import { Header, Checkbox, Table, Icon } from 'semantic-ui-react';
// import baseUrl from '../../utils/baseUrl';
// import cookie from 'js-cookie';

// function AccountPermissions() {
//   const [users, setUsers] = React.useState([]);

//   React.useEffect(() => {
//     getUsers();
//   }, []);

//   async function getUsers() {
//     const url = `${baseUrl}/api/users`;
//     const token = cookie.get("token");
//     const payload = { headers: { Authorization: token } };
//     const response = await axios.get(url, payload);
//     setUsers(response.data);
//   }

//   return (
//     <div style={{ margin: '2em 0' }}>
//       <Header as="h2">
//         <Icon name="settings" />
//         Пользователи
//       </Header>
//       <Table compact celled definition>
//         <Table.Header>
//           <Table.Row>
//             <Table.HeaderCell />
//             <Table.HeaderCell>Имя</Table.HeaderCell>
//             <Table.HeaderCell>Email</Table.HeaderCell>
//             <Table.HeaderCell>Зарегистрировался</Table.HeaderCell>
//             <Table.HeaderCell>Последнее обновление</Table.HeaderCell>
//             <Table.HeaderCell>Права</Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>

//         <Table.Body>
//           {users.map(user => {
//             <UserPermission user={user} key={user._id} />
//           })}
//         </Table.Body>
//       </Table>
//     </div>
//   );
// }

// function UserPermission({ user }) {
//   const [admin, setAdmin] = React.useState(user.role === 'admin');

//   return (
//     <Table.Row>
//       <Table.Cell collapsing><Checkbox toggle /></Table.Cell>
//       <Table.Cell>{user.name}</Table.Cell>
//       <Table.Cell>{user.email}</Table.Cell>
//       <Table.Cell>{user.createdAt}</Table.Cell>
//       <Table.Cell>{user.updatedAt}</Table.Cell>
//       <Table.Cell>{user.role}</Table.Cell>
//     </Table.Row>
//   );
// }

// export default AccountPermissions;
